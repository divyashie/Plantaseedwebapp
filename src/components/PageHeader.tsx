/**
 * PageHeader — full-viewport-width banner, unique per page.
 * Rendered OUTSIDE the max-w-7xl container in App.tsx so it extends edge-to-edge.
 *
 * Each page gets:
 *   • A distinct plant-world colour palette
 *   • A unique animated SVG background (leaves, vines, waves, spores…)
 *   • A per-page wave cutout at the bottom (matching the page bg)
 */

import React from 'react';
import {
  BookOpen, ShoppingBag, Leaf, Music, Map, ImageIcon, Mail, Package,
} from 'lucide-react';

// Matches App's `bg-gradient-to-b from-green-50 to-white`
const PAGE_BG = '#f0fdf4';

// ─── CSS keyframes (injected once, prefixed ph- to avoid collisions) ──────────
const KEYFRAMES = `
  @keyframes ph-sway-a {
    0%,100% { transform: rotate(-6deg); }
    50%     { transform: rotate(6deg);  }
  }
  @keyframes ph-sway-b {
    0%,100% { transform: rotate(8deg)  translateX(7px);  }
    50%     { transform: rotate(-8deg) translateX(-7px); }
  }
  @keyframes ph-sway-c {
    0%,100% { transform: rotate(-4deg) translateY(0px);  }
    50%     { transform: rotate(5deg)  translateY(-9px); }
  }
  @keyframes ph-rise {
    0%   { transform: translateY(0px)    rotate(0deg);    opacity: 0;    }
    15%  { opacity: 0.8; }
    85%  { opacity: 0.8; }
    100% { transform: translateY(-160px) rotate(220deg);  opacity: 0;    }
  }
  @keyframes ph-blink {
    0%,100% { opacity: 0.08; transform: scale(0.5); }
    50%     { opacity: 1;    transform: scale(1.4); }
  }
  @keyframes ph-shimmer {
    0%   { transform: translateX(-200%) skewX(-12deg); }
    100% { transform: translateX(400%)  skewX(-12deg); }
  }
  @keyframes ph-wave-move {
    0%,100% { transform: translateX(0px);   }
    50%     { transform: translateX(-32px); }
  }
  @keyframes ph-petal {
    0%   { transform: translate(0px,0px)     rotate(0deg);   opacity: 0;   }
    12%  { opacity: 0.65; }
    88%  { opacity: 0.65; }
    100% { transform: translate(28px,-130px) rotate(300deg); opacity: 0;   }
  }
  @keyframes ph-mist {
    0%,100% { opacity: 0.05; transform: scale(1);    }
    50%     { opacity: 0.12; transform: scale(1.08); }
  }
  @keyframes ph-grass {
    0%,100% { transform-origin: 50% 100%; transform: rotate(-7deg); }
    50%     { transform-origin: 50% 100%; transform: rotate(7deg);  }
  }
  @keyframes ph-vine {
    from { stroke-dashoffset: 1000; opacity: 0; }
    8%   { opacity: 1; }
    to   { stroke-dashoffset: 0; opacity: 0.2; }
  }
  @keyframes ph-float-seed {
    0%   { transform: translateY(0px)   rotate(0deg);   opacity: 0; }
    18%  { opacity: 0.7; }
    82%  { opacity: 0.7; }
    100% { transform: translateY(-145px) rotate(180deg); opacity: 0; }
  }
`;

// ─── Shared absolute-fill SVG style ───────────────────────────────────────────
const ABS: React.CSSProperties = {
  position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none',
};

// ─── Background components ────────────────────────────────────────────────────

