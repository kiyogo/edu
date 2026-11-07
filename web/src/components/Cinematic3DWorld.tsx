import { useMemo } from 'react';
import { images } from '../data/images';
import { CHAPTERS } from '../data/videoConfig';

interface Cinematic3DWorldProps {
  progress: number; // 0.0 to 1.0 continuous scrub progress
  scrubVelocity: number;
}

// 3D Portal item placed along the timeline
interface PortalItem {
  id: string;
  imgId: string;
  x: number; // offset in px
  y: number; // offset in px
  z: number; // world Z coordinate in px
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  width?: number; // width in px
  aspect?: string;
  priority?: boolean;
}

export const Cinematic3DWorld = ({
  progress,
  scrubVelocity,
}: Cinematic3DWorldProps) => {
  // Total Z distance traversed by the camera
  const TOTAL_DEPTH = 17000;
  const camZ = progress * TOTAL_DEPTH;

  // Camera drift and tilt calculations with inertia from scroll velocity
  const inertiaPitch = Math.max(-6, Math.min(6, scrubVelocity * 1.5));
  const camX =
    Math.sin(progress * Math.PI * 4) * 110 +
    Math.sin(progress * Math.PI * 1.6) * 60;
  const camY =
    Math.cos(progress * Math.PI * 3.2) * 55 +
    Math.sin(progress * Math.PI * 6) * 25;
  const rollZ = Math.sin(progress * Math.PI * 3.5) * -2.2;

  // Chapter 6: Mobile Orbit 360-degree camera rotation
  // Progress 0.62 to 0.75 executes full 360 degree spin around the mobile constellation
  let orbitRotY = 0;
  let orbitRotX = 0;
  if (progress >= 0.60 && progress <= 0.76) {
    const orbitP = (progress - 0.60) / 0.16;
    orbitRotY = orbitP * 360;
    orbitRotX = Math.sin(orbitP * Math.PI * 2) * 8;
  }

  // Pre-calculate 3D layout for all portals across the 8 chapters
  const portals: PortalItem[] = useMemo(() => {
    const list: PortalItem[] = [];

    // CH 1: Intro (Z: 600 - 1800)
    list.push(
      { id: 'h1', imgId: 'hero01', x: 0, y: 0, z: 1000, width: 780, aspect: '16 / 10', priority: true },
      { id: 'h2', imgId: 'hero02', x: -480, y: -220, z: 1300, width: 440, rotZ: -5 },
      { id: 'h3', imgId: 'hero03', x: 500, y: 180, z: 1450, width: 420, rotZ: 4 },
      { id: 'h4', imgId: 'hero04', x: -360, y: 260, z: 1750, width: 380, rotZ: -3 }
    );

    // CH 2: Ecosystem Aperture (Z: 2100 - 3900) - Circular ring opening
    const ecoIds = ['ecosystem01', 'ecosystem02', 'ecosystem03', 'ecosystem04', 'ecosystem05', 'ecosystem06', 'ecosystem07', 'ecosystem08'];
    ecoIds.forEach((id, i) => {
      const angle = (i / ecoIds.length) * Math.PI * 2;
      const radius = i === 0 ? 0 : 540;
      const zPos = 2300 + i * 200;
      list.push({
        id: `eco_${i}`,
        imgId: id,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * (radius * 0.7),
        z: zPos,
        width: i === 0 ? 680 : 360,
        rotZ: (i % 2 === 0 ? 1 : -1) * 4,
        rotY: Math.cos(angle) * -12,
      });
    });

    // CH 3: Vietnam Connection (Z: 4200 - 6200) - Northern, Central, Southern route
    const vnIds = ['vietnam01', 'vietnam02', 'vietnam03', 'vietnam04', 'vietnam05', 'vietnam06'];
    vnIds.forEach((id, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      list.push({
        id: `vn_${i}`,
        imgId: id,
        x: side * (320 + i * 40),
        y: (i - 2.5) * 80,
        z: 4400 + i * 320,
        width: 480,
        rotY: side * -10,
        rotZ: side * 3,
      });
    });

    // CH 4: Web-Hoc-Tap Schoolroom (Z: 6400 - 8600) - Dynamic runway
    const schoolIds = ['school01', 'school02', 'school03', 'school04', 'school05', 'school06', 'school07', 'school08', 'school09', 'school10', 'school11', 'school12'];
    schoolIds.forEach((id, i) => {
      const isCenter = i % 3 === 0;
      const posX = isCenter ? (i % 2 === 0 ? -120 : 120) : ((i % 2 === 0 ? -520 : 520));
      list.push({
        id: `sch_${i}`,
        imgId: id,
        x: posX,
        y: (i % 3 - 1) * 110,
        z: 6600 + i * 165,
        width: isCenter ? 720 : 420,
        rotY: isCenter ? 0 : (posX > 0 ? -16 : 16),
      });
    });

    // CH 5: Data Analytics & Management (Z: 8800 - 10800) - Floating analytic ribbon
    const dataIds = [
      'analytics01', 'analytics02', 'analytics03', 'analytics04', 'analytics05', 'analytics06', 'analytics07', 'analytics08',
      'management01', 'management02', 'management03', 'management04', 'management05', 'management06', 'management07', 'management08',
    ];
    dataIds.forEach((id, i) => {
      const theta = (i / dataIds.length) * Math.PI * 4;
      list.push({
        id: `data_${i}`,
        imgId: id,
        x: Math.sin(theta) * 440,
        y: Math.cos(theta) * 220,
        z: 9000 + i * 110,
        width: 420,
        rotZ: (i % 2 === 0 ? -3 : 3),
        rotX: Math.cos(theta) * 8,
      });
    });

    // CH 6: Mobile Orbit Cylinder (Z: 11200 - 12800) - Circular ring of phones
    const mobileIds = ['mobile01', 'mobile02', 'mobile03', 'mobile04', 'mobile05', 'mobile06', 'mobile07', 'mobile08', 'mobile09', 'mobile10'];
    mobileIds.forEach((id, i) => {
      const rad = (i / mobileIds.length) * Math.PI * 2;
      const orbitR = 640;
      list.push({
        id: `mob_${i}`,
        imgId: id,
        x: Math.sin(rad) * orbitR,
        y: Math.cos(rad) * (orbitR * 0.4),
        z: 11900 + Math.cos(rad) * (orbitR * 0.7),
        width: 320,
        aspect: '9 / 18',
        rotY: (rad * 180) / Math.PI + 90,
      });
    });

    // CH 7: Digital Library, Quiz & Kiyo AI (Z: 13000 - 15200) - Constellation of knowledge
    const futureIds = [
      'library01', 'library02', 'library03', 'library04', 'library05', 'library06', 'library07', 'library08',
      'quiz01', 'quiz02', 'quiz03', 'quiz04', 'quiz05', 'quiz06',
      'ai01', 'ai02', 'ai03', 'ai04', 'ai05', 'ai06',
    ];
    futureIds.forEach((id, i) => {
      const side = (i % 3 === 0 ? 0 : i % 2 === 0 ? -1 : 1);
      list.push({
        id: `fut_${i}`,
        imgId: id,
        x: side * (380 + (i % 4) * 60),
        y: ((i % 5) - 2) * 110,
        z: 13200 + i * 100,
        width: side === 0 ? 680 : 420,
        rotZ: side * 3,
        rotY: side * -12,
      });
    });

    // CH 8: Ending Horizon (Z: 15400 - 17000)
    const endIds = ['ending01', 'ending02', 'ending03', 'ending04', 'ending05', 'ending06'];
    endIds.forEach((id, i) => {
      const isHero = i === 0;
      list.push({
        id: `end_${i}`,
        imgId: id,
        x: isHero ? 0 : (i % 2 === 0 ? -480 : 480),
        y: isHero ? -40 : ((i - 3) * 100),
        z: 15600 + i * 220,
        width: isHero ? 840 : 440,
        aspect: '16 / 10',
        rotZ: (i % 2 === 0 ? -2 : 2),
      });
    });

    return list;
  }, []);

  // Scrubbed Birds Flock: 10 birds whose coordinates and wing flap are deterministically scrubbed
  const birds = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => ({
      index: i,
      startX: -400 + (i % 3) * 120,
      endX: window.innerWidth + 300,
      baseY: 120 + i * 35,
      speedMult: 1.0 + (i % 4) * 0.15,
      phase: i * 0.45,
    }));
  }, []);

  return (
    <div
      className="cinematic-3d-stage"
      style={{
        position: 'absolute',
        inset: 0,
        perspective: '1100px',
        perspectiveOrigin: '50% 50%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 3D Camera Rig */}
      <div
        className="cinematic-camera-rig"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `translate3d(${-camX}px, ${-camY}px, ${camZ}px) rotateX(${orbitRotX + inertiaPitch}deg) rotateY(${orbitRotY}deg) rotateZ(${rollZ}deg)`,
          willChange: 'transform',
        }}
      >
        {/* Portals rendered in 3D space */}
        {portals.map((p) => {
          const itemImg = images[p.imgId] || { src: '/images/demo.jpg', alt: p.imgId };
          const relZ = p.z - camZ;

          // Optimization: only render portals within active viewing frustum (-800px behind camera to +3200px ahead)
          if (relZ < -800 || relZ > 3400) {
            return null;
          }

          // Depth-based opacity and focus
          let opacity = 1;
          let blurPx = 0;
          if (relZ > 2200) {
            const farP = (relZ - 2200) / 1200;
            opacity = Math.max(0, 1 - farP);
            blurPx = farP * 8;
          } else if (relZ < 100) {
            const nearP = Math.max(0, (100 - relZ) / 900);
            opacity = Math.max(0, 1 - nearP);
          }

          const width = p.width || 460;
          const aspect = p.aspect || '16 / 10';

          return (
            <div
              key={p.id}
              className="cinematic-3d-portal"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${width}px`,
                aspectRatio: aspect,
                transform: `translate3d(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px), ${-p.z}px) rotateX(${p.rotX || 0}deg) rotateY(${p.rotY || 0}deg) rotateZ(${p.rotZ || 0}deg)`,
                opacity,
                filter: blurPx > 0 ? `blur(${blurPx.toFixed(1)}px)` : undefined,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="portal-glass-frame"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow:
                    '0 24px 64px -12px rgba(18, 36, 28, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.7) inset',
                  position: 'relative',
                }}
              >
                <img
                  src={itemImg.src}
                  alt={itemImg.alt || 'KiyoEdu'}
                  loading={p.priority ? 'eager' : 'lazy'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Subtle glass reflection highlight */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* 3D Connecting Vietnam Constellation Arcs (visible during Chapter 3: Z ~ 4200 to 6200) */}
        {camZ > 3400 && camZ < 7200 && (
          <div
            className="vietnam-constellation-3d"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate3d(-50%, -50%, -5200px)`,
              pointerEvents: 'none',
            }}
          >
            <svg
              viewBox="0 0 400 800"
              style={{ width: '420px', height: '840px', overflow: 'visible' }}
            >
              <path
                d="M 200 40 C 260 120, 280 200, 220 300 C 180 400, 270 500, 220 620 C 190 700, 160 760, 210 790"
                fill="none"
                stroke="#315945"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeOpacity="0.45"
              />
              <circle cx="210" cy="110" r="7" fill="#315945" />
              <circle cx="230" cy="420" r="7" fill="#315945" />
              <circle cx="205" cy="720" r="7" fill="#315945" />
            </svg>
          </div>
        )}
      </div>

      {/* Synchronized Flock of Birds Flying Across Screen Scrubbed with Scroll */}
      <div
        className="cinematic-birds-flock"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {birds.map((b) => {
          // Bird position calculated directly from progress
          const birdP = ((progress * 3.5 * b.speedMult + b.phase) % 1.0);
          const birdX = b.startX + birdP * (b.endX - b.startX);
          const birdY = b.baseY + Math.sin(birdP * Math.PI * 4 + b.phase) * 35;
          const wingAngle = Math.sin(birdP * 120 + b.phase * 5) * 32;

          return (
            <svg
              key={b.index}
              viewBox="0 0 48 24"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '32px',
                height: '16px',
                transform: `translate3d(${birdX}px, ${birdY}px, 0) scale(${0.7 + (b.index % 3) * 0.2})`,
                opacity: 0.65,
                willChange: 'transform',
              }}
            >
              {/* Left wing */}
              <path
                d="M 24 16 Q 14 6 0 10 Q 12 14 24 16 Z"
                fill="#315945"
                style={{
                  transformOrigin: '24px 16px',
                  transform: `rotate(${wingAngle}deg)`,
                }}
              />
              {/* Right wing */}
              <path
                d="M 24 16 Q 34 6 48 10 Q 36 14 24 16 Z"
                fill="#315945"
                style={{
                  transformOrigin: '24px 16px',
                  transform: `rotate(${-wingAngle}deg)`,
                }}
              />
            </svg>
          );
        })}
      </div>

      {/* Seamless Minimalist Typography Overlays Gliding with Active Chapter */}
      <div
        className="cinematic-editorial-overlay"
        style={{
          position: 'absolute',
          top: '18%',
          left: '8%',
          maxWidth: '560px',
          pointerEvents: 'none',
        }}
      >
        {CHAPTERS.map((ch) => {
          const [start, end] = ch.range;
          if (progress < start - 0.04 || progress > end + 0.04) return null;

          // Seamless fade in / hold / fade out
          let opacity = 1;
          const span = end - start;
          const localP = (progress - start) / span;

          if (localP < 0.2) {
            opacity = localP / 0.2;
          } else if (localP > 0.8) {
            opacity = (1 - localP) / 0.2;
          }

          const translateY = (1 - opacity) * 20;

          return (
            <div
              key={ch.id}
              className="cinematic-chapter-card"
              style={{
                opacity,
                transform: `translate3d(0, ${translateY}px, 0)`,
                transition: 'none',
                willChange: 'transform, opacity',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#315945',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '1.5px',
                    background: '#315945',
                  }}
                />
                <span>{ch.kicker}</span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                  lineHeight: 1.05,
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: '#1a2e22',
                  margin: 0,
                  fontFamily: 'serif',
                }}
              >
                {ch.title} <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#315945' }}>
                  {ch.highlight}
                </em>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};
