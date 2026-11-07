import * as THREE from 'three';

/**
 * MASTER KIYOEDU 3D CINEMATIC WEBGL ENGINE
 * Powered by Three.js
 * 
 * Features:
 * - 15 Continuous 3D Stages on ONE Unified Master Timeline (0.000 -> 1.000)
 * - Single Camera Rig with Continuous Spline Interpolation (No scene recreate, no resets)
 * - True 3D Geometries: 3D Opening Book, Knowledge Crystals, Vietnam Terrain, School & Classroom,
 *   3D Workstation with REAL KiyoEdu UI Canvas, Data Bar Matrix, Futuristic Library, Solar-to-Atom Morph,
 *   Procedural Geometric Kiyo AI Core, Connected 4 Pillars, Technology Exploded View, Sunset Classroom,
 *   Sky Ascension, and Grand 3D KiyoEdu Emblem.
 * - Dynamic Cinematic Lighting: Dawn -> Morning -> High Noon -> Warm Library -> Neural Jade -> Sunset -> Studio White.
 */
export class Cinematic3DEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Lighting
  private ambientLight: THREE.AmbientLight;
  private sunLight: THREE.DirectionalLight;
  private focusLight: THREE.PointLight;

  // 15 Stage Groups
  private stage01Book!: THREE.Group;
  private stage02Knowledge!: THREE.Group;
  private stage03Vietnam!: THREE.Group;
  private stage04School!: THREE.Group;
  private stage05Platform!: THREE.Group;
  private stage06Data!: THREE.Group;
  private stage07Library!: THREE.Group;
  private stage08Immersive!: THREE.Group;
  private stage09AI!: THREE.Group;
  private stage10Connected!: THREE.Group;
  private stage11Ecosystem!: THREE.Group;
  private stage12Exploded!: THREE.Group;
  private stage13Human!: THREE.Group;
  private stage14Perspective!: THREE.Group;
  private stage15Future!: THREE.Group;

  // Stage References for Animation
  private bookCover!: THREE.Mesh;
  private bookPages!: THREE.Mesh[];
  private birdsGroup!: THREE.Group;
  private schoolDoors!: THREE.Group;
  private laptopScreenTexture!: THREE.CanvasTexture;
  private dataBars: THREE.Mesh[] = [];
  private solarSystemGroup!: THREE.Group;
  private atomGroup!: THREE.Group;
  private aiCoreGroup!: THREE.Group;
  private aiRings: THREE.Mesh[] = [];
  private explodedLayers: THREE.Group[] = [];
  private connectedNodes: THREE.Mesh[] = [];
  private connectedLines!: THREE.LineSegments;
  private emblemMesh!: THREE.Mesh;

  private isDisposed = false;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene & Renderer
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfafbf9);
    this.scene.fog = new THREE.FogExp2(0xfafbf9, 0.012);

    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      800
    );
    this.camera.position.set(0, 1.2, 7);

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
    this.renderer.toneMappingExposure = 1.05;

    container.appendChild(this.renderer.domElement);

    // 2. Dynamic Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfffaed, 2.4);
    this.sunLight.position.set(15, 25, 20);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);

    this.focusLight = new THREE.PointLight(0x315945, 1.5, 30);
    this.focusLight.position.set(0, 2, 0);
    this.scene.add(this.focusLight);

    // 3. Build All 15 Stages Along World Z
    this.buildStage01Book();
    this.buildStage02Knowledge();
    this.buildStage03Vietnam();
    this.buildStage04School();
    this.buildStage05Platform();
    this.buildStage06Data();
    this.buildStage07Library();
    this.buildStage08Immersive();
    this.buildStage09AI();
    this.buildStage10Connected();
    this.buildStage11Ecosystem();
    this.buildStage12Exploded();
    this.buildStage13Human();
    this.buildStage14Perspective();
    this.buildStage15Future();

    // Initial render
    this.updateProgress(0, 0);
  }

  // ==========================================
  // STAGE 01: THE BEGINNING (Z = 0)
  // Realistic 3D Opening Book
  // ==========================================
  private buildStage01Book() {
    this.stage01Book = new THREE.Group();
    this.stage01Book.position.set(0, 0, 0);

    // Book Back Cover
    const backCoverGeo = new THREE.BoxGeometry(2.4, 0.08, 3.2);
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x315945, // KiyoEdu Emerald
      roughness: 0.4,
      metalness: 0.1,
    });
    const backCover = new THREE.Mesh(backCoverGeo, leatherMat);
    backCover.position.set(0, -0.04, 0);
    this.stage01Book.add(backCover);

    // Book Pages Stack
    const pagesGeo = new THREE.BoxGeometry(2.2, 0.35, 3.0);
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xfdfcf7,
      roughness: 0.9,
    });
    const pageStack = new THREE.Mesh(pagesGeo, paperMat);
    pageStack.position.set(0.05, 0.175, 0);
    this.stage01Book.add(pageStack);

    // Book Spine
    const spineGeo = new THREE.CylinderGeometry(0.22, 0.22, 3.2, 16);
    const spine = new THREE.Mesh(spineGeo, leatherMat);
    spine.rotation.x = Math.PI / 2;
    spine.position.set(-1.15, 0.15, 0);
    this.stage01Book.add(spine);

    // Front Cover (Animated to Open)
    this.bookCover = new THREE.Mesh(backCoverGeo, leatherMat);
    this.bookCover.position.set(-1.15, 0.38, 0);
    this.bookCover.geometry.translate(1.2, 0, 0); // pivot at spine
    this.stage01Book.add(this.bookCover);

    // Animated Pages Fanning
    this.bookPages = [];
    for (let i = 0; i < 5; i++) {
      const pGeo = new THREE.BoxGeometry(2.2, 0.015, 3.0);
      pGeo.translate(1.1, 0, 0);
      const pMesh = new THREE.Mesh(pGeo, paperMat);
      pMesh.position.set(-1.15, 0.36 - i * 0.04, 0);
      this.bookPages.push(pMesh);
      this.stage01Book.add(pMesh);
    }

    this.scene.add(this.stage01Book);
  }

  // ==========================================
  // STAGE 02: THE WORLD OF KNOWLEDGE (Z = -35)
  // Mathematical Crystals & Chemical Molecules
  // ==========================================
  private buildStage02Knowledge() {
    this.stage02Knowledge = new THREE.Group();
    this.stage02Knowledge.position.set(0, 0, -35);

    // Polyhedral Math Crystals
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x4fa87b,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1f4433,
      wireframe: true,
    });

    // 1. Icosahedron
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 0), crystalMat);
    ico.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.61, 0), wireMat));
    ico.position.set(-3.5, 1.2, 0);
    this.stage02Knowledge.add(ico);

    // 2. Dodecahedron
    const dodeca = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4, 0), crystalMat);
    dodeca.add(new THREE.Mesh(new THREE.DodecahedronGeometry(1.41, 0), wireMat));
    dodeca.position.set(3.8, -1.0, 3);
    this.stage02Knowledge.add(dodeca);

    // 3. Octahedron
    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(1.3, 0), crystalMat);
    octa.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.31, 0), wireMat));
    octa.position.set(0, 2.5, -4);
    this.stage02Knowledge.add(octa);

    // Chemical Molecule: Benzene Ring with Atoms
    const atomMat = new THREE.MeshStandardMaterial({ color: 0x274a38, roughness: 0.3 });
    const bondMat = new THREE.MeshStandardMaterial({ color: 0x8ec8a5, roughness: 0.5 });
    const moleculeGroup = new THREE.Group();
    moleculeGroup.position.set(0, -0.8, 2);

    const ringRadius = 2.0;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * ringRadius;
      const y = Math.sin(angle) * ringRadius;

      // Atom sphere
      const atom = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), atomMat);
      atom.position.set(x, y, 0);
      moleculeGroup.add(atom);

      // Bond cylinder
      const nextAngle = ((i + 1) / 6) * Math.PI * 2;
      const nx = Math.cos(nextAngle) * ringRadius;
      const ny = Math.sin(nextAngle) * ringRadius;

      const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, ringRadius, 8), bondMat);
      bond.position.set((x + nx) / 2, (y + ny) / 2, 0);
      bond.rotation.z = angle + Math.PI / 6;
      moleculeGroup.add(bond);
    }
    this.stage02Knowledge.add(moleculeGroup);

    this.scene.add(this.stage02Knowledge);
  }

  // ==========================================
  // STAGE 03: VIETNAM FROM ABOVE (Z = -75)
  // 3D Terrain, Winding River & Flock of Birds
  // ==========================================
  private buildStage03Vietnam() {
    this.stage03Vietnam = new THREE.Group();
    this.stage03Vietnam.position.set(0, -4, -75);

    // 3D Rolling Terrain
    const terrainGeo = new THREE.PlaneGeometry(60, 45, 40, 30);
    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const height =
        Math.sin(vx * 0.15) * Math.cos(vy * 0.15) * 2.8 +
        Math.sin(vx * 0.3) * 1.2;
      pos.setZ(i, Math.max(0, height));
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x2e5440,
      roughness: 0.85,
      flatShading: true,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    this.stage03Vietnam.add(terrain);

    // River
    const riverGeo = new THREE.PlaneGeometry(6, 45, 10, 30);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x4a8ea0,
      roughness: 0.1,
      metalness: 0.6,
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(3, 0.15, 0);
    this.stage03Vietnam.add(river);

    // 3D Animated Flock of Birds
    this.birdsGroup = new THREE.Group();
    this.birdsGroup.position.set(0, 8, 5);
    const birdMat = new THREE.MeshStandardMaterial({ color: 0x1f382a, roughness: 0.5 });

    for (let i = 0; i < 7; i++) {
      const bird = new THREE.Group();
      bird.position.set(-8 + i * 2.5, (i % 3) * 0.8, -i * 2);

      // Left wing
      const wingGeo = new THREE.BoxGeometry(0.8, 0.04, 0.3);
      wingGeo.translate(-0.4, 0, 0);
      const leftWing = new THREE.Mesh(wingGeo, birdMat);
      leftWing.name = 'leftWing';

      // Right wing
      const rightWing = new THREE.Mesh(wingGeo, birdMat);
      rightWing.name = 'rightWing';
      rightWing.rotation.y = Math.PI;

      bird.add(leftWing);
      bird.add(rightWing);
      this.birdsGroup.add(bird);
    }
    this.stage03Vietnam.add(this.birdsGroup);

    this.scene.add(this.stage03Vietnam);
  }

  // ==========================================
  // STAGE 04: THE DIGITAL SCHOOL (Z = -120)
  // Architecture, Glass Facade, Opening Doors, Classroom Desks
  // ==========================================
  private buildStage04School() {
    this.stage04School = new THREE.Group();
    this.stage04School.position.set(0, 0, -120);

    // Main Hall Floor
    const floorGeo = new THREE.PlaneGeometry(24, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xeaece8,
      roughness: 0.3,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1.8, 0);
    this.stage04School.add(floor);

    // School Facade Frame & Pillars
    const pillarGeo = new THREE.BoxGeometry(0.6, 6, 0.6);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    for (let x = -6; x <= 6; x += 4) {
      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(x, 1.2, 8);
      this.stage04School.add(p);
    }

    // Interactive Classroom Smart Board
    const boardGeo = new THREE.BoxGeometry(8, 4.2, 0.15);
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x1a2e22,
      roughness: 0.2,
      metalness: 0.5,
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(0, 2.2, -10);
    this.stage04School.add(board);

    // Classroom Desks & Wooden Chairs
    const deskGeo = new THREE.BoxGeometry(2.4, 0.08, 1.2);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xc89d6e, roughness: 0.5 });
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2);
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.3 });

    for (let row = 0; row < 3; row++) {
      for (let col = -1; col <= 1; col++) {
        const deskGroup = new THREE.Group();
        deskGroup.position.set(col * 3.8, -0.6, -2 - row * 3.2);

        const deskTop = new THREE.Mesh(deskGeo, woodMat);
        deskGroup.add(deskTop);

        // Legs
        const leg1 = new THREE.Mesh(legGeo, steelMat);
        leg1.position.set(1.1, -0.6, 0.5);
        deskGroup.add(leg1);
        const leg2 = new THREE.Mesh(legGeo, steelMat);
        leg2.position.set(-1.1, -0.6, 0.5);
        deskGroup.add(leg2);
        const leg3 = new THREE.Mesh(legGeo, steelMat);
        leg3.position.set(1.1, -0.6, -0.5);
        deskGroup.add(leg3);
        const leg4 = new THREE.Mesh(legGeo, steelMat);
        leg4.position.set(-1.1, -0.6, -0.5);
        deskGroup.add(leg4);

        this.stage04School.add(deskGroup);
      }
    }

    // Opening Doors
    this.schoolDoors = new THREE.Group();
    this.schoolDoors.position.set(0, 0.5, 7.8);
    const doorGeo = new THREE.BoxGeometry(1.6, 4.2, 0.1);
    const glassDoorMat = new THREE.MeshStandardMaterial({
      color: 0x98cfb2,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
    });
    const leftDoor = new THREE.Mesh(doorGeo, glassDoorMat);
    leftDoor.position.set(-0.8, 0, 0);
    leftDoor.name = 'leftDoor';
    const rightDoor = new THREE.Mesh(doorGeo, glassDoorMat);
    rightDoor.position.set(0.8, 0, 0);
    rightDoor.name = 'rightDoor';
    this.schoolDoors.add(leftDoor);
    this.schoolDoors.add(rightDoor);
    this.stage04School.add(this.schoolDoors);

    this.scene.add(this.stage04School);
  }

  // ==========================================
  // STAGE 05: KIYOEDU PLATFORM WORKSTATION (Z = -165)
  // 3D Laptop Presenting REAL KiyoEdu UI
  // ==========================================
  private buildStage05Platform() {
    this.stage05Platform = new THREE.Group();
    this.stage05Platform.position.set(0, 0, -165);

    // Aluminum Desk Stand
    const standGeo = new THREE.CylinderGeometry(2.5, 3.0, 0.4, 32);
    const aluMat = new THREE.MeshStandardMaterial({
      color: 0xdde2dc,
      metalness: 0.8,
      roughness: 0.2,
    });
    const stand = new THREE.Mesh(standGeo, aluMat);
    stand.position.set(0, -1.2, 0);
    this.stage05Platform.add(stand);

    // 3D Laptop Body
    const laptopBase = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.12, 2.8),
      aluMat
    );
    laptopBase.position.set(0, -0.9, 0);
    this.stage05Platform.add(laptopBase);

    // Keyboard & Trackpad Indent
    const keyboardMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });
    const keyboard = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.02, 1.4), keyboardMat);
    keyboard.position.set(0, -0.83, -0.3);
    this.stage05Platform.add(keyboard);

    // Laptop Display Screen Hinge
    const screenHinge = new THREE.Group();
    screenHinge.position.set(0, -0.84, -1.35);
    screenHinge.rotation.x = -Math.PI / 12; // tilt screen back 15 deg

    const lidGeo = new THREE.BoxGeometry(4.2, 2.8, 0.1);
    const lid = new THREE.Mesh(lidGeo, aluMat);
    lid.position.set(0, 1.4, 0);
    screenHinge.add(lid);

    // Generate REAL KiyoEdu UI Canvas Texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 680;
    const ctx = canvas.getContext('2d')!;

    // Clean Apple-style UI Layout
    ctx.fillStyle = '#F8FAF9';
    ctx.fillRect(0, 0, 1024, 680);

    // Sidebar
    ctx.fillStyle = '#264837';
    ctx.fillRect(0, 0, 240, 680);

    // Brand
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px -apple-system, sans-serif';
    ctx.fillText('KIYOEDU', 32, 54);
    ctx.fillStyle = '#97D5B1';
    ctx.font = '14px -apple-system, sans-serif';
    ctx.fillText('Hệ thống Quản lý Học sinh', 32, 80);

    // Menu Items
    const menuItems = ['📊 Tổng quan', '👥 Quản lý học sinh', '📚 Danh sách lớp học', '📝 Sổ điểm điện tử', '📅 Thời khóa biểu', '🚀 Web-Học-Tập (Beta)'];
    ctx.font = '15px -apple-system, sans-serif';
    menuItems.forEach((item, idx) => {
      ctx.fillStyle = idx === 1 ? '#3F7056' : 'transparent';
      ctx.fillRect(16, 120 + idx * 46, 208, 38);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(item, 32, 144 + idx * 46);
    });

    // Main Header
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(240, 0, 784, 70);
    ctx.fillStyle = '#1A2E22';
    ctx.font = 'bold 20px -apple-system, sans-serif';
    ctx.fillText('DANH SÁCH HỌC SINH — LỚP 12A1', 270, 44);
    ctx.fillStyle = '#315945';
    ctx.font = 'bold 12px -apple-system, sans-serif';
    ctx.fillText('SĨ SỐ: 38 HỌC SINH | ĐIỂM DANH: 38/38', 780, 44);

    // Data Table Container
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(265, 95, 734, 550);

    // Table Header
    ctx.fillStyle = '#EDF4EF';
    ctx.fillRect(265, 95, 734, 42);
    ctx.fillStyle = '#315945';
    ctx.font = 'bold 13px -apple-system, sans-serif';
    ctx.fillText('MÃ HS', 285, 121);
    ctx.fillText('HỌ VÀ TÊN', 380, 121);
    ctx.fillText('TOÁN', 540, 121);
    ctx.fillText('VẬT LÝ', 620, 121);
    ctx.fillText('HÓA HỌC', 700, 121);
    ctx.fillText('ĐIỂM TB', 780, 121);
    ctx.fillText('XẾP LOẠI', 880, 121);

    // Table Rows
    const students = [
      ['HS001', 'Nguyễn Hoàng Long', '9.2', '8.8', '9.0', '9.0', 'XUẤT SẮC'],
      ['HS002', 'Trần Thị Mai Anh', '8.5', '9.0', '8.6', '8.7', 'GIỎI'],
      ['HS003', 'Lê Quốc Bảo', '8.0', '7.8', '8.2', '8.0', 'KHÁ'],
      ['HS004', 'Phạm Minh Đức', '9.5', '9.4', '9.6', '9.5', 'XUẤT SẮC'],
      ['HS005', 'Vũ Thảo Nguyên', '8.8', '8.5', '8.9', '8.7', 'GIỎI'],
      ['HS006', 'Đỗ Thanh Tùng', '8.2', '8.0', '8.4', '8.2', 'GIỎI'],
      ['HS007', 'Ngô Khánh Linh', '9.0', '9.2', '9.1', '9.1', 'XUẤT SẮC'],
    ];

    students.forEach((s, idx) => {
      const y = 168 + idx * 48;
      ctx.fillStyle = idx % 2 === 0 ? '#FAFBF9' : '#FFFFFF';
      ctx.fillRect(265, y - 26, 734, 44);

      ctx.fillStyle = '#555555';
      ctx.font = '13px -apple-system, sans-serif';
      ctx.fillText(s[0], 285, y);
      ctx.fillStyle = '#1A2E22';
      ctx.font = 'bold 13px -apple-system, sans-serif';
      ctx.fillText(s[1], 380, y);
      ctx.fillStyle = '#315945';
      ctx.font = '13px -apple-system, sans-serif';
      ctx.fillText(s[2], 545, y);
      ctx.fillText(s[3], 625, y);
      ctx.fillText(s[4], 705, y);
      ctx.font = 'bold 13px -apple-system, sans-serif';
      ctx.fillText(s[5], 785, y);

      // Badge
      ctx.fillStyle = s[6] === 'XUẤT SẮC' ? '#D4EDDA' : '#E2E3E5';
      ctx.fillRect(875, y - 18, 85, 24);
      ctx.fillStyle = s[6] === 'XUẤT SẮC' ? '#155724' : '#383D41';
      ctx.font = 'bold 11px -apple-system, sans-serif';
      ctx.fillText(s[6], 885, y - 2);
    });

    this.laptopScreenTexture = new THREE.CanvasTexture(canvas);
    const screenGeo = new THREE.PlaneGeometry(4.0, 2.6);
    const screenMat = new THREE.MeshBasicMaterial({
      map: this.laptopScreenTexture,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 1.4, 0.06);
    screenHinge.add(screen);

    this.stage05Platform.add(screenHinge);
    this.scene.add(this.stage05Platform);
  }

  // ==========================================
  // STAGE 06: DATA BECOMES INTELLIGENCE (Z = -210)
  // 3D Spatial Bar Charts & Flowing Data Network
  // ==========================================
  private buildStage06Data() {
    this.stage06Data = new THREE.Group();
    this.stage06Data.position.set(0, 0, -210);

    const barGeo = new THREE.BoxGeometry(0.6, 1, 0.6);
    barGeo.translate(0, 0.5, 0); // pivot at base
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x315945,
      roughness: 0.2,
      metalness: 0.3,
    });

    this.dataBars = [];
    const gridSize = 6;
    for (let x = -gridSize / 2; x <= gridSize / 2; x++) {
      for (let z = -gridSize / 2; z <= gridSize / 2; z++) {
        const bar = new THREE.Mesh(barGeo, barMat);
        bar.position.set(x * 1.4, -2, z * 1.4);
        this.dataBars.push(bar);
        this.stage06Data.add(bar);
      }
    }

    // Network Lines connecting top of bars
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x76c496,
      transparent: true,
      opacity: 0.7,
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePoints: number[] = [];
    for (let i = 0; i < 20; i++) {
      const idxA = Math.floor(Math.random() * this.dataBars.length);
      const idxB = Math.floor(Math.random() * this.dataBars.length);
      const pA = this.dataBars[idxA].position;
      const pB = this.dataBars[idxB].position;
      linePoints.push(pA.x, pA.y + 2, pA.z, pB.x, pB.y + 2, pB.z);
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    this.stage06Data.add(lines);

    this.scene.add(this.stage06Data);
  }

  // ==========================================
  // STAGE 07: THE DIGITAL LIBRARY (Z = -255)
  // Colonnade of 3D Bookshelves & Glowing Hologram Book
  // ==========================================
  private buildStage07Library() {
    this.stage07Library = new THREE.Group();
    this.stage07Library.position.set(0, 0, -255);

    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x243e30, roughness: 0.4 });
    const bookColors = [0x315945, 0x8ec8a5, 0xc89d6e, 0x2d483a, 0xffffff];

    // Left & Right Bookshelf Colonnades
    for (let side of [-4.5, 4.5]) {
      for (let z = -6; z <= 6; z += 4) {
        const shelfGroup = new THREE.Group();
        shelfGroup.position.set(side, 0, z);

        // Frame
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.8, 6.0, 3.2), shelfMat);
        shelfGroup.add(frame);

        // Books rows
        for (let row = -2; row <= 2; row += 1.2) {
          for (let b = -1.2; b <= 1.2; b += 0.22) {
            const c = bookColors[Math.floor(Math.random() * bookColors.length)];
            const bMesh = new THREE.Mesh(
              new THREE.BoxGeometry(0.6, 0.8 + Math.random() * 0.3, 0.18),
              new THREE.MeshStandardMaterial({ color: c, roughness: 0.6 })
            );
            bMesh.position.set(0.1, row, b);
            shelfGroup.add(bMesh);
          }
        }
        this.stage07Library.add(shelfGroup);
      }
    }

    // Central Hologram Book
    const holoMat = new THREE.MeshStandardMaterial({
      color: 0x9be0b7,
      transparent: true,
      opacity: 0.8,
      roughness: 0.1,
    });
    const holoBook = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.6), holoMat);
    holoBook.position.set(0, 0.5, 0);
    this.stage07Library.add(holoBook);

    this.scene.add(this.stage07Library);
  }

  // ==========================================
  // STAGE 08: IMMERSIVE LEARNING (Z = -300)
  // Solar System Morphing into Atomic Structure
  // ==========================================
  private buildStage08Immersive() {
    this.stage08Immersive = new THREE.Group();
    this.stage08Immersive.position.set(0, 0, -300);

    // 1. Solar System Group
    this.solarSystemGroup = new THREE.Group();
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffb74d });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), sunMat);
    this.solarSystemGroup.add(sun);

    // Planet Orbits
    const orbitColors = [0x5482a0, 0xc27552, 0x9e886b, 0x6e9f82];
    const orbitRadii = [2.2, 3.2, 4.4, 5.6];

    orbitRadii.forEach((r, idx) => {
      // Ring
      const ringGeo = new THREE.RingGeometry(r - 0.02, r + 0.02, 64);
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({ color: 0x315945, side: THREE.DoubleSide })
      );
      ring.rotation.x = Math.PI / 2;
      this.solarSystemGroup.add(ring);

      // Planet
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(0.28 + idx * 0.08, 16, 16),
        new THREE.MeshStandardMaterial({ color: orbitColors[idx] })
      );
      planet.position.set(r, 0, 0);
      planet.name = `planet_${idx}`;
      this.solarSystemGroup.add(planet);
    });
    this.stage08Immersive.add(this.solarSystemGroup);

    // 2. Atom Structure Group (Will morph in as progress advances)
    this.atomGroup = new THREE.Group();
    const nucleus = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x315945, roughness: 0.2 })
    );
    this.atomGroup.add(nucleus);

    // Electron Shell Rings
    for (let i = 0; i < 3; i++) {
      const eRingGeo = new THREE.TorusGeometry(2.5, 0.04, 16, 64);
      const eRing = new THREE.Mesh(
        eRingGeo,
        new THREE.MeshStandardMaterial({ color: 0x6ebd8d, roughness: 0.3 })
      );
      eRing.rotation.x = (i * Math.PI) / 3;
      eRing.rotation.y = (i * Math.PI) / 4;
      this.atomGroup.add(eRing);

      // Electron
      const electron = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      electron.position.set(2.5, 0, 0);
      electron.rotation.z = i * 2;
      this.atomGroup.add(electron);
    }
    this.atomGroup.scale.set(0.001, 0.001, 0.001); // starts hidden
    this.stage08Immersive.add(this.atomGroup);

    this.scene.add(this.stage08Immersive);
  }

  // ==========================================
  // STAGE 09: KIYO AI CORE (Z = -345)
  // Procedural Geometric Neural Lattice
  // ==========================================
  private buildStage09AI() {
    this.stage09AI = new THREE.Group();
    this.stage09AI.position.set(0, 0, -345);

    this.aiCoreGroup = new THREE.Group();

    // Inner Geodesic Core
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x315945,
      metalness: 0.8,
      roughness: 0.15,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    this.aiCoreGroup.add(core);

    // Inner Luminous Core
    const innerLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x8ee0b2 })
    );
    this.aiCoreGroup.add(innerLight);

    // Outer Concentric Gimbal Rings
    this.aiRings = [];
    const ringRadii = [2.2, 2.9, 3.6];
    ringRadii.forEach((r, idx) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.06, 16, 64),
        new THREE.MeshStandardMaterial({ color: 0x234835, roughness: 0.3 })
      );
      ring.rotation.x = idx * 0.8;
      ring.rotation.y = idx * 0.6;
      this.aiRings.push(ring);
      this.aiCoreGroup.add(ring);
    });

    this.stage09AI.add(this.aiCoreGroup);
    this.scene.add(this.stage09AI);
  }

  // ==========================================
  // STAGE 10: CONNECTED EDUCATION (Z = -390)
  // 4 Pillars: School - Teacher - Student - Parent
  // ==========================================
  private buildStage10Connected() {
    this.stage10Connected = new THREE.Group();
    this.stage10Connected.position.set(0, 0, -390);

    const pillarColors = [0x315945, 0x477c61, 0x5fa480, 0x7ecc9e];
    const positions: [number, number, number][] = [
      [0, 3.0, 0],    // School (Top)
      [-3.2, -1.2, 1.8], // Teacher (Left)
      [3.2, -1.2, 1.8],  // Student (Right)
      [0, -1.2, -2.8],  // Parent (Back)
    ];

    this.connectedNodes = [];
    positions.forEach((pos, idx) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(pos[0], pos[1], pos[2]);

      const nodeMesh = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.85, 0),
        new THREE.MeshStandardMaterial({ color: pillarColors[idx], roughness: 0.2 })
      );
      nodeGroup.add(nodeMesh);
      this.connectedNodes.push(nodeMesh);

      this.stage10Connected.add(nodeGroup);
    });

    // Connecting Beams (Tetrahedron edges)
    const linePoints: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        linePoints.push(
          positions[i][0], positions[i][1], positions[i][2],
          positions[j][0], positions[j][1], positions[j][2]
        );
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    this.connectedLines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x5fa480, linewidth: 2 })
    );
    this.stage10Connected.add(this.connectedLines);

    this.scene.add(this.stage10Connected);
  }

  // ==========================================
  // STAGE 11: THE EDUCATION ECOSYSTEM (Z = -435)
  // 3D Virtual Technology Exhibition Pedestals
  // ==========================================
  private buildStage11Ecosystem() {
    this.stage11Ecosystem = new THREE.Group();
    this.stage11Ecosystem.position.set(0, 0, -435);

    const pedestalMat = new THREE.MeshStandardMaterial({ color: 0xe8ece7, roughness: 0.2 });
    const productNames = [
      'Web Quản lý Học sinh',
      'API Backend Trung tâm',
      'App Android Sổ liên lạc',
      'Web Học tập (Beta)',
      'Kiyo AI & Thư viện số',
    ];

    productNames.forEach((_, idx) => {
      const angle = (idx / productNames.length) * Math.PI * 2;
      const radius = 5.2;

      const pedGroup = new THREE.Group();
      pedGroup.position.set(Math.cos(angle) * radius, -1.2, Math.sin(angle) * radius);

      // Base cylinder
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 1.8, 32), pedestalMat);
      pedGroup.add(base);

      // Floating Product Emblem
      const emblem = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 1.4, 0.2),
        new THREE.MeshStandardMaterial({
          color: idx === 3 ? 0x2a5940 : 0x315945,
          roughness: 0.3,
        })
      );
      emblem.position.set(0, 1.6, 0);
      pedGroup.add(emblem);

      this.stage11Ecosystem.add(pedGroup);
    });

    this.scene.add(this.stage11Ecosystem);
  }

  // ==========================================
  // STAGE 12: EXPLODED VIEW OF SYSTEM (Z = -480)
  // 5 Dissected 3D Architectural Stacks
  // ==========================================
  private buildStage12Exploded() {
    this.stage12Exploded = new THREE.Group();
    this.stage12Exploded.position.set(0, 0, -480);

    const layerColors = [0x1f3b2d, 0x2b4f3d, 0x3a664e, 0x4f8265, 0x6ba483];
    this.explodedLayers = [];

    // 5 Horizontal Architectural Slabs
    for (let i = 0; i < 5; i++) {
      const slabGroup = new THREE.Group();
      const slabGeo = new THREE.BoxGeometry(5.2, 0.25, 3.4);
      const slabMat = new THREE.MeshStandardMaterial({
        color: layerColors[i],
        roughness: 0.3,
        metalness: 0.2,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slabGroup.add(slab);

      // Interior circuit grid lines
      const grid = new THREE.GridHelper(3.0, 8, 0x98cfb2, 0x3b664f);
      grid.position.set(0, 0.15, 0);
      slabGroup.add(grid);

      this.explodedLayers.push(slabGroup);
      this.stage12Exploded.add(slabGroup);
    }

    this.scene.add(this.stage12Exploded);
  }

  // ==========================================
  // STAGE 13: THE HUMAN FUTURE (Z = -525)
  // Peaceful Sunset Classroom with Long Shadows
  // ==========================================
  private buildStage13Human() {
    this.stage13Human = new THREE.Group();
    this.stage13Human.position.set(0, 0, -525);

    // Warm wooden floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({ color: 0x9c683b, roughness: 0.6 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1.8, 0);
    floor.receiveShadow = true;
    this.stage13Human.add(floor);

    // Quiet classroom desk in afternoon sun
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.1, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xb57c4c, roughness: 0.5 })
    );
    deskTop.position.set(0, -0.6, 0);
    deskTop.castShadow = true;
    this.stage13Human.add(deskTop);

    // Open notebook & pencil
    const notebook = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.04, 1.1),
      new THREE.MeshStandardMaterial({ color: 0xfdfbf7 })
    );
    notebook.position.set(-0.6, -0.52, 0.1);
    this.stage13Human.add(notebook);

    this.scene.add(this.stage13Human);
  }

  // ==========================================
  // STAGE 14: A NEW PERSPECTIVE (Z = -570)
  // Ascension to the Clouds & Beacon of Growth
  // ==========================================
  private buildStage14Perspective() {
    this.stage14Perspective = new THREE.Group();
    this.stage14Perspective.position.set(0, 0, -570);

    // Radiant Towering Knowledge Spire
    const spireGeo = new THREE.ConeGeometry(2.4, 14, 32);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0x5bb081,
      roughness: 0.1,
      metalness: 0.4,
      transparent: true,
      opacity: 0.9,
    });
    const spire = new THREE.Mesh(spireGeo, spireMat);
    spire.position.set(0, 2, 0);
    this.stage14Perspective.add(spire);

    // Orbiting light particles ring
    const ringGeo = new THREE.TorusGeometry(4.2, 0.08, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xaef0cb });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    this.stage14Perspective.add(ring);

    this.scene.add(this.stage14Perspective);
  }

  // ==========================================
  // STAGE 15: THE FUTURE STARTS HERE (Z = -615)
  // Minimalist Studio with 3D KiyoEdu Emblem
  // ==========================================
  private buildStage15Future() {
    this.stage15Future = new THREE.Group();
    this.stage15Future.position.set(0, 0, -615);

    // Elegant 3D Brand Monolith / Emblem
    const emblemGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.5, 64);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0x315945, // KiyoEdu Emerald
      metalness: 0.6,
      roughness: 0.15,
    });
    this.emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    this.emblemMesh.rotation.x = Math.PI / 2;
    this.stage15Future.add(this.emblemMesh);

    // Inner glowing ring
    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.08, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x9be0b7 })
    );
    this.stage15Future.add(innerRing);

    this.scene.add(this.stage15Future);
  }

  // ==========================================
  // CONTINUOUS MASTER PROGRESS UPDATE (0.000 -> 1.000)
  // Fully Reversible & Deterministic
  // ==========================================
  public updateProgress(progress: number, velocity: number) {
    if (this.isDisposed) return;
    const p = Math.max(0, Math.min(1, progress));

    // 1. Calculate Continuous Camera Spline Position
    // Total distance along Z: 0 to -615
    const targetZ = -p * 615;

    // Smooth lateral pan and vertical height variations according to narrative chapter
    let camX = Math.sin(p * Math.PI * 6) * 1.8;
    let camY = 1.0 + Math.sin(p * Math.PI * 4) * 0.8;
    let lookAtY = 0.5;

    // Dramatic Orbit in Stage 09 (Kiyo AI: 0.56 -> 0.63)
    if (p >= 0.56 && p <= 0.63) {
      const localP = (p - 0.56) / 0.07;
      const angle = localP * Math.PI * 2;
      camX = Math.sin(angle) * 6.5;
      camY = 1.8 + Math.cos(angle * 2) * 0.8;
    }

    // High Altitude Crane in Stage 03 (Vietnam: 0.12 -> 0.19)
    if (p >= 0.12 && p <= 0.19) {
      const localP = (p - 0.12) / 0.07;
      camY = 9.0 - localP * 6.0; // descends from clouds
    }

    // Sky Ascension in Stage 14 (Perspective: 0.90 -> 0.95)
    if (p >= 0.90 && p <= 0.95) {
      const localP = (p - 0.90) / 0.05;
      camY = 1.0 + localP * 8.0; // ascends high
    }

    // Position camera along spline with slight inertia tilt from scroll velocity
    const inertiaPitch = Math.max(-0.08, Math.min(0.08, velocity * 0.02));
    this.camera.position.set(camX, camY, targetZ + 6.0);
    this.camera.lookAt(0, lookAtY + inertiaPitch, targetZ);

    // 2. Continuous Stage Animations Driven Strictly by Progress

    // Stage 01: Book opens (0.0 -> 0.06)
    if (p <= 0.08) {
      const openP = Math.min(1, p / 0.05);
      this.bookCover.rotation.z = -openP * Math.PI * 0.85;
      this.bookPages.forEach((page, idx) => {
        page.rotation.z = -openP * (Math.PI * 0.65) * ((idx + 1) / 5);
      });
    }

    // Stage 03: Birds Flapping & Flying (0.12 -> 0.22)
    if (this.birdsGroup) {
      const flapAngle = Math.sin(p * 220) * 0.5;
      this.birdsGroup.children.forEach((bird) => {
        const leftWing = bird.getObjectByName('leftWing');
        const rightWing = bird.getObjectByName('rightWing');
        if (leftWing) leftWing.rotation.z = flapAngle;
        if (rightWing) rightWing.rotation.z = -flapAngle;
      });
    }

    // Stage 04: School Doors Open (0.19 -> 0.26)
    if (this.schoolDoors) {
      const doorP = Math.max(0, Math.min(1, (p - 0.19) / 0.05));
      const left = this.schoolDoors.getObjectByName('leftDoor');
      const right = this.schoolDoors.getObjectByName('rightDoor');
      if (left) left.position.x = -0.8 - doorP * 1.4;
      if (right) right.position.x = 0.8 + doorP * 1.4;
    }

    // Stage 06: Data Bars Elevate (0.34 -> 0.41)
    if (this.dataBars.length > 0) {
      this.dataBars.forEach((bar, idx) => {
        const barHeight = 0.5 + Math.sin(idx * 0.6 + p * 30) * 2.2 + 2.2;
        bar.scale.y = Math.max(0.2, barHeight);
      });
    }

    // Stage 08: Solar System to Atom Morph (0.49 -> 0.56)
    if (this.solarSystemGroup && this.atomGroup) {
      const morphP = Math.max(0, Math.min(1, (p - 0.49) / 0.07));
      this.solarSystemGroup.scale.setScalar(Math.max(0.001, 1 - morphP));
      this.atomGroup.scale.setScalar(Math.max(0.001, morphP));
      this.atomGroup.rotation.y = p * 15;
    }

    // Stage 09: Kiyo AI Gimbal Rings Spin (0.56 -> 0.63)
    if (this.aiRings.length > 0) {
      this.aiRings.forEach((ring, idx) => {
        ring.rotation.x = p * 12 * (idx + 1);
        ring.rotation.y = p * 8 * (idx + 1);
      });
    }

    // Stage 10: Connected Nodes Pulse (0.63 -> 0.70)
    if (this.connectedNodes.length > 0) {
      this.connectedNodes.forEach((node, idx) => {
        node.rotation.y = p * 6 + idx;
        const s = 1.0 + Math.sin(p * 20 + idx) * 0.15;
        node.scale.setScalar(s);
      });
    }

    // Stage 12: Exploded Layers Expand & Contract (0.77 -> 0.84)
    if (this.explodedLayers.length > 0) {
      const explodeP = Math.max(0, Math.min(1, (p - 0.77) / 0.07));
      const dist = Math.sin(explodeP * Math.PI) * 1.6; // expands then contracts
      this.explodedLayers.forEach((layer, idx) => {
        layer.position.y = (idx - 2) * dist;
      });
    }

    // Stage 15: Final Emblem Rotate (0.95 -> 1.0)
    if (this.emblemMesh) {
      this.emblemMesh.rotation.z = p * 4;
    }

    // 3. Dynamic Cinematic Lighting Evolution
    if (p < 0.2) {
      // Soft morning pearl white
      this.scene.background = new THREE.Color(0xfafbf9);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.set(0xfafbf9);
      this.ambientLight.color.set(0xffffff);
      this.sunLight.color.set(0xfff6e8);
    } else if (p < 0.45) {
      // Clean modern Apple daylight & digital green
      this.scene.background = new THREE.Color(0xf6faf7);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.set(0xf6faf7);
      this.ambientLight.color.set(0xf4fcf7);
      this.sunLight.color.set(0xffffff);
    } else if (p < 0.65) {
      // Warm knowledge & neural jade atmosphere
      this.scene.background = new THREE.Color(0xf0f7f3);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.set(0xf0f7f3);
      this.ambientLight.color.set(0xe6f5ed);
      this.sunLight.color.set(0x9ae0b8);
    } else if (p < 0.88) {
      // Golden hour classroom sunset
      this.scene.background = new THREE.Color(0xfbf4ea);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.set(0xfbf4ea);
      this.ambientLight.color.set(0xfce8d2);
      this.sunLight.color.set(0xff9944);
    } else {
      // Pristine studio white for Grand Finale
      this.scene.background = new THREE.Color(0xf8faf8);
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.set(0xf8faf8);
      this.ambientLight.color.set(0xffffff);
      this.sunLight.color.set(0xffffff);
    }

    // Render 3D Frame
    this.renderer.render(this.scene, this.camera);
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
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