/** EBOOK — Warm amber cognac. Botanical fern-frond outline + rising spores. */
function EbookBg() {
  const spores = [
    { left: '7%',  dur: 6.2, delay: 0    },
    { left: '18%', dur: 7.5, delay: 1.8  },
    { left: '33%', dur: 5.8, delay: 0.5  },
    { left: '48%', dur: 8.0, delay: 3.0  },
    { left: '62%', dur: 6.5, delay: 1.2  },
    { left: '76%', dur: 7.2, delay: 2.4  },
    { left: '89%', dur: 5.5, delay: 0.9  },
    { left: '55%', dur: 9.0, delay: 4.5  },
  ];
  return (
    <>
      {/* Fern frond — botanical illustration silhouette */}
      <svg aria-hidden style={{ ...ABS, opacity: 0.08 }}>
        {/* Left fern */}
        <g transform="translate(120, 340) rotate(-18)">
          <line x1="0" y1="0" x2="0" y2="-180" stroke="white" strokeWidth="2.5" />
          {([-160,-135,-110,-85,-60,-35,-12] as number[]).map((y, i) => (
            <g key={i} transform={`translate(0,${y})`}>
              <path d={`M0,0 C-${10+i*3},-${14+i} -${22+i*4},-${10+i} -${30+i*4},2`}
                fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <path d={`M0,0 C${10+i*3},-${14+i} ${22+i*4},-${10+i} ${30+i*4},2`}
                fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          ))}
        </g>
        {/* Right fern — smaller, mirrored */}
        <g transform="translate(1320, 320) rotate(22) scale(0.65)">
          <line x1="0" y1="0" x2="0" y2="-180" stroke="white" strokeWidth="2.5" />
          {([-155,-125,-95,-65,-40,-15] as number[]).map((y, i) => (
            <g key={i} transform={`translate(0,${y})`}>
              <path d={`M0,0 C-${9+i*3},-${12+i} -${20+i*3},-${9+i} -${28+i*3},2`}
                fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <path d={`M0,0 C${9+i*3},-${12+i} ${20+i*3},-${9+i} ${28+i*3},2`}
                fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          ))}
        </g>
      </svg>
      {/* Rising spores */}
      {spores.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: '12%', left: s.left,
          width: 5, height: 5, borderRadius: '9999px',
          backgroundColor: 'rgba(255,220,120,0.8)',
          animation: `ph-rise ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}
    </>
  );
}

/** DIGITAL — Midnight greenhouse. Hexagonal grid + electric-green fireflies. */
function DigitalBg() {
  const flies: { cx: number; cy: number; r: number; dur: number; delay: number }[] = [
    { cx: 120,  cy: 60,  r: 3.5, dur: 2.1, delay: 0    },
    { cx: 280,  cy: 120, r: 2.5, dur: 3.2, delay: 0.8  },
    { cx: 450,  cy: 40,  r: 4,   dur: 2.6, delay: 1.5  },
    { cx: 620,  cy: 100, r: 3,   dur: 1.9, delay: 0.3  },
    { cx: 800,  cy: 55,  r: 4.5, dur: 2.8, delay: 2.0  },
    { cx: 960,  cy: 130, r: 3,   dur: 3.5, delay: 0.6  },
    { cx: 1100, cy: 45,  r: 2.5, dur: 2.2, delay: 1.2  },
    { cx: 1260, cy: 95,  r: 3.5, dur: 3.0, delay: 0.4  },
    { cx: 1400, cy: 60,  r: 2,   dur: 2.4, delay: 1.8  },
    { cx: 350,  cy: 165, r: 3,   dur: 2.7, delay: 0.9  },
    { cx: 730,  cy: 175, r: 4,   dur: 3.3, delay: 2.2  },
    { cx: 1040, cy: 165, r: 2.5, dur: 2.0, delay: 0.7  },
  ];
  return (
    <>
      <svg aria-hidden style={{ ...ABS, opacity: 0.06 }}>
        <defs>
          <pattern id="hexPat" x="0" y="0" width="80" height="69" patternUnits="userSpaceOnUse">
            <polygon points="40,1 79,21 79,62 40,82 1,62 1,21"
              fill="none" stroke="#4ade80" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPat)" />
      </svg>
      <svg aria-hidden style={{ ...ABS }}>
        {flies.map((f, i) => (
          <circle key={i} cx={f.cx} cy={f.cy} r={f.r} fill="#4ade80"
            style={{ animation: `ph-blink ${f.dur}s ease-in-out ${f.delay}s infinite` }} />
        ))}
      </svg>
    </>
  );
}

/** PRODUCTS — Rich clay-earth. Seed-burst radials + oval seeds floating. */
function ProductsBg() {
  const centres: [number, number][] = [
    [160, 95], [520, 60], [880, 105], [1200, 70], [350, 175], [700, 45], [1000, 170],
  ];
  const seeds = [
    { left: '6%',  dur: 7.0, delay: 0    },
    { left: '22%', dur: 5.8, delay: 1.4  },
    { left: '38%', dur: 8.5, delay: 0.7  },
    { left: '54%', dur: 6.2, delay: 2.8  },
    { left: '68%', dur: 7.8, delay: 1.0  },
    { left: '82%', dur: 5.5, delay: 2.2  },
    { left: '92%', dur: 9.0, delay: 0.3  },
  ];
  return (
    <>
      <svg aria-hidden style={{ ...ABS, opacity: 0.1 }}>
        {centres.map(([cx, cy], ci) =>
          Array.from({ length: 14 }, (_, k) => {
            const a = (k * (360 / 14) * Math.PI) / 180;
            return (
              <line key={`${ci}-${k}`}
                x1={cx} y1={cy}
                x2={cx + Math.cos(a) * 26} y2={cy + Math.sin(a) * 26}
                stroke="white" strokeWidth="0.9" />
            );
          })
        )}
      </svg>
      {seeds.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: '10%', left: s.left,
          width: 6, height: 10, borderRadius: '9999px',
          backgroundColor: 'rgba(255,200,100,0.75)',
          animation: `ph-float-seed ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}
    </>
  );
}

