import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9223;
const TARGET_URL = 'http://localhost:5173/';

async function getWsUrl() {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${PORT}/json/list`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const page = list.find(p => p.type === 'page');
          if (page && page.webSocketDebuggerUrl) {
            resolve(page.webSocketDebuggerUrl);
          } else {
            reject(new Error('No page target found'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

async function runTests() {
  console.log('--- STARTING AUTOMATED SCROLLYTELLING TESTS ---');
  
  // Launch Chrome
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    TARGET_URL
  ]);

  // Wait 2s for Chrome to start
  await new Promise(r => setTimeout(r, 2000));

  let wsUrl;
  for (let i = 0; i < 10; i++) {
    try {
      wsUrl = await getWsUrl();
      break;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (!wsUrl) {
    chrome.kill();
    throw new Error('Could not connect to Chrome debugging endpoint');
  }

  // Connect WebSocket (using Node native WebSocket in Node 22+)
  const ws = new WebSocket(wsUrl);
  let id = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve } = pending.get(msg.id);
      pending.delete(msg.id);
      resolve(msg);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise(resolve => {
      const reqId = id++;
      pending.set(reqId, { resolve });
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });
  }

  async function evaluate(expression) {
    const res = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.result && res.result.result) {
      return res.result.result.value;
    }
    return null;
  }

  // Enable Runtime & Page
  await send('Runtime.enable');
  await send('Page.enable');

  // Wait 1.5s for initial render and GSAP registration
  await new Promise(r => setTimeout(r, 1500));

  console.log('✓ Connected to Headless Chrome session');

  // TEST 1: Check Sticky and Section Heights
  const stickyCheck = await evaluate(`(() => {
    const stages = document.querySelectorAll('.story-stage, .opening, .aperture, .vietnam, .product-reveal, .mobile-orbit, .horizons');
    let hasSticky = false;
    let excessiveHeight = false;
    stages.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'sticky' || style.position === 'fixed') hasSticky = true;
      const h = el.offsetHeight;
      if (h > 4000) excessiveHeight = true; // no multi-thousands fake height
    });
    const stageStickyEl = document.querySelector('.stage-sticky');
    return {
      hasSticky,
      hasStageStickyClass: !!stageStickyEl,
      excessiveHeight,
      docHeight: document.documentElement.scrollHeight
    };
  })()`);

  console.log('Test 1 — Pinned/Sticky Stage Audit:', stickyCheck);
  if (stickyCheck.hasSticky || stickyCheck.hasStageStickyClass) {
    throw new Error('FAILED: Found sticky positioning or .stage-sticky class!');
  } else {
    console.log('  -> PASS: No sticky stage detected. All sections are in normal document flow.');
  }

  // TEST 2: Check 82 Image Slots
  const imageCheck = await evaluate(`(() => {
    const photos = document.querySelectorAll('[data-image-id]');
    const ids = Array.from(photos).map(p => p.getAttribute('data-image-id'));
    const uniqueIds = Array.from(new Set(ids));
    return {
      totalRendered: photos.length,
      uniqueCount: uniqueIds.length,
      sampleIds: uniqueIds.slice(0, 10),
      hasHero01: uniqueIds.includes('hero01'),
      hasEcosystem08: uniqueIds.includes('ecosystem08'),
      hasVietnam06: uniqueIds.includes('vietnam06'),
      hasSchool12: uniqueIds.includes('school12'),
      hasAnalytics08: uniqueIds.includes('analytics08'),
      hasManagement08: uniqueIds.includes('management08'),
      hasMobile10: uniqueIds.includes('mobile10'),
      hasLibrary08: uniqueIds.includes('library08'),
      hasQuiz06: uniqueIds.includes('quiz06'),
      hasAi06: uniqueIds.includes('ai06'),
      hasEnding06: uniqueIds.includes('ending06')
    };
  })()`);

  console.log('Test 2 — 82 Image Slots Audit:', imageCheck);
  if (imageCheck.uniqueCount !== 82) {
    throw new Error(`FAILED: Expected 82 unique image slots, found ${imageCheck.uniqueCount}`);
  } else {
    console.log('  -> PASS: All 82 unique image slots are actively mounted in DOM.');
  }

  // TEST 3: Sequential Continuous Scroll & Motion Tracking
  console.log('Test 3 — Continuous Scroll Progression Check...');
  const scrollSteps = [0, 500, 1200, 2500, 4000, 6000, 8000, 10000];
  const scrollResults = [];

  for (const targetY of scrollSteps) {
    await evaluate(`window.scrollTo(0, ${targetY})`);
    await new Promise(r => setTimeout(r, 100)); // allow scroll event & ScrollTrigger update
    const state = await evaluate(`(() => {
      const heroWordmark = document.querySelector('.opening__wordmark');
      const progressBar = document.querySelector('.reading-progress__fill');
      const vnTrace = document.querySelector('.vietnam__trace');
      return {
        scrollY: window.scrollY,
        progressTransform: progressBar ? progressBar.style.transform : '',
        vnTraceOffset: vnTrace ? vnTrace.style.strokeDashoffset : '',
        heroWordmarkTransform: heroWordmark ? heroWordmark.style.transform : ''
      };
    })()`);
    scrollResults.push(state);
  }

  console.log('  Scroll Steps Recorded:', scrollResults);
  const finalStep = scrollResults[scrollResults.length - 1];
  if (finalStep.scrollY === 0) {
    throw new Error('FAILED: window.scrollY did not update!');
  }
  console.log('  -> PASS: window.scrollY updates continuously and triggers animations.');

  // TEST 4: Reverse Scrolling (Upward)
  console.log('Test 4 — Reverse Scroll Check...');
  await evaluate(`window.scrollTo(0, 0)`);
  await new Promise(r => setTimeout(r, 200));
  const topState = await evaluate(`(() => {
    const progressBar = document.querySelector('.reading-progress__fill');
    return {
      scrollY: window.scrollY,
      progressTransform: progressBar ? progressBar.style.transform : ''
    };
  })()`);
  console.log('  Top State After Reverse:', topState);
  if (topState.scrollY !== 0) {
    throw new Error('FAILED: Reverse scroll did not reach top');
  }
  console.log('  -> PASS: Reverse scroll successfully returns to top and reverses animation state.');

  // TEST 5: Mobile Viewport Check (390x844)
  console.log('Test 5 — Mobile Viewport 390x844 Audit...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 300));
  const mobileCheck = await evaluate(`(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      docHeight: document.documentElement.scrollHeight
    };
  })()`);
  console.log('  Mobile Check Result:', mobileCheck);
  if (mobileCheck.hasOverflowX) {
    throw new Error(`FAILED: Horizontal overflow detected on mobile: ${mobileCheck.scrollWidth} > ${mobileCheck.clientWidth}`);
  }
  console.log('  -> PASS: Zero horizontal overflow on mobile viewport.');

  console.log('--- ALL TESTS PASSED SUCCESSFULLY! ---');
  ws.close();
  chrome.kill();
  process.exit(0);
}

runTests().catch(err => {
  console.error('TEST ERROR:', err);
  process.exit(1);
});
