import * as THREE from 'three';

/**
 * MASTER CINEMATIC 3D ENGINE — KIYOEDU V5 ULTRA-FX EDITION
 * Real-Time Continuous WebGL World Powered by Three.js
 * 
 * Strict Mandates & Supercharged Visual Effects:
 * - ZERO Videos (No MP4, No WebM, No video scrubbing)
 * - Continuous Spline Camera Rig (Bi-directional, responsive to scroll progress)
 * - 60+ FPS Continuous Real-Time Animation Loop (Active even when stopped scrolling!)
 * - Interactive Mouse Parallax & Depth Tilt
 * - Massive Knowledge Particle System (2,500 Luminous Motes & Stardust)
 * - Volumetric Holographic God Rays / Light Beams
 * - Concentric Gyroscopic Tech Rings & Orbiting Holographic Reticles
 * - Floating 3D Mathematical & Educational Glyphs / Runes
 * - Expanding Energy Ripple Shockwaves
 * - Swirling Golden Particle Vortex rising from the Book
 */
export class MasterCinematic3DWorld {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock: THREE.Clock;
  private animFrameId: number | null = null;

  // Progress & Interpolation
  private currentProgress = 0;
  private targetProgress = 0;

  // Interactive Mouse Parallax
  private mouseX = 0;
  private mouseY = 0;
  private mouseLagX = 0;
  private mouseLagY = 0;
  private onMouseMoveBound: (e: MouseEvent) => void;

  // Lighting
  private ambientLight: THREE.AmbientLight;
  private keySunLight: THREE.DirectionalLight;
  private fillLight: THREE.DirectionalLight;
  private accentPointLight: THREE.PointLight;

  // 3D Groups for the 4 Cinematic Acts
  private worldRoot: THREE.Group;
  private act1BookGroup!: THREE.Group;
  private act2PavilionGroup!: THREE.Group;
  private act3LibraryGroup!: THREE.Group;
  private act4HorizonGroup!: THREE.Group;

  // Animated Asset References
  private bookCoverMesh!: THREE.Mesh;
  private bookPages: THREE.Mesh[] = [];
  private bookGlowParticles!: THREE.Points;
  private workstationScreenMesh!: THREE.Mesh;
  private mobilePhoneMesh!: THREE.Mesh;
  private dataColumns: THREE.Mesh[] = [];
  private socraticCoreGroup!: THREE.Group;
  private socraticRings: THREE.Mesh[] = [];
  private grandEmblemGroup!: THREE.Group;

  // Supercharged VFX Assets
  private globalParticles!: THREE.Points;
  private globalParticleBasePositions!: Float32Array;
  private lightBeams: { mesh: THREE.Mesh; baseOpacity: number; phase: number }[] = [];
  private techHoloRings: { group: THREE.Group; speedX: number; speedY: number; speedZ: number }[] = [];
  private floatingGlyphs: { mesh: THREE.Mesh; baseY: number; phase: number }[] = [];
  private shockwaveRings: { mesh: THREE.Mesh; maxScale: number; speed: number; offset: number }[] = [];
  private bookSpiralVortex!: THREE.Points;
  private cyberGridFloor!: THREE.GridHelper;

  private isDisposed = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.clock = new THREE.Clock();