/**
 * SHOP — Deep jungle canopy.
 * Large tropical leaves hanging from top-left and top-right, each swaying.
 * Uses SVG <animateTransform> for smooth, layout-safe animation.
 */
function ShopBg() {
  // Leaf SVG path — hangs from (0,0) downward, symmetric
  const leaf = 'M0,0 C-42,58 -48,138 -16,205 L0,228 L16,205 C48,138 42,58 0,0 Z';
  const leafMd = 'M0,0 C-32,44 -36,104 -12,154 L0,172 L12,154 C36,104 32,44 0,0 Z';
  const leafSm = 'M0,0 C-24,34 -28,80 -9,118 L0,132 L9,118 C28,80 24,34 0,0 Z';

  return (
    <svg aria-hidden style={{ ...ABS, opacity: 1 }}>
      {/* ── Left cluster ── */}
      {/* Large leaf — leans right */}
      <g transform="translate(40, -15)">
        <path d={leaf} fill="rgba(255,255,255,0.10)">
          <animateTransform attributeName="transform" type="rotate"
            values="42 0 0; 52 0 0; 42 0 0" dur="3.8s" repeatCount="indefinite" />
        </path>
      </g>
      {/* Medium leaf — shallower angle */}
      <g transform="translate(10, -8)">
        <path d={leafMd} fill="rgba(255,255,255,0.07)">
          <animateTransform attributeName="transform" type="rotate"
            values="22 0 0; 32 0 0; 22 0 0" dur="4.8s" repeatCount="indefinite" />
        </path>
      </g>
      {/* Small leaf — further in */}
      <g transform="translate(125, -5)">
        <path d={leafSm} fill="rgba(255,255,255,0.07)">
          <animateTransform attributeName="transform" type="rotate"
            values="60 0 0; 70 0 0; 60 0 0" dur="3.0s" repeatCount="indefinite" />
        </path>
      </g>
      {/* Extra accent leaf */}
      <g transform="translate(75, -2)">
        <path d={leafSm} fill="rgba(255,255,255,0.05)">
          <animateTransform attributeName="transform" type="rotate"
            values="50 0 0; 58 0 0; 50 0 0" dur="5.2s" repeatCount="indefinite" />
        </path>
      </g>

      {/* ── Right cluster ── */}
      <g transform="translate(1400, -15)">
        <path d={leaf} fill="rgba(255,255,255,0.10)">
          <animateTransform attributeName="transform" type="rotate"
            values="-42 0 0; -52 0 0; -42 0 0" dur="4.2s" repeatCount="indefinite" />
        </path>
      </g>
      <g transform="translate(1430, -8)">
        <path d={leafMd} fill="rgba(255,255,255,0.07)">
          <animateTransform attributeName="transform" type="rotate"
            values="-22 0 0; -32 0 0; -22 0 0" dur="3.6s" repeatCount="indefinite" />
        </path>
      </g>
      <g transform="translate(1315, -5)">
        <path d={leafSm} fill="rgba(255,255,255,0.07)">
          <animateTransform attributeName="transform" type="rotate"
            values="-60 0 0; -70 0 0; -60 0 0" dur="4.6s" repeatCount="indefinite" />
        </path>
      </g>
      <g transform="translate(1365, -2)">
        <path d={leafSm} fill="rgba(255,255,255,0.05)">
          <animateTransform attributeName="transform" type="rotate"
            values="-50 0 0; -58 0 0; -50 0 0" dur="2.8s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

/** MUSIC — Moonlit night garden. Layered sine waves that oscillate like grass and sound. */
function MusicBg() {
  const rows = [
    { y: 15,  amp: 13, dur: 5.2, delay: 0   },
    { y: 40,  amp: 16, dur: 6.8, delay: 0.7 },
    { y: 65,  amp: 12, dur: 4.5, delay: 1.4 },
    { y: 90,  amp: 17, dur: 7.2, delay: 0.3 },
    { y: 115, amp: 11, dur: 5.8, delay: 1.9 },
    { y: 140, amp: 15, dur: 6.0, delay: 0.9 },
    { y: 165, amp: 14, dur: 4.9, delay: 2.3 },
    { y: 190, amp: 13, dur: 7.5, delay: 1.1 },
  ];

  const sinePath = (y: number, amp: number) => {
    const seg = 160;
    const points = Array.from({ length: 10 }, (_, i) => {
      const x0 = i * seg;
      const x1 = x0 + seg / 3;
      const x2 = x0 + (seg * 2) / 3;
      const x3 = x0 + seg;
      const sign = i % 2 === 0 ? -1 : 1;
      return i === 0
        ? `M${x0},${y} C${x1},${y + sign * amp} ${x2},${y + sign * amp} ${x3},${y}`
        : `C${x1},${y - sign * amp} ${x2},${y - sign * amp} ${x3},${y}`;
    });
    return points.join(' ');
  };

  return (
    <svg aria-hidden style={{ ...ABS, opacity: 0.12 }}>
      {rows.map((r, i) => (
        <path key={i}
          d={sinePath(r.y, r.amp)}
          fill="none" stroke="white" strokeWidth="0.9"
          style={{ animation: `ph-wave-move ${r.dur}s ease-in-out ${r.delay}s infinite` }} />
      ))}
    </svg>
  );
}

/** GUIDE — Terracotta sun path. Topographic contour rings + vine drawing itself. */
function GuideBg() {
  return (
    <svg aria-hidden style={{ ...ABS }}>
      {/* Topographic rings */}
      <g opacity="0.07">
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={`a${i}`} cx="680" cy="95" rx={110 + i * 115} ry={30 + i * 26}
            fill="none" stroke="white" strokeWidth="1.1" />
        ))}
        {[0, 1, 2].map((i) => (
          <ellipse key={`b${i}`} cx="160" cy="70" rx={55 + i * 65} ry={18 + i * 18}
            fill="none" stroke="white" strokeWidth="0.8" />
        ))}
        {[0, 1, 2].map((i) => (
          <ellipse key={`c${i}`} cx="1280" cy="80" rx={60 + i * 70} ry={20 + i * 20}
            fill="none" stroke="white" strokeWidth="0.8" />
        ))}
      </g>
      {/* Animated vine — draws itself left to right */}
      <path
        d="M-80,295 C80,270 220,310 400,280 C580,250 720,300 900,265 C1080,230 1220,285 1400,255 C1460,245 1520,260 1560,252"
        fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"
        strokeDasharray="1000" strokeDashoffset="1000"
        style={{ animation: 'ph-vine 4.5s ease-out 0.5s forwards' }} />
      {/* Small leaf at vine end */}
      <g transform="translate(900, 265)" opacity="0">
        <ellipse cx="0" cy="-8" rx="6" ry="10" fill="white"
          style={{ animation: 'ph-mist 3s ease-in-out 4s infinite' }} />
      </g>
    </svg>
  );
}

