import { INK, MUTED, PANEL, PANEL_BORDER, BG, HIGHLIGHT } from '../../lib/thumbnailPalette';

export interface ServiceIconProps {
  // Gates the SMIL <animate> elements so each scene only starts animating
  // once its card has scrolled into view (see useReveal in the grid page).
  active: boolean;
}

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

// 1. Segregated Funds — line chart with a protective floor/guarantee band animating in.
export function SegregatedFundsIcon({ active }: ServiceIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <rect x={44} y={128} width={312} height={34} fill={INK} opacity="0.07" />
      <line x1="44" y1="128" x2="356" y2="128" stroke={INK} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <text x="48" y="122" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">GUARANTEE FLOOR</text>
      <path
        d="M44 108 L92 96 L140 118 L188 74 L236 90 L284 54 L332 66 L356 46"
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
        opacity="0.65"
        strokeDasharray={active ? undefined : '0 1'}
      >
        {active && (
          <animate attributeName="stroke-dasharray" values="0,540;540,0" dur="2.2s" fill="freeze" />
        )}
      </path>
      {active && (
        <rect x={44} y={128} width={0} height={34} fill={INK} opacity="0.05">
          <animate attributeName="width" values="0;312" dur="1.4s" begin="0.3s" fill="freeze" />
        </rect>
      )}
      <circle cx="356" cy="46" r="4" fill={PANEL} stroke={HIGHLIGHT} strokeWidth="1.6" opacity={active ? 1 : 0}>
        {active && <animate attributeName="opacity" values="0;1" dur="0.4s" begin="2s" fill="freeze" />}
      </circle>
    </Scene>
  );
}

// 2. Whole / Universal Life — compounding coin-stack animation.
export function WholeLifeIcon({ active }: ServiceIconProps) {
  const stacks = [
    { x: 70, coins: 2 },
    { x: 140, coins: 3 },
    { x: 210, coins: 4 },
    { x: 280, coins: 5 },
    { x: 350, coins: 6 },
  ];
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <line x1="46" y1="164" x2="374" y2="164" stroke={INK} strokeWidth="0.8" opacity="0.3" />
      {stacks.map((stack, si) => (
        <g key={stack.x}>
          {Array.from({ length: stack.coins }).map((_, ci) => (
            <ellipse
              key={ci}
              cx={stack.x}
              cy={158 - ci * 8}
              rx="16"
              ry="6"
              fill={PANEL}
              stroke={si === stacks.length - 1 ? HIGHLIGHT : INK}
              strokeWidth={si === stacks.length - 1 ? 1.5 : 1}
              opacity={active ? (si === stacks.length - 1 ? 0.9 : 0.7) : 0.15}
            >
              {active && (
                <animate
                  attributeName="opacity"
                  values={`0;${si === stacks.length - 1 ? 0.9 : 0.7}`}
                  dur="0.5s"
                  begin={`${si * 0.15 + ci * 0.08}s`}
                  fill="freeze"
                />
              )}
            </ellipse>
          ))}
        </g>
      ))}
      <text x="46" y="42" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">CASH VALUE</text>
    </Scene>
  );
}

// 3. Critical Illness — heartbeat/pulse line resolving to a checkmark shield.
export function CriticalIllnessIcon({ active }: ServiceIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={222} h={156} />
      <polyline
        points="44,100 78,100 92,72 108,128 124,60 140,100 178,100 190,80 202,100 236,100"
        fill="none"
        stroke={INK}
        strokeWidth="1.4"
        opacity="0.6"
        strokeDasharray={active ? '400' : '0 400'}
        strokeDashoffset={active ? undefined : 400}
      >
        {active && <animate attributeName="stroke-dashoffset" values="400;0" dur="1.6s" repeatCount="indefinite" />}
      </polyline>
      <Panel x={270} y={22} w={102} h={156} />
      <path d="M321 46 L353 58 V90 C353 116 339 134 321 144 C303 134 289 116 289 90 V58 Z" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.55" />
      <path d="M303 96 L316 110 L340 78" fill="none" stroke={HIGHLIGHT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0">
        {active && <animate attributeName="opacity" values="0;0;1" dur="2.2s" begin="0s" repeatCount="indefinite" keyTimes="0;0.7;1" />}
      </path>
    </Scene>
  );
}

// 4. Disability — income stream with a protective bridge animating across a gap.
export function DisabilityIcon({ active }: ServiceIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <line x1="64" y1="100" x2="160" y2="100" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <line x1="240" y1="100" x2="336" y2="100" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path
        d="M160 100 Q200 58 240 100"
        fill="none"
        stroke={HIGHLIGHT}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={active ? 0.85 : 0.15}
        strokeDasharray={active ? undefined : '1 200'}
      >
        {active && <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="1.1s" fill="freeze" />}
      </path>
      <text x="200" y="138" textAnchor="middle" fontSize="8" fill={MUTED} opacity="0.55" fontFamily="monospace">INCOME, BRIDGED</text>
    </Scene>
  );
}