    // 1. Scene & Atmosphere
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf6f8f5);
    this.scene.fog = new THREE.FogExp2(0xf6f8f5, 0.008);

    // 2. Camera Rig
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1.8, 6.5);

    // 3. Renderer with ACES Tone Mapping
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;

    container.appendChild(this.renderer.domElement);

    // 4. Lighting Rig
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    this.scene.add(this.ambientLight);

    this.keySunLight = new THREE.DirectionalLight(0xfffaec, 2.8);
    this.keySunLight.position.set(16, 28, 20);
    this.keySunLight.castShadow = true;
    this.keySunLight.shadow.mapSize.width = 1024;
    this.keySunLight.shadow.mapSize.height = 1024;
    this.keySunLight.shadow.bias = -0.0001;
    this.scene.add(this.keySunLight);

    this.fillLight = new THREE.DirectionalLight(0xdbe7df, 1.1);
    this.fillLight.position.set(-15, 12, -10);
    this.scene.add(this.fillLight);

    this.accentPointLight = new THREE.PointLight(0x2d6349, 2.2, 35);
    this.accentPointLight.position.set(0, 2.5, 0);
    this.scene.add(this.accentPointLight);

    // 5. World Root
    this.worldRoot = new THREE.Group();
    this.scene.add(this.worldRoot);

    // 6. Build the 4 Acts along Continuous World Coordinates
    this.buildAct1LivingBook();
    this.buildAct2LearningPavilion();
    this.buildAct3DigitalLibrary();
    this.buildAct4GrandHorizon();

    // 7. Build Massive Global VFX Systems
    this.buildGlobalParticleField();
    this.buildVolumetricLightBeams();
    this.buildFloatingAcademicRunes();
    this.buildShockwaveEnergyRings();
    this.buildBookSpiralVortex();
    this.buildCyberGridFloor();

    // 8. Mouse Movement Listener for Parallax
    this.onMouseMoveBound = this.handleMouseMove.bind(this);
    window.addEventListener('mousemove', this.onMouseMoveBound, { passive: true });

    // 9. Start Continuous 60 FPS Render Loop
    this.startLoop();
  }

  // =========================================================================
  // VFX 1: MASSIVE KNOWLEDGE PARTICLE FIELD (2,500 Luminous Motes)
  // =========================================================================
  private buildGlobalParticleField() {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    this.globalParticleBasePositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 48;
      const y = Math.random() * 24 - 3;
      const z = 15 - Math.random() * 165; // Covers Z = +15 to -150

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      this.globalParticleBasePositions[i * 3 + 0] = x;
      this.globalParticleBasePositions[i * 3 + 1] = y;
      this.globalParticleBasePositions[i * 3 + 2] = z;

      // Color palette: Emerald, Cyber Cyan, Gold
      const r = Math.random();
      if (r < 0.45) {
        colors[i * 3 + 0] = 0.22;
        colors[i * 3 + 1] = 0.78;
        colors[i * 3 + 2] = 0.52; // Emerald
      } else if (r < 0.75) {
        colors[i * 3 + 0] = 0.25;
        colors[i * 3 + 1] = 0.82;
        colors[i * 3 + 2] = 0.95; // Cyan
      } else {
        colors[i * 3 + 0] = 0.96;
        colors[i * 3 + 1] = 0.82;
        colors[i * 3 + 2] = 0.42; // Gold
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.globalParticles = new THREE.Points(geo, mat);
    this.worldRoot.add(this.globalParticles);
  }

  // =========================================================================
  // VFX 2: VOLUMETRIC HOLOGRAPHIC GOD RAYS / LIGHT BEAMS
  // =========================================================================
  private buildVolumetricLightBeams() {
    const beamConfigs = [
      { x: 0, y: 5.5, z: 0, rTop: 0.5, rBottom: 2.8, h: 11, color: 0xdfba6b, opacity: 0.16 }, // Act 1
      { x: 0, y: 7.0, z: -35, rTop: 0.8, rBottom: 5.2, h: 14, color: 0x6ee7b7, opacity: 0.15 }, // Act 2
      { x: 0, y: 8.5, z: -80, rTop: 1.0, rBottom: 4.8, h: 17, color: 0x38bdf8, opacity: 0.18 }, // Act 3
      { x: 0, y: 10.0, z: -135, rTop: 1.5, rBottom: 8.0, h: 20, color: 0xfde047, opacity: 0.22 }, // Act 4
    ];

    beamConfigs.forEach((cfg, idx) => {
      const geo = new THREE.CylinderGeometry(cfg.rTop, cfg.rBottom, cfg.h, 32, 1, true);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const beam = new THREE.Mesh(geo, mat);
      beam.position.set(cfg.x, cfg.y, cfg.z);
      this.worldRoot.add(beam);
      this.lightBeams.push({ mesh: beam, baseOpacity: cfg.opacity, phase: idx * 1.5 });
    });
  }

  // =========================================================================
  // VFX 3: FLOATING 3D MATHEMATICAL & ACADEMIC GLYPHS / RUNES
  // =========================================================================
  private buildFloatingAcademicRunes() {
    const symbols = ['∑', '∫', 'π', '∞', 'f(x)', 'λ', 'Δ', '∇', 'E=mc²', 'Ω', 'θ', '√x', 'α', 'β', 'γ', 'Φ'];
    
    symbols.forEach((sym, idx) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 128, 128);

      // Glowing Rune Text
      ctx.shadowColor = idx % 2 === 0 ? '#34d399' : '#fbbf24';
      ctx.shadowBlur = 16;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 56px "Cinzel", "Times New Roman", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sym, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), mat);
      const angle = (idx / symbols.length) * Math.PI * 4;
      const radius = 5 + (idx % 3) * 2.5;
      const zPos = -10 - idx * 7.5; // Spread from -10 to -125
      const baseY = 1.5 + (idx % 4) * 0.8;

      plane.position.set(Math.cos(angle) * radius, baseY, zPos);
      this.worldRoot.add(plane);
      this.floatingGlyphs.push({ mesh: plane, baseY, phase: idx * 0.8 });
    });
  }

  // =========================================================================
  // VFX 4: EXPANDING SHOCKWAVE ENERGY RINGS
  // =========================================================================
  private buildShockwaveEnergyRings() {
    const ringGeo = new THREE.RingGeometry(0.8, 1.05, 64);
    
    // Wave 1: Act 1 Book
    const waveMat1 = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const wave1 = new THREE.Mesh(ringGeo, waveMat1);
    wave1.rotation.x = -Math.PI / 2;
    wave1.position.set(0, 0.04, 0);
    this.act1BookGroup.add(wave1);
    this.shockwaveRings.push({ mesh: wave1, maxScale: 4.5, speed: 0.8, offset: 0 });

    // Wave 2: Act 3 Socratic Core
    const waveMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const wave2 = new THREE.Mesh(ringGeo, waveMat2);
    wave2.rotation.x = -Math.PI / 2;
    wave2.position.set(0, -1.4, 0);
    this.act3LibraryGroup.add(wave2);
    this.shockwaveRings.push({ mesh: wave2, maxScale: 6.0, speed: 0.7, offset: 1.2 });
  }

  // =========================================================================
  // VFX 5: SPIRAL PARTICLE VORTEX FROM THE BOOK
  // =========================================================================
  private buildBookSpiralVortex() {
    const vortexCount = 360;
    const positions = new Float32Array(vortexCount * 3);
    const colors = new Float32Array(vortexCount * 3);

    for (let i = 0; i < vortexCount; i++) {
      positions[i * 3 + 0] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Golden gradient
      colors[i * 3 + 0] = 0.98;
      colors[i * 3 + 1] = 0.85;
      colors[i * 3 + 2] = 0.45;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.bookSpiralVortex = new THREE.Points(geo, mat);
    this.act1BookGroup.add(this.bookSpiralVortex);
  }

  // =========================================================================
  // VFX 6: DYNAMIC CYBER GRID FLOOR
  // =========================================================================
  private buildCyberGridFloor() {
    this.cyberGridFloor = new THREE.GridHelper(160, 60, 0x2e6d53, 0xd0e2d8);
    this.cyberGridFloor.position.set(0, -1.8, -65);
    (this.cyberGridFloor.material as THREE.Material).transparent = true;
    (this.cyberGridFloor.material as THREE.Material).opacity = 0.28;
    this.worldRoot.add(this.cyberGridFloor);
  }

  // =========================================================================
  // ACT I: KHỞI NGUỒN TRI THỨC (World Coordinates Z = 0)
  // Luxury 3D Book with PBR Leather, Gold Foil Emboss & Opening Fanning Pages
  // =========================================================================
  private buildAct1LivingBook() {
    this.act1BookGroup = new THREE.Group();
    this.act1BookGroup.position.set(0, 0, 0);

    // Procedural leather texture
    const leatherCanvas = document.createElement('canvas');
    leatherCanvas.width = 512;
    leatherCanvas.height = 512;
    const ctx = leatherCanvas.getContext('2d')!;
    ctx.fillStyle = '#1c4837';
    ctx.fillRect(0, 0, 512, 512);
    // Subtle leather grain
    for (let i = 0; i < 8000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)';
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
    // Gold ornamental foil border
    ctx.strokeStyle = '#dfba6b';
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, 464, 464);
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, 440, 440);
    // Gold emblem in center
    ctx.fillStyle = '#f3d38c';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('KIYOEDU', 256, 230);
    ctx.font = '20px serif';
    ctx.fillText('GDPT 2018', 256, 280);

    const leatherTexture = new THREE.CanvasTexture(leatherCanvas);

    const leatherMat = new THREE.MeshStandardMaterial({
      map: leatherTexture,
      roughness: 0.35,
      metalness: 0.25,
      bumpScale: 0.04,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdfba6b,
      roughness: 0.2,
      metalness: 0.85,
    });

    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xfbf9f1,
      roughness: 0.88,
      metalness: 0.05,
    });

    // 1. Book Back Cover
    const coverGeo = new THREE.BoxGeometry(2.6, 0.07, 3.4);
    const backCover = new THREE.Mesh(coverGeo, leatherMat);
    backCover.position.set(0, -0.04, 0);
    backCover.receiveShadow = true;
    backCover.castShadow = true;
    this.act1BookGroup.add(backCover);

    // 2. Book Spine
    const spineGeo = new THREE.CylinderGeometry(0.24, 0.24, 3.4, 24);
    const spine = new THREE.Mesh(spineGeo, leatherMat);
    spine.rotation.x = Math.PI / 2;
    spine.position.set(-1.25, 0.16, 0);
    spine.castShadow = true;
    this.act1BookGroup.add(spine);

    // 3. Pages Block
    const pagesGeo = new THREE.BoxGeometry(2.4, 0.32, 3.2);
    const pageBlock = new THREE.Mesh(pagesGeo, paperMat);
    pageBlock.position.set(0.06, 0.16, 0);
    pageBlock.castShadow = true;
    pageBlock.receiveShadow = true;
    this.act1BookGroup.add(pageBlock);

    // 4. Gold Page Gilt Edge
    const giltGeo = new THREE.BoxGeometry(0.04, 0.31, 3.2);
    const gilt = new THREE.Mesh(giltGeo, goldMat);
    gilt.position.set(1.27, 0.16, 0);
    this.act1BookGroup.add(gilt);

    // 5. Front Cover (Animated to Open)
    this.bookCoverMesh = new THREE.Mesh(coverGeo, leatherMat);
    this.bookCoverMesh.position.set(-1.25, 0.36, 0);
    this.bookCoverMesh.geometry.translate(1.3, 0, 0); // pivot at spine
    this.bookCoverMesh.castShadow = true;
    this.act1BookGroup.add(this.bookCoverMesh);

    // 6. Fanning Parchment Pages
    this.bookPages = [];
    for (let i = 0; i < 6; i++) {
      const pageGeo = new THREE.BoxGeometry(2.38, 0.012, 3.18);
      pageGeo.translate(1.19, 0, 0);
      const page = new THREE.Mesh(pageGeo, paperMat);
      page.position.set(-1.25, 0.33 - i * 0.035, 0);
      page.castShadow = true;
      this.bookPages.push(page);
      this.act1BookGroup.add(page);
    }

    // 7. Luminous Knowledge Particles rising from open book
    const particleGeo = new THREE.BufferGeometry();
    const pCount = 220;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3 + 0] = (Math.random() - 0.5) * 2.8;
      pPositions[i * 3 + 1] = Math.random() * 2.5 + 0.3;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0x68b990,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    this.bookGlowParticles = new THREE.Points(particleGeo, pMat);
    this.act1BookGroup.add(this.bookGlowParticles);

    this.worldRoot.add(this.act1BookGroup);
  }

  // =========================================================================
  // ACT II: KHÁM PHÁ KIYOEDU — LEARNING PAVILION & 3D WORKSTATION (Z = -35)
  // Modern Architectural Campus, Floating Glass Workstation & Smartphone
  // =========================================================================
  private buildAct2LearningPavilion() {
    this.act2PavilionGroup = new THREE.Group();
    this.act2PavilionGroup.position.set(0, 0, -35);

    // 1. Pavilion Floor (Warm Wood Texture)
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512;
    floorCanvas.height = 512;
    const fCtx = floorCanvas.getContext('2d')!;
    fCtx.fillStyle = '#e8eee6';
    fCtx.fillRect(0, 0, 512, 512);
    fCtx.strokeStyle = 'rgba(23,43,35,0.06)';
    fCtx.lineWidth = 1;
    for (let y = 0; y < 512; y += 32) {
      fCtx.beginPath();
      fCtx.moveTo(0, y);
      fCtx.lineTo(512, y);
      fCtx.stroke();
    }
    const floorTexture = new THREE.CanvasTexture(floorCanvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(8, 8);

    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.6,
      metalness: 0.08,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(36, 42), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1.6, 0);
    floor.receiveShadow = true;
    this.act2PavilionGroup.add(floor);

    // 2. Architectural Pillars (Clean Concrete & Glass)
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5ef,
      roughness: 0.3,
      metalness: 0.1,
    });
    for (const x of [-7, 7]) {
      for (const z of [-12, -4, 4, 12]) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 6.5, 0.5), pillarMat);
        pillar.position.set(x, 1.6, z);
        pillar.castShadow = true;
        pillar.receiveShadow = true;
        this.act2PavilionGroup.add(pillar);
      }
    }

    // 3. Floating 3D Workstation Monitor Display
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 1.2, 0);

    // Monitor Bezel (Anodized Dark Emerald Aluminum)
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x142820,
      metalness: 0.8,
      roughness: 0.25,
    });
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.2, 0.12), bezelMat);
    bezel.castShadow = true;
    monitorGroup.add(bezel);

    // Monitor Stand
    const standNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.6, 16), bezelMat);
    standNeck.position.set(0, -1.8, -0.2);
    monitorGroup.add(standNeck);

    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.06, 32), bezelMat);
    standBase.position.set(0, -2.6, 0);
    monitorGroup.add(standBase);

    // Procedural Live Product UI Canvas Texture
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const sCtx = screenCanvas.getContext('2d')!;
    // UI Background
    sCtx.fillStyle = '#f8f9f6';
    sCtx.fillRect(0, 0, 1024, 640);
    // Sidebar
    sCtx.fillStyle = '#172b23';
    sCtx.fillRect(0, 0, 220, 640);
    // Brand title in sidebar
    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 24px sans-serif';
    sCtx.fillText('KiyoEdu', 24, 48);
    sCtx.fillStyle = '#70ba93';
    sCtx.font = '14px sans-serif';
    sCtx.fillText('Quản Lý Học Sinh 360°', 24, 76);
    // Sidebar menu items
    const menuItems = ['Hồ sơ học sinh', 'Sổ điểm Thông tư 22', 'Điểm danh chuyên cần', 'Thời khóa biểu', 'Báo cáo Sở GD&ĐT'];
    sCtx.font = '15px sans-serif';
    menuItems.forEach((item, idx) => {
      sCtx.fillStyle = idx === 0 ? '#3b8060' : 'rgba(255,255,255,0.65)';
      if (idx === 0) sCtx.fillRect(12, 110 + idx * 44, 196, 36);
      sCtx.fillStyle = idx === 0 ? '#ffffff' : 'rgba(255,255,255,0.75)';
      sCtx.fillText(item, 28, 134 + idx * 44);
    });
    // Main UI Dashboard
    sCtx.fillStyle = '#ffffff';
    sCtx.fillRect(240, 20, 764, 120);
    sCtx.fillStyle = '#172b23';
    sCtx.font = 'bold 22px sans-serif';
    sCtx.fillText('Tổng quan Lớp 10A1 — Năm học 2026-2027', 260, 56);
    sCtx.font = '14px sans-serif';
    sCtx.fillStyle = '#52665b';
    sCtx.fillText('Sĩ số: 38 học sinh · Chuyên cần: 99.2% · Điểm TB môn: 8.85 (Xuất sắc)', 260, 92);
    // Data Table Rows
    const tableY = 160;
    sCtx.fillStyle = '#ffffff';
    sCtx.fillRect(240, tableY, 764, 440);
    sCtx.fillStyle = '#e4efe7';
    sCtx.fillRect(240, tableY, 764, 40);
    sCtx.fillStyle = '#172b23';
    sCtx.font = 'bold 14px sans-serif';
    sCtx.fillText('MÃ HS', 260, tableY + 26);
    sCtx.fillText('HỌ VÀ TÊN', 360, tableY + 26);
    sCtx.fillText('TOÁN', 580, tableY + 26);
    sCtx.fillText('VĂN', 660, tableY + 26);
    sCtx.fillText('ANH', 740, tableY + 26);
    sCtx.fillText('ĐTBmhk', 820, tableY + 26);
    sCtx.fillText('XẾP LOẠI', 910, tableY + 26);

    const students = [
      { id: 'HS001', name: 'Nguyễn Hoàng Long', m: '9.5', v: '8.5', e: '9.0', avg: '9.0', rank: 'Xuất sắc' },
      { id: 'HS002', name: 'Trần Thị Mai Anh', m: '8.5', v: '9.0', e: '9.2', avg: '8.9', rank: 'Giỏi' },
      { id: 'HS003', name: 'Lê Quốc Bảo', m: '8.0', v: '8.2', e: '8.5', avg: '8.2', rank: 'Khá' },
      { id: 'HS004', name: 'Vũ Thảo Nguyên', m: '9.0', v: '8.8', e: '9.4', avg: '9.1', rank: 'Xuất sắc' },
      { id: 'HS005', name: 'Phạm Minh Đức', m: '9.8', v: '9.2', e: '9.6', avg: '9.5', rank: 'Xuất sắc' },
    ];
    sCtx.font = '14px sans-serif';
    students.forEach((s, idx) => {
      const rowY = tableY + 65 + idx * 52;
      sCtx.fillStyle = idx % 2 === 0 ? '#fbfdfb' : '#ffffff';
      sCtx.fillRect(242, rowY - 26, 760, 48);
      sCtx.fillStyle = '#172b23';
      sCtx.fillText(s.id, 260, rowY);
      sCtx.font = 'bold 14px sans-serif';
      sCtx.fillText(s.name, 360, rowY);
      sCtx.font = '14px sans-serif';
      sCtx.fillText(s.m, 580, rowY);
      sCtx.fillText(s.v, 660, rowY);
      sCtx.fillText(s.e, 740, rowY);
      sCtx.fillStyle = '#245b45';
      sCtx.font = 'bold 15px sans-serif';
      sCtx.fillText(s.avg, 820, rowY);
      sCtx.fillStyle = '#166534';
      sCtx.fillText(s.rank, 910, rowY);
    });

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.15,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: screenTexture,
      emissiveIntensity: 0.22,
    });
    this.workstationScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 3.0), screenMat);
    this.workstationScreenMesh.position.set(0, 0, 0.07);
    monitorGroup.add(this.workstationScreenMesh);

    // VFX: Concentric Holographic Gyro Ring around Workstation
    const monitorGyro = new THREE.Group();
    for (let r = 0; r < 2; r++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.6 + r * 0.4, 0.02, 16, 80),
        new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending })
      );
      ring.rotation.x = Math.PI / 4 + r * 0.3;
      monitorGyro.add(ring);
    }
    monitorGroup.add(monitorGyro);
    this.techHoloRings.push({ group: monitorGyro, speedX: 0.005, speedY: 0.008, speedZ: 0.003 });

    this.act2PavilionGroup.add(monitorGroup);

    // 4. Floating 3D Mobile Smartphone (Sổ liên lạc phụ huynh)
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(3.4, 0.2, 1.8);
    phoneGroup.rotation.y = -0.35;

    const phoneBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 2.4, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x0f1c16, roughness: 0.2, metalness: 0.9 })
    );
    phoneGroup.add(phoneBody);

    // Mobile screen texture
    const phoneCanvas = document.createElement('canvas');
    phoneCanvas.width = 300;
    phoneCanvas.height = 600;
    const pCtx = phoneCanvas.getContext('2d')!;
    pCtx.fillStyle = '#f8f9f6';
    pCtx.fillRect(0, 0, 300, 600);
    pCtx.fillStyle = '#245b45';
    pCtx.fillRect(0, 0, 300, 70);
    pCtx.fillStyle = '#ffffff';
    pCtx.font = 'bold 16px sans-serif';
    pCtx.fillText('SỔ LIÊN LẠC ĐIỆN TỬ', 20, 42);
    pCtx.fillStyle = '#166534';
    pCtx.fillRect(16, 90, 268, 80);
    pCtx.fillStyle = '#ffffff';
    pCtx.font = 'bold 14px sans-serif';
    pCtx.fillText('ĐIỂM DANH HÔM NAY', 30, 118);
    pCtx.font = '13px sans-serif';
    pCtx.fillText('✓ Có mặt an toàn lúc 07:12', 30, 146);

    const phoneTexture = new THREE.CanvasTexture(phoneCanvas);
    const phoneScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.14, 2.3),
      new THREE.MeshStandardMaterial({
        map: phoneTexture,
        roughness: 0.1,
        emissive: 0xffffff,
        emissiveMap: phoneTexture,
        emissiveIntensity: 0.25,
      })
    );
    phoneScreen.position.set(0, 0, 0.045);
    phoneGroup.add(phoneScreen);

    this.mobilePhoneMesh = phoneGroup as any;
    this.act2PavilionGroup.add(phoneGroup);

    this.worldRoot.add(this.act2PavilionGroup);
  }

  // =========================================================================
  // ACT III: THẾ GIỚI GIÁO DỤC TƯƠNG LAI — DIGITAL LIBRARY & KIYO AI (Z = -80)
  // Luminous Data Columns, Realtime Quiz Stage, Refractive Socratic Crystal Core
  // =========================================================================
  private buildAct3DigitalLibrary() {
    this.act3LibraryGroup = new THREE.Group();
    this.act3LibraryGroup.position.set(0, 0, -80);

    // 1. Digital Library Data Columns
    const colMat = new THREE.MeshStandardMaterial({
      color: 0x245b45,
      roughness: 0.2,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85,
    });

    const glowPillarMat = new THREE.MeshStandardMaterial({
      color: 0x70ba93,
      emissive: 0x3b8060,
      emissiveIntensity: 0.6,
      roughness: 0.1,
    });

    this.dataColumns = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 9.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const h = 5 + (i % 3) * 2;

      const col = new THREE.Mesh(new THREE.BoxGeometry(0.8, h, 0.8), colMat);
      col.position.set(x, h / 2 - 2, z);
      col.castShadow = true;
      this.act3LibraryGroup.add(col);
      this.dataColumns.push(col);

      // Glowing spine on each column
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, h * 0.9, 0.82), glowPillarMat);
      spine.position.set(x, h / 2 - 2, z);
      this.act3LibraryGroup.add(spine);
    }

    // 2. Realtime Quiz Arena Center Floor (Circular Radial Neon Disc)
    const stageRing = new THREE.Mesh(
      new THREE.RingGeometry(3.5, 4.0, 64),
      new THREE.MeshStandardMaterial({
        color: 0x4ade80,
        emissive: 0x22c55e,
        emissiveIntensity: 0.8,
        side: THREE.DoubleSide,
      })
    );
    stageRing.rotation.x = -Math.PI / 2;
    stageRing.position.set(0, -1.5, 0);
    this.act3LibraryGroup.add(stageRing);

    // 3. Socratic Wisdom Core: Refractive Glass Sphere & Orbiting Golden Rings
    this.socraticCoreGroup = new THREE.Group();
    this.socraticCoreGroup.position.set(0, 1.8, 0);

    // Inner Luminous Core
    const coreSphereGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xfffaed,
      emissive: 0xf3d38c,
      emissiveIntensity: 0.9,
      roughness: 0.15,
      metalness: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreSphereGeo, coreMat);
    this.socraticCoreGroup.add(coreMesh);

    // Outer Translucent Liquid Glass Shell
    const shellGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x70ba93,
      transparent: true,
      opacity: 0.45,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.7,
      ior: 1.5,
    });
    const shellMesh = new THREE.Mesh(shellGeo, glassMat);
    this.socraticCoreGroup.add(shellMesh);

    // Orbiting Golden Thin Rings
    this.socraticRings = [];
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.TorusGeometry(2.1 + r * 0.4, 0.035, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xdfba6b,
        roughness: 0.2,
        metalness: 0.9,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / (3 + r);
      ringMesh.rotation.y = (r * Math.PI) / 3;
      this.socraticRings.push(ringMesh);
      this.socraticCoreGroup.add(ringMesh);
    }

    // VFX: Add fast orbiting cyber gyroscope around Socratic Core
    const socraticHoloGyro = new THREE.Group();
    for (let r = 0; r < 3; r++) {
      const hRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.0 + r * 0.35, 0.015, 16, 80),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
      );
      hRing.rotation.y = (r * Math.PI) / 3;
      socraticHoloGyro.add(hRing);
    }
    this.socraticCoreGroup.add(socraticHoloGyro);
    this.techHoloRings.push({ group: socraticHoloGyro, speedX: 0.008, speedY: 0.014, speedZ: -0.006 });

    this.act3LibraryGroup.add(this.socraticCoreGroup);
    this.worldRoot.add(this.act3LibraryGroup);
  }

  // =========================================================================
  // ACT IV: TƯƠNG LAI & KIẾN TẠO — GRAND HORIZON & GOLDEN EMBLEM (Z = -135)
  // Grand Floating Emblem, Warm Golden Sunrise Sky & Majestic Perspective
  // =========================================================================
  private buildAct4GrandHorizon() {
    this.act4HorizonGroup = new THREE.Group();
    this.act4HorizonGroup.position.set(0, 0, -135);

    // Grand Monument Platform
    const monumentBase = new THREE.Mesh(
      new THREE.CylinderGeometry(8, 9, 0.8, 48),
      new THREE.MeshStandardMaterial({ color: 0x172b23, roughness: 0.4, metalness: 0.2 })
    );
    monumentBase.position.set(0, -1.2, 0);
    this.act4HorizonGroup.add(monumentBase);

    // Floating Grand 3D KiyoEdu Emblem
    this.grandEmblemGroup = new THREE.Group();
    this.grandEmblemGroup.position.set(0, 3.2, 0);

    const goldEmblemMat = new THREE.MeshStandardMaterial({
      color: 0xf3d38c,
      roughness: 0.15,
      metalness: 0.85,
    });

    // Central Emblem Monogram 'K' and Lotus/Shield motif
    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.14, 24, 100),
      goldEmblemMat
    );
    this.grandEmblemGroup.add(outerRing);

    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.08, 24, 100),
      goldEmblemMat
    );
    this.grandEmblemGroup.add(innerRing);

    // Central Stylized 'K' Pillars
    const kStem = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.2, 0.35), goldEmblemMat);
    kStem.position.set(-0.7, 0, 0);
    this.grandEmblemGroup.add(kStem);

    const kArm1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.8, 0.32), goldEmblemMat);
    kArm1.position.set(0.2, 0.7, 0);
    kArm1.rotation.z = -Math.PI / 4;
    this.grandEmblemGroup.add(kArm1);

    const kArm2 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.9, 0.32), goldEmblemMat);
    kArm2.position.set(0.3, -0.7, 0);
    kArm2.rotation.z = Math.PI / 4;
    this.grandEmblemGroup.add(kArm2);

    this.act4HorizonGroup.add(this.grandEmblemGroup);
    this.worldRoot.add(this.act4HorizonGroup);
  }

  // =========================================================================
  // MOUSE MOVEMENT LISTENER
  // =========================================================================
  private handleMouseMove(e: MouseEvent) {
    this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  // =========================================================================
  // CONTINUOUS 60 FPS ANIMATION LOOP
  // =========================================================================
  private startLoop() {
    const tick = () => {
      if (this.isDisposed) return;
      this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      // Smooth progress interpolation
      this.currentProgress += (this.targetProgress - this.currentProgress) * 0.14;
      const p = Math.max(0, Math.min(1, this.currentProgress));

      // Mouse Parallax Lag
      this.mouseLagX += (this.mouseX - this.mouseLagX) * 0.06;
      this.mouseLagY += (this.mouseY - this.mouseLagY) * 0.06;

      // 1. Evaluate Spline Camera Path
      this.evaluateCameraAndLighting(p, time);

      // 2. Animate Global Particle Field
      if (this.globalParticles && this.globalParticleBasePositions) {
        const posAttr = this.globalParticles.geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        const count = posArray.length / 3;

        for (let i = 0; i < count; i += 4) { // Sample every 4th for optimal 60fps performance
          const bx = this.globalParticleBasePositions[i * 3 + 0];
          const by = this.globalParticleBasePositions[i * 3 + 1];
          const bz = this.globalParticleBasePositions[i * 3 + 2];

          posArray[i * 3 + 1] = by + Math.sin(time * 0.8 + bx * 0.3) * 0.25;
          posArray[i * 3 + 0] = bx + Math.cos(time * 0.6 + bz * 0.2) * 0.2;
        }
        posAttr.needsUpdate = true;
        this.globalParticles.rotation.y = time * 0.015;
      }

      // 3. Animate Volumetric Light Beams (Breathing Opacity)
      this.lightBeams.forEach((beam) => {
        const mat = beam.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = beam.baseOpacity + Math.sin(time * 1.6 + beam.phase) * 0.05;
        beam.mesh.rotation.y += 0.002;
      });

      // 4. Animate Tech Gyro Rings
      this.techHoloRings.forEach((gyro) => {
        gyro.group.rotation.x += gyro.speedX;
        gyro.group.rotation.y += gyro.speedY;
        gyro.group.rotation.z += gyro.speedZ;
      });

      // 5. Animate Floating Runes
      this.floatingGlyphs.forEach((g) => {
        g.mesh.position.y = g.baseY + Math.sin(time * 1.5 + g.phase) * 0.25;
        g.mesh.rotation.y = Math.sin(time * 0.8 + g.phase) * 0.35;
      });

      // 6. Animate Expanding Shockwave Rings
      this.shockwaveRings.forEach((wave) => {
        const cycle = ((time * wave.speed + wave.offset) % 2.5) / 2.5; // 0 to 1
        const scale = 1 + cycle * wave.maxScale;
        wave.mesh.scale.set(scale, scale, scale);
        const mat = wave.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 0.7 * (1 - cycle));
      });

      // 7. Animate Spiral Vortex from Book
      if (this.bookSpiralVortex) {
        const posAttr = this.bookSpiralVortex.geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        const vCount = posArray.length / 3;

        for (let i = 0; i < vCount; i++) {
          const height = ((time * 0.75 + (i / vCount) * 2.8) % 2.8);
          const angle = height * 5.0 + (i * 0.08);
          const radius = 0.2 + height * 0.4;
          posArray[i * 3 + 0] = Math.cos(angle) * radius;
          posArray[i * 3 + 1] = height + 0.3;
          posArray[i * 3 + 2] = Math.sin(angle) * radius;
        }
        posAttr.needsUpdate = true;
      }

      // Render Scene
      this.renderer.render(this.scene, this.camera);

      this.animFrameId = requestAnimationFrame(tick);
    };

    this.animFrameId = requestAnimationFrame(tick);
  }

  // =========================================================================
  // CAMERA SPLINE & WORLD EVALUATION AT PROGRESS
  // =========================================================================
  private evaluateCameraAndLighting(p: number, time: number) {
    let camX = 0;
    let camY = 1.8;
    let camZ = 6.5;

    let targetX = 0;
    let targetY = 0.5;
    let targetZ = 0;

    if (p <= 0.14) {
      // Act I: Opening on the book (Z = 0)
      const t = p / 0.14;
      camX = Math.sin(t * Math.PI * 0.4) * 0.6;
      camY = THREE.MathUtils.lerp(2.2, 1.45, t);
      camZ = THREE.MathUtils.lerp(6.5, 3.6, t);

      targetX = 0;
      targetY = THREE.MathUtils.lerp(0.3, 0.2, t);
      targetZ = 0;

      // Animate Book Opening smoothly
      const bookOpenT = Math.min(1, Math.max(0, (p - 0.03) / 0.08));
      this.bookCoverMesh.rotation.y = -bookOpenT * Math.PI * 0.95;
      this.bookPages.forEach((page, idx) => {
        const pageDelay = idx * 0.12;
        const pageT = Math.min(1, Math.max(0, (bookOpenT - pageDelay) / 0.5));
        page.rotation.y = -pageT * Math.PI * (0.85 - idx * 0.06);
      });

      if (this.bookGlowParticles) {
        this.bookGlowParticles.rotation.y = time * 0.4;
      }
    } else if (p <= 0.25) {
      // Transition from Book into Learning Pavilion (Z = 0 -> Z = -35)
      const t = (p - 0.14) / 0.11;
      camX = Math.sin(t * Math.PI) * 2.4;
      camY = THREE.MathUtils.lerp(1.45, 2.0, t);
      camZ = THREE.MathUtils.lerp(3.6, -26, t);

      targetX = Math.sin(t * Math.PI * 0.5) * 0.8;
      targetY = 1.2;
      targetZ = THREE.MathUtils.lerp(0, -35, t);
    } else if (p <= 0.60) {
      // Act II: Focused on the Workstation & School Administration (Z = -35)
      const t = (p - 0.25) / 0.35;
      camX = THREE.MathUtils.lerp(-1.6, 1.8, t);
      camY = THREE.MathUtils.lerp(1.7, 1.35, t);
      camZ = THREE.MathUtils.lerp(-28, -31, t);

      targetX = 0;
      targetY = 1.2;
      targetZ = -35;
    } else if (p <= 0.80) {
      // Act III: Teachers, Students & Mobile Phone Orbit (Z = -35 -> Z = -60)
      const t = (p - 0.60) / 0.20;
      camX = Math.sin(t * Math.PI) * 2.8 + 1.2;
      camY = THREE.MathUtils.lerp(1.35, 1.8, t);
      camZ = THREE.MathUtils.lerp(-31, -55, t);

      targetX = 1.2;
      targetY = 1.0;
      targetZ = -45;

      if (this.mobilePhoneMesh) {
        this.mobilePhoneMesh.position.y = 0.2 + Math.sin(time * 2.0) * 0.08;
        this.mobilePhoneMesh.rotation.y = -0.35 + Math.sin(time * 1.2) * 0.15;
      }
    } else if (p <= 0.94) {
      // Act IV: Digital Library & Socratic Core (Z = -55 -> Z = -80)
      const t = (p - 0.80) / 0.14;
      camX = Math.cos(t * Math.PI * 1.5) * 3.6;
      camY = THREE.MathUtils.lerp(1.8, 2.7, t);
      camZ = THREE.MathUtils.lerp(-55, -74, t);

      targetX = 0;
      targetY = 1.8;
      targetZ = -80;

      if (this.socraticCoreGroup) {
        this.socraticCoreGroup.rotation.y = time * 0.6;
        this.socraticRings.forEach((ring, idx) => {
          ring.rotation.z = time * (idx + 1) * 0.4;
        });
      }
    } else {
      // Act IV Grand Finale: Majestic Pull-Back Ascent to Grand Horizon (Z = -74 -> Z = -135)
      const t = (p - 0.94) / 0.06;
      camX = Math.sin(t * Math.PI * 0.5) * 1.4;
      camY = THREE.MathUtils.lerp(2.7, 6.2, t);
      camZ = THREE.MathUtils.lerp(-74, -120, t);

      targetX = 0;
      targetY = THREE.MathUtils.lerp(1.8, 3.2, t);
      targetZ = -135;

      if (this.grandEmblemGroup) {
        this.grandEmblemGroup.rotation.y = time * 0.4;
        this.grandEmblemGroup.position.y = 3.2 + Math.sin(time * 1.5) * 0.15;
      }
    }

    // Apply Interactive Mouse Parallax to Camera
    camX += this.mouseLagX * 0.85;
    camY += this.mouseLagY * 0.45;
    targetX += this.mouseLagX * 0.3;
    targetY += this.mouseLagY * 0.15;

    this.camera.position.set(camX, camY, camZ);
    this.camera.lookAt(targetX, targetY, targetZ);

    // Continuous Dynamic Lighting Progression
    if (p < 0.25) {
      this.keySunLight.color.setHex(0xfffaec);
      this.keySunLight.intensity = 2.8;
      this.ambientLight.intensity = 1.35;
      this.scene.background = new THREE.Color(0xf6f8f5);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.setHex(0xf6f8f5);
    } else if (p < 0.65) {
      this.keySunLight.color.setHex(0xffffff);
      this.keySunLight.intensity = 2.9;
      this.ambientLight.intensity = 1.4;
      this.scene.background = new THREE.Color(0xf8faf7);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.setHex(0xf8faf7);
    } else if (p < 0.85) {
      this.keySunLight.color.setHex(0xf3eed9);
      this.keySunLight.intensity = 3.0;
      this.ambientLight.intensity = 1.3;
      this.scene.background = new THREE.Color(0xf4f7f3);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.setHex(0xf4f7f3);
    } else {
      this.keySunLight.color.setHex(0xffe6b8);
      this.keySunLight.intensity = 3.4;
      this.ambientLight.intensity = 1.45;
      this.scene.background = new THREE.Color(0xfbf6ee);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.setHex(0xfbf6ee);
    }
  }

  // =========================================================================
  // PUBLIC API
  // =========================================================================
  public setProgress(progress: number) {
    this.targetProgress = Math.max(0, Math.min(1, progress));
  }

  // Backwards compatibility
  public renderAtProgress(progress: number) {
    this.setProgress(progress);
  }

  public handleResize() {
    if (this.isDisposed || !this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose() {
    this.isDisposed = true;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener('mousemove', this.onMouseMoveBound);
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