/** GALLERY — Deep rose bower. Floating petals + scattered tilted photo frames. */
function GalleryBg() {
  const frames: [number, number, number, number, number][] = [
    [40,  22, 64, 50, -9],
    [185, 58, 55, 44,  6],
    [360, 12, 72, 56,-13],
    [545, 48, 60, 46,  8],
    [730, 15, 68, 52, -5],
    [920, 50, 62, 48, 11],
    [1095, 18, 66, 52,-10],
    [1275, 52, 58, 44,  7],
    [1405, 22, 52, 40, -8],
  ];
  const petals = [
    { left: '8%',  dur: 8.0, delay: 0   },
    { left: '21%', dur: 6.5, delay: 1.5 },
    { left: '37%', dur: 9.5, delay: 0.8 },
    { left: '53%', dur: 7.2, delay: 3.2 },
    { left: '67%', dur: 8.8, delay: 1.1 },
    { left: '79%', dur: 6.8, delay: 2.4 },
    { left: '91%', dur: 7.5, delay: 0.4 },
  ];
  return (
    <>
      <svg aria-hidden style={{ ...ABS, opacity: 0.09 }}>
        {frames.map(([x, y, w, h, rot], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="4"
            fill="none" stroke="white" strokeWidth="1.3"
            transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`} />
        ))}
      </svg>
      {petals.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: '8%', left: p.left,
          width: 8, height: 12,
          borderRadius: '50% 0 50% 0',
          backgroundColor: 'rgba(255,180,200,0.7)',
          animation: `ph-petal ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </>
  );
}

/** CONTACT — Morning mist meadow. Slow mist circles + swaying grass blades. */
function ContactBg() {
  const mists = [
    { cx: 200,  cy: 120, r: 130, dur: 6.0, delay: 0   },
    { cx: 600,  cy: 90,  r: 160, dur: 8.0, delay: 1.5 },
    { cx: 1000, cy: 130, r: 140, dur: 7.0, delay: 0.8 },
    { cx: 1350, cy: 100, r: 120, dur: 6.5, delay: 2.0 },
  ];
  const blades = Array.from({ length: 22 }, (_, i) => ({
    x: 30 + i * 64,
    h: 28 + (i % 4) * 12,
    dur: 2.5 + (i % 5) * 0.4,
    delay: (i % 7) * 0.3,
  }));
  return (
    <svg aria-hidden style={{ ...ABS }}>
      {/* Mist circles */}
      {mists.map((m, i) => (
        <circle key={i} cx={m.cx} cy={m.cy} r={m.r} fill="rgba(255,255,255,0.06)"
          style={{ animation: `ph-mist ${m.dur}s ease-in-out ${m.delay}s infinite` }} />
      ))}
      {/* Grass blades along the bottom */}
      {blades.map((b, i) => (
        <line key={i} x1={b.x} y1={320} x2={b.x + 4} y2={320 - b.h}
          stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"
          style={{ animation: `ph-grass ${b.dur}s ease-in-out ${b.delay}s infinite` }} />
      ))}
    </svg>
  );
}

// ─── Per-page theme registry ──────────────────────────────────────────────────

type Theme = {
  icon: React.ReactNode;
  label: string;
  title: string;
  subtitle: string;
  from: string;   // gradient start
  to: string;     // gradient end
  accent: string; // eyebrow label color
  iconBg: string;
  waveD: string;  // SVG path, viewBox 0 0 1440 56
  Bg: React.FC;
};

const THEMES: Record<string, Theme> = {

  ebook: {
    icon: <BookOpen size={30} strokeWidth={1.4} />,
    label: 'Knowledge Hub',
    title: 'eBook Collection',
    subtitle: 'In-depth growing guides written from the heart of a tropical garden.',
    from: '#3d1200', to: '#8b4500',
    accent: '#fcd34d', iconBg: 'rgba(252,211,77,0.15)',
    // Gentle rolling S-wave
    waveD: 'M0,20 C240,58 480,0 720,34 C960,68 1200,6 1440,28 L1440,56 L0,56 Z',
    Bg: EbookBg,
  },

  digital: {
    icon: <ShoppingBag size={30} strokeWidth={1.4} />,
    label: 'Digital Store',
    title: 'Downloads & Resources',
    subtitle: 'Instant-access PDFs, planners, and courses — delivered worldwide.',
    from: '#04080a', to: '#0a2212',
    accent: '#4ade80', iconBg: 'rgba(74,222,128,0.15)',
    // Sharp tech zigzag
    waveD: 'M0,42 L120,8 L240,42 L360,8 L480,42 L600,8 L720,42 L840,8 L960,42 L1080,8 L1200,42 L1320,8 L1440,42 L1440,56 L0,56 Z',
    Bg: DigitalBg,
  },

  products: {
    icon: <Package size={30} strokeWidth={1.4} />,
    label: 'Shop',
    title: 'Plant Products',
    subtitle: 'Hand-picked seeds, cuttings, and gardening essentials from Mauritius.',
    from: '#2a0f00', to: '#6b3800',
    accent: '#fbbf24', iconBg: 'rgba(251,191,36,0.15)',
    // Organic bumpy wave
    waveD: 'M0,56 Q180,16 360,40 Q540,64 720,26 Q900,0 1080,32 Q1260,60 1440,36 L1440,56 L0,56 Z',
    Bg: ProductsBg,
  },

  shop: {
    icon: <Leaf size={30} strokeWidth={1.4} />,
    label: 'Plant Nursery',
    title: 'Live Plants',
    subtitle: 'Browse rare and tropical plants ready to ship to your door.',
    from: '#011407', to: '#0a3018',
    accent: '#86efac', iconBg: 'rgba(134,239,172,0.15)',
    // Leaf-edge scallops (Q curves — alternate up/down)
    waveD: 'M0,44 Q180,4 360,44 Q540,84 720,44 Q900,4 1080,44 Q1260,84 1440,44 L1440,56 L0,56 Z',
    Bg: ShopBg,
  },

  music: {
    icon: <Music size={30} strokeWidth={1.4} />,
    label: 'Relax & Grow',
    title: 'Garden Music',
    subtitle: 'Calming soundscapes to accompany your garden time.',
    from: '#07070f', to: '#0d0d1f',
    accent: '#c4b5fd', iconBg: 'rgba(196,181,253,0.15)',
    // Pure sinusoidal wave
    waveD: 'M0,30 C80,10 160,50 240,30 C320,10 400,50 480,30 C560,10 640,50 720,30 C800,10 880,50 960,30 C1040,10 1120,50 1200,30 C1280,10 1360,50 1440,30 L1440,56 L0,56 Z',
    Bg: MusicBg,
  },

  guide: {
    icon: <Map size={30} strokeWidth={1.4} />,
    label: 'Learn',
    title: 'Growing Guide',
    subtitle: 'Step-by-step advice for every stage of your planting journey.',
    from: '#200800', to: '#5c2800',
    accent: '#fdba74', iconBg: 'rgba(253,186,116,0.15)',
    // Stepped terraced wave — like garden terraces
    waveD: 'M0,42 L220,42 L220,18 L480,18 L480,42 L720,42 L720,18 L960,18 L960,42 L1200,42 L1200,18 L1440,18 L1440,56 L0,56 Z',
    Bg: GuideBg,
  },

  gallery: {
    icon: <ImageIcon size={30} strokeWidth={1.4} />,
    label: 'Inspiration',
    title: 'Garden Gallery',
    subtitle: 'A collection of beautiful moments from the Plant a Seed garden.',
    from: '#1a0510', to: '#4a1025',
    accent: '#fbcfe8', iconBg: 'rgba(251,207,232,0.15)',
    // Deep scalloped — like rose petals pointing down
    waveD: 'M0,56 Q120,8 240,56 Q360,8 480,56 Q600,8 720,56 Q840,8 960,56 Q1080,8 1200,56 Q1320,8 1440,56 L1440,56 L0,56 Z',
    Bg: GalleryBg,
  },

  contact: {
    icon: <Mail size={30} strokeWidth={1.4} />,
    label: 'Get in Touch',
    title: 'Contact Us',
    subtitle: "Have a question or just want to say hello? We'd love to hear from you.",
    from: '#041410', to: '#083828',
    accent: '#7dd3fc', iconBg: 'rgba(125,211,252,0.15)',
    // Cloud bumps — soft rounded tops
    waveD: 'M0,50 Q90,16 180,50 Q270,16 360,50 Q450,16 540,50 Q630,16 720,50 Q810,16 900,50 Q990,16 1080,50 Q1170,16 1260,50 Q1350,16 1440,50 L1440,56 L0,56 Z',
    Bg: ContactBg,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function PageHeader({ tab }: { tab: string }) {
  const t = THEMES[tab];
  if (!t) return null;
  const { Bg } = t;

  return (
    <>
      {/* Inject keyframes once */}
      <style>{KEYFRAMES}</style>

      {/* Banner */}
      <div
        style={{
          background: `linear-gradient(145deg, ${t.from} 0%, ${t.to} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 0,
        }}
      >
        {/* Animated per-page background */}
        <Bg />

        {/* Sweeping shimmer light ray */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '28%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
            animation: 'ph-shimmer 6s ease-in-out 1.5s infinite',
          }} />
        </div>

        {/* Text content */}
        <div style={{
          position: 'relative', zIndex: 10,
          flex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '6.5rem 1.5rem 4rem', /* top = nav height (80px) + breathing room */
          textAlign: 'center',
        }}>
          {/* Icon pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '4rem', height: '4rem', borderRadius: '9999px',
            backgroundColor: t.iconBg,
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(4px)',
          }}>
            {t.icon}
          </div>

          {/* Eyebrow */}
          <p style={{
            fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: t.accent, marginBottom: '0.6rem',
          }}>
            {t.label}
          </p>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#ffffff',
            fontFamily: 'ui-serif, Georgia, serif',
            lineHeight: 1.1,
            marginBottom: '1rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.35)',
          }}>
            {t.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.70)',
            maxWidth: '36rem',
            margin: '0 auto',
            lineHeight: 1.7,
            fontWeight: 400,
          }}>
            {t.subtitle}
          </p>
        </div>

        {/* Per-page wave cutout melting into page background */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '3.5rem' }}>
            <path d={t.waveD} fill={PAGE_BG} />
          </svg>
        </div>
      </div>
    </>
  );
}