// 5. Term Life — shield with a timeline / countdown marker.
export function TermLifeIcon({ active }: ServiceIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={162} h={162} />
      <path d="M109 46 L143 59 V94 C143 118 127 136 109 144 C91 136 75 118 75 94 V59 Z" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.55" />
      <path d="M91 98 L104 111 L129 83" fill="none" stroke={HIGHLIGHT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={active ? 1 : 0.15}>
        {active && <animate attributeName="opacity" values="0;1" dur="0.7s" begin="0.6s" fill="freeze" />}
      </path>
      <Panel x={214} y={22} w={158} h={162} />
      <text x="230" y="46" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">20-YEAR TERM</text>
      <line x1="230" y1="100" x2="356" y2="100" stroke={PANEL_BORDER} strokeWidth="3" strokeLinecap="round" />
      <line
        x1="230"
        y1="100"
        x2="356"
        y2="100"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
        strokeDasharray="126"
        strokeDashoffset={active ? undefined : 126}
      >
        {active && <animate attributeName="stroke-dashoffset" values="126;0" dur="2.4s" fill="freeze" />}
      </line>
      <circle cx="230" cy="100" r="4" fill={INK} opacity="0.6" />
      <circle cx="356" cy="100" r="4" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.5" />
    </Scene>
  );
}

// 6. Annuities — coins flowing steadily into a stream over a timeline.
export function AnnuitiesIcon({ active }: ServiceIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <circle cx="90" cy="70" r="26" fill="none" stroke={HIGHLIGHT} strokeWidth="1.4" opacity="0.75" />
      <text x="90" y="74" textAnchor="middle" fontSize="8" fill={MUTED} opacity="0.6" fontFamily="monospace">LUMP</text>
      <line x1="130" y1="70" x2="180" y2="70" stroke={INK} strokeWidth="0.8" opacity="0.3" />
      <path d="M180 70 C220 70 220 140 260 140" fill="none" stroke={INK} strokeWidth="1" opacity="0.3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx="180" cy="70" r="6" fill={PANEL} stroke={INK} strokeWidth="1.1" opacity="0">
          {active && (
            <>
              <animateMotion path="M0 0 C40 0 40 70 80 70" dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.75;0.75;0" dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
            </>
          )}
        </circle>
      ))}
      <line x1="260" y1="152" x2="372" y2="152" stroke={PANEL_BORDER} strokeWidth="1" />
      {[276, 300, 324, 348, 372].map((x, i) => (
        <rect key={x} x={x - 8} y="144" width="16" height="8" rx="2" fill={INK} opacity="0.28">
          {active && <animate attributeName="opacity" values="0;0.28" dur="0.4s" begin={`${1 + i * 0.15}s`} fill="freeze" />}
        </rect>
      ))}
    </Scene>
  );
}

// 7. Mortgage / Creditor — house outline with a shrinking debt bar.
export function MortgageCreditorIcon({ active }: ServiceIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <path d="M78 110 L140 62 L202 110" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.55" />
      <rect x="96" y="106" width="88" height="60" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.5" />
      <rect x="130" y="132" width="20" height="34" fill="none" stroke={INK} strokeWidth="1" opacity="0.4" />
      <text x="232" y="60" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">BALANCE REMAINING</text>
      <rect x="232" y="70" width="120" height="12" rx="3" fill={PANEL_BORDER} />
      <rect x="232" y="70" width={120} height="12" rx="3" fill={HIGHLIGHT} opacity="0.7">
        {active && <animate attributeName="width" values="120;22" dur="2.6s" fill="freeze" />}
      </rect>
      <text x="232" y="104" fontSize="7.5" fill={MUTED} opacity="0.5" fontFamily="monospace">COVERAGE ON DEATH/DISABILITY</text>
      <line x1="232" y1="112" x2="352" y2="112" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </Scene>
  );
}

// 8. Group / Employee Benefits — connected figures under one umbrella shape.
export function GroupBenefitsIcon({ active }: ServiceIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <path d="M120 66 C120 40 280 40 280 66" fill="none" stroke={HIGHLIGHT} strokeWidth="1.6" opacity="0.75" />
      <line x1="200" y1="66" x2="200" y2="90" stroke={INK} strokeWidth="1.1" opacity="0.45" />
      {[130, 200, 270].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="112" r="13" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.5" />
          <path d={`M${cx - 24} 166 C${cx - 24} 144 ${cx - 13} 132 ${cx} 132 C${cx + 13} 132 ${cx + 24} 144 ${cx + 24} 166`} fill="none" stroke={INK} strokeWidth="1.1" opacity="0.45" />
          <line x1={cx} y1="90" x2={cx} y2="99" stroke={INK} strokeWidth="0.8" opacity={active ? 0.35 : 0.08}>
            {active && <animate attributeName="opacity" values="0;0.35" dur="0.5s" begin={`${i * 0.2 + 0.3}s`} fill="freeze" />}
          </line>
        </g>
      ))}
    </Scene>
  );
}

export const SERVICE_ICONS: Record<string, (props: ServiceIconProps) => JSX.Element> = {
  'segregated-funds': SegregatedFundsIcon,
  'whole-life': WholeLifeIcon,
  'critical-illness': CriticalIllnessIcon,
  disability: DisabilityIcon,
  'term-life': TermLifeIcon,
  annuities: AnnuitiesIcon,
  'mortgage-creditor': MortgageCreditorIcon,
  'group-benefits': GroupBenefitsIcon,
};
