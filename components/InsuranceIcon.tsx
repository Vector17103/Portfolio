import { INK, MUTED, PANEL, PANEL_BORDER, BG } from '../lib/thumbnailPalette';

interface InsuranceIconProps {
  id: string;
}

// Same 400x200 scene grammar as ProjectThumbnail: a fixed BG rect, PANEL
// document/dashboard cards, and looping <animate> details.
function Scene({ children }: { children: React.ReactNode }) {
  return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill={BG} />
      {children}
    </svg>
  );
}

function Panel({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="6" fill={PANEL} stroke={PANEL_BORDER} strokeWidth="1" />;
}

export default function InsuranceIcon({ id }: InsuranceIconProps) {
  switch (id) {
    case 'term-life':
      return (
        <Scene>
          <Panel x={28} y={22} w={162} h={162} />
          <path d={'M138 60 L138 32 L172 45 V78 C172 100 156 116 138 124 C120 116 104 100 104 78 V45 Z'} fill="none" stroke={INK} strokeWidth="1.2" opacity="0.5" />
          <path d="M120 80 L133 93 L158 65" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="3.5s" repeatCount="indefinite" />
          </path>
          <Panel x={230} y={22} w={142} h={162} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x="246" y={40 + i * 22} width={110 - (i % 3) * 16} height="6" rx="2" fill={MUTED} opacity="0.22" />
          ))}
          <rect x="246" y={40} width="0" height="6" rx="2" fill={INK} opacity="0.35">
            <animate attributeName="width" values="0;108;0" dur="3s" repeatCount="indefinite" />
          </rect>
        </Scene>
      );

    case 'whole-life':
      return (
        <Scene>
          <Panel x={28} y={26} w={344} h={148} />
          <path
            d="M60 130 C60 105 80 95 100 95 C112 95 120 104 128 118 C136 132 148 150 168 150 C190 150 198 118 210 92 C220 70 234 54 254 54 C280 54 296 84 310 108 C320 126 332 138 348 138"
            fill="none"
            stroke={INK}
            strokeWidth="1.4"
            opacity="0.55"
          >
            <animate attributeName="opacity" values="0.35;0.7;0.35" dur="2.6s" repeatCount="indefinite" />
          </path>
          {[100, 168, 254, 348].map((cx, i) => (
            <circle key={cx} cx={cx} cy={i === 0 ? 95 : i === 1 ? 150 : i === 2 ? 54 : 138} r="4" fill={PANEL} stroke={INK} strokeWidth="1.1" opacity="0.6">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} />
            </circle>
          ))}
        </Scene>
      );

    case 'critical-illness':
      return (
        <Scene>
          <Panel x={28} y={22} w={344} h={156} />
          <polyline
            points="44,100 90,100 104,72 120,128 136,60 152,100 190,100 202,80 214,100 400,100"
            fill="none"
            stroke={INK}
            strokeWidth="1.4"
            opacity="0.55"
          />
          <circle cx="120" cy="128" r="4" fill={PANEL} stroke={INK} strokeWidth="1.2">
            <animate attributeName="r" values="4;7;4" dur="1.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.3s" repeatCount="indefinite" />
          </circle>
          <text x="46" y="52" fontSize="9" fill={MUTED} opacity="0.55" fontFamily="monospace">MONITORING</text>
        </Scene>
      );

    case 'disability':
      return (
        <Scene>
          <Panel x={28} y={22} w={160} h={156} />
          <circle cx="108" cy="72" r="14" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.55" />
          <path d="M108 88 V118 M108 98 L84 110 M108 98 L132 110 M108 118 L92 148 M108 118 L124 148" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.5" />
          <Panel x={212} y={22} w={160} h={156} />
          <text x="228" y="46" fontSize="8" fill={MUTED} opacity="0.55" fontFamily="monospace">MONTHLY INCOME</text>
          <rect x="228" y="60" width="128" height="10" rx="3" fill={PANEL_BORDER} />
          <rect x="228" y="60" width="0" height="10" rx="3" fill={INK} opacity="0.35">
            <animate attributeName="width" values="0;118;118" dur="2.6s" repeatCount="indefinite" />
          </rect>
          <rect x="228" y="82" width="128" height="10" rx="3" fill={PANEL_BORDER} />
          <rect x="228" y="82" width="0" height="10" rx="3" fill={INK} opacity="0.35">
            <animate attributeName="width" values="0;118;118" dur="2.6s" begin="0.4s" repeatCount="indefinite" />
          </rect>
        </Scene>
      );

    case 'segregated-funds':
      return (
        <Scene>
          <Panel x={28} y={22} w={344} h={156} />
          <line x1="50" y1="150" x2="360" y2="150" stroke={INK} strokeWidth="0.8" opacity="0.3" />
          <path d="M50 130 L100 108 L150 120 L200 78 L250 92 L300 52 L360 40" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.6">
            <animate attributeName="opacity" values="0.35;0.75;0.35" dur="2.6s" repeatCount="indefinite" />
          </path>
          <polyline points="332,40 360,40 360,66" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.6" />
        </Scene>
      );

    case 'annuities':
      return (
        <Scene>
          <Panel x={28} y={22} w={344} h={156} />
          <circle cx="200" cy="100" r="52" fill="none" stroke={INK} strokeWidth="1" opacity="0.35" />
          <path d="M200 100 L200 52 A48 48 0 0 1 234 138 Z" fill={INK} opacity="0.15">
            <animateTransform attributeName="transform" type="rotate" from="0 200 100" to="360 200 100" dur="8s" repeatCount="indefinite" />
          </path>
          <circle cx="200" cy="100" r="3" fill={INK} opacity="0.6" />
        </Scene>
      );

    case 'mortgage-creditor':
      return (
        <Scene>
          <Panel x={28} y={22} w={344} h={156} />
          <path d="M78 110 L140 62 L202 110" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.55" />
          <rect x="96" y="106" width="88" height="60" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.5" />
          <rect x="130" y="132" width="20" height="34" fill="none" stroke={INK} strokeWidth="1" opacity="0.4" />
          <text x="232" y="66" fontSize="8" fill={MUTED} opacity="0.55" fontFamily="monospace">BALANCE</text>
          <rect x="232" y="76" width="120" height="10" rx="3" fill={PANEL_BORDER} />
          <rect x="232" y="76" width="120" height="10" rx="3" fill={INK} opacity="0.3">
            <animate attributeName="width" values="120;20;120" dur="4s" repeatCount="indefinite" />
          </rect>
        </Scene>
      );

    case 'group-benefits':
    default:
      return (
        <Scene>
          <Panel x={28} y={22} w={344} h={156} />
          {[130, 200, 270].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy="74" r="14" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.5" />
              <path d={`M${cx - 26} 132 C${cx - 26} 108 ${cx - 14} 96 ${cx} 96 C${cx + 14} 96 ${cx + 26} 108 ${cx + 26} 132`} fill="none" stroke={INK} strokeWidth="1.1" opacity="0.45">
                <animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </path>
            </g>
          ))}
          <line x1="50" y1="160" x2="350" y2="160" stroke={INK} strokeWidth="0.6" opacity="0.25" />
        </Scene>
      );
  }
}
