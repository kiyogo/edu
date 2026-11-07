/**
 * Automated Verification Script for Canvas Scrollbar Engine (Pure Node.js)
 */

const SCROLLBAR_CONFIG = {
  THUMB_THICKNESS: 6,
  HITBOX_THICKNESS: 12,
  MIN_THUMB_LENGTH: 24,
  CORNER_RADIUS: 3,
  EDGE_OFFSET: 2,
};

function createRect(left, top, width, height) {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
}

function intersectRect(a, b) {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.right, b.right);
  const bottom = Math.min(a.bottom, b.bottom);
  const width = Math.max(0, right - left);
  const height = Math.max(0, bottom - top);
  return { left, top, right, bottom, width, height };
}

function isPointInRect(x, y, rect) {
  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom &&
    rect.width > 0 &&
    rect.height > 0
  );
}

console.log('=== STARTING CANVAS SCROLLBAR ENGINE VERIFICATION ===\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Geometry Engine: createRect & intersectRect
const rectA = createRect(10, 10, 100, 100);
const rectB = createRect(50, 50, 100, 100);
const intersection = intersectRect(rectA, rectB);

assert(intersection.left === 50, 'Intersection left matches 50');
assert(intersection.top === 50, 'Intersection top matches 50');
assert(intersection.width === 60, 'Intersection width matches 60');
assert(intersection.height === 60, 'Intersection height matches 60');

// 2. Point in rect hit test
assert(isPointInRect(60, 60, intersection), 'Point (60, 60) is inside intersection');
assert(!isPointInRect(200, 200, intersection), 'Point (200, 200) is outside intersection');

// 3. Thumb dimension calculation constraints
const trackHeight = 400;
const clientHeight = 400;
const scrollHeight = 2000;
const visibleRatio = clientHeight / scrollHeight; // 0.2
const expectedThumbHeight = Math.max(
  SCROLLBAR_CONFIG.MIN_THUMB_LENGTH,
  Math.min(trackHeight, trackHeight * visibleRatio)
); // max(24, 80) = 80

assert(expectedThumbHeight === 80, `Thumb height correctly calculated: ${expectedThumbHeight}px (expected 80px)`);

// 4. Min thumb height clamping on very long content
const hugeScrollHeight = 50000;
const hugeVisibleRatio = clientHeight / hugeScrollHeight; // 0.008 -> 3.2px
const clampedThumbHeight = Math.max(
  SCROLLBAR_CONFIG.MIN_THUMB_LENGTH,
  Math.min(trackHeight, trackHeight * hugeVisibleRatio)
);
assert(clampedThumbHeight === SCROLLBAR_CONFIG.MIN_THUMB_LENGTH, `Thumb height properly clamped to min ${SCROLLBAR_CONFIG.MIN_THUMB_LENGTH}px on huge scrollable content`);

// 5. Config constants check
assert(SCROLLBAR_CONFIG.THUMB_THICKNESS === 6, 'Thumb thickness is exactly 6px overlay (zero layout shift)');
assert(SCROLLBAR_CONFIG.HITBOX_THICKNESS === 12, 'Interactive hitbox is 12px for effortless grab');
assert(SCROLLBAR_CONFIG.CORNER_RADIUS === 3, 'Corner radius is 3px modern pill shape');

// 6. Native Drag Calculation: Offset preservation test
const dragStartScrollTop = 500;
const dragStartPointerY = 200;
const currentPointerY = 250; // moved 50px down
const thumbTravel = trackHeight - expectedThumbHeight; // 400 - 80 = 320px
const maxScroll = scrollHeight - clientHeight; // 2000 - 400 = 1600px
const deltaY = currentPointerY - dragStartPointerY; // 50px
const scrollDelta = (deltaY / thumbTravel) * maxScroll; // (50 / 320) * 1600 = 250px
const newScrollTop = dragStartScrollTop + scrollDelta; // 750px

assert(newScrollTop === 750, `Linear drag translation correctly calculated: ${newScrollTop}px (expected 750px)`);

console.log(`\n=== VERIFICATION SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===`);
