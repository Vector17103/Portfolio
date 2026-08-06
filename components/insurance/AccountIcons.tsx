import { INK, MUTED, PANEL, PANEL_BORDER, BG, HIGHLIGHT } from '../../lib/thumbnailPalette';

export interface AccountIconProps {
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

// TFSA — tax-free growth: a bar that grows with no "tax bite" taken out.
export function TFSAIcon({ active }: AccountIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <text x="44" y="42" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">GROWTH — 100% YOURS</text>
      <line x1="44" y1="160" x2="356" y2="160" stroke={PANEL_BORDER} strokeWidth="1" />
      <rect x="60" y="80" width="30" height="80" rx="2" fill={INK} opacity="0.22" />
      <rect x="110" y="60" width="30" height="100" rx="2" fill={INK} opacity="0.22" />
      <rect x="160" y="40" width="30" height="120" rx="2" fill={HIGHLIGHT} opacity={active ? 0.75 : 0.15}>
        {active && <animate attributeName="opacity" values="0;0.75" dur="0.6s" begin="0.3s" fill="freeze" />}
      </rect>
      <rect x="210" y="30" width="30" height="130" rx="2" fill={INK} opacity="0.22" />
    </Scene>
  );
}

// RRSP — deferred tax: an arrow pushed forward to a later, lower-tax point.
export function RRSPIcon({ active }: AccountIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <text x="44" y="42" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">DEDUCT NOW — TAXED LATER</text>
      <line x1="60" y1="120" x2="340" y2="120" stroke={PANEL_BORDER} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M60 120 H320"
        fill="none"
        stroke={HIGHLIGHT}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={active ? 0.8 : 0.15}
        strokeDasharray={active ? undefined : '1 300'}
      >
        {active && <animate attributeName="stroke-dasharray" values="0,300;300,0" dur="1.4s" fill="freeze" />}
      </path>
      <path d="M310 108 L330 120 L310 132" fill="none" stroke={HIGHLIGHT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={active ? 0.8 : 0.15}>
        {active && <animate attributeName="opacity" values="0;0.8" dur="0.4s" begin="1.2s" fill="freeze" />}
      </path>
      <circle cx="60" cy="120" r="5" fill={PANEL} stroke={INK} strokeWidth="1.2" opacity="0.5" />
    </Scene>
  );
}

// FHSA — house taking shape from savings.
export function FHSAIcon({ active }: AccountIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <path d="M150 130 L200 90 L250 130" fill="none" stroke={HIGHLIGHT} strokeWidth="2" opacity={active ? 0.8 : 0.15}>
        {active && <animate attributeName="opacity" values="0;0.8" dur="0.5s" fill="freeze" />}
      </path>
      <rect x="165" y="130" width="70" height="40" fill="none" stroke={HIGHLIGHT} strokeWidth="2" opacity={active ? 0.8 : 0.15}>
        {active && <animate attributeName="opacity" values="0;0.8" dur="0.5s" begin="0.2s" fill="freeze" />}
      </rect>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={70 + i * 20} y={150 - i * 6} width="14" height={20 + i * 6} rx="2" fill={INK} opacity="0.22" />
      ))}
    </Scene>
  );
}

// RESP — education growing: a graduation cap above a rising bar.
export function RESPIcon({ active }: AccountIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <text x="44" y="42" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">+20% GOVERNMENT GRANT</text>
      <path d="M200 70 L240 86 L200 102 L160 86 Z" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.45" />
      <line x1="200" y1="102" x2="200" y2="118" stroke={INK} strokeWidth="1" opacity="0.4" />
      <line x1="150" y1="150" x2="250" y2="150" stroke={PANEL_BORDER} strokeWidth="1" />
      <rect x="185" y="120" width="30" height="30" rx="2" fill={HIGHLIGHT} opacity={active ? 0.7 : 0.15}>
        {active && <animate attributeName="opacity" values="0;0.7" dur="0.6s" begin="0.4s" fill="freeze" />}
      </rect>
    </Scene>
  );
}

// Non-registered — flexible, unwrapped growth line (no cap/lock).
export function NonRegisteredIcon({ active }: AccountIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <text x="44" y="42" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">NO CONTRIBUTION LIMIT</text>
      <path
        d="M50 140 L110 120 L170 130 L230 90 L290 100 L350 60"
        fill="none"
        stroke={HIGHLIGHT}
        strokeWidth="1.8"
        opacity={active ? 0.75 : 0.15}
      >
        {active && <animate attributeName="stroke-dasharray" values="0,500;500,0" dur="1.8s" fill="freeze" />}
      </path>
    </Scene>
  );
}

// RRIF — retirement income stream flowing out at a required minimum.
export function RRIFIcon({ active }: AccountIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={160} h={156} />
      <text x="44" y="42" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">SAVINGS</text>
      <circle cx="108" cy="110" r="34" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.4" />
      <Panel x={212} y={22} w={160} h={156} />
      <text x="228" y="42" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">MIN. WITHDRAWAL</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={230 + i * 32} y={150 - i * 10} width="18" height={i * 10 + 10} rx="2" fill={HIGHLIGHT} opacity={active ? 0.65 : 0.12}>
          {active && <animate attributeName="opacity" values="0;0.65" dur="0.5s" begin={`${i * 0.15}s`} fill="freeze" />}
        </rect>
      ))}
    </Scene>
  );
}

// LIRA / LIF — a locked stream, gated by a padlock.
export function LIRALIFIcon({ active }: AccountIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <rect x="176" y="100" width="48" height="38" rx="4" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.5" />
      <path d="M186 100 V84 C186 70 214 70 214 84 V100" fill="none" stroke={INK} strokeWidth="1.3" opacity="0.5" />
      <circle cx="200" cy="119" r="4" fill={HIGHLIGHT} opacity={active ? 0.8 : 0.2}>
        {active && <animate attributeName="opacity" values="0;0.8" dur="0.5s" begin="0.3s" fill="freeze" />}
      </circle>
      <line x1="60" y1="119" x2="166" y2="119" stroke={INK} strokeWidth="1" opacity="0.25" strokeDasharray="3 3" />
      <line x1="234" y1="119" x2="340" y2="119" stroke={INK} strokeWidth="1" opacity="0.25" strokeDasharray="3 3" />
    </Scene>
  );
}

// RDSP — support/growth for a beneficiary, government-matched.
export function RDSPIcon({ active }: AccountIconProps) {
  return (
    <Scene>
      <Panel x={28} y={22} w={344} h={156} />
      <text x="44" y="42" fontSize="7.5" fill={MUTED} opacity="0.55" fontFamily="monospace">UP TO 300% GOVERNMENT MATCH</text>
      <circle cx="130" cy="110" r="20" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.45" />
      <text x="130" y="115" textAnchor="middle" fontSize="9" fill={MUTED} opacity="0.6" fontFamily="monospace">$1</text>
      <path d="M154 110 H210" fill="none" stroke={INK} strokeWidth="1" opacity="0.3" />
      <circle cx="250" cy="110" r="34" fill="none" stroke={HIGHLIGHT} strokeWidth="1.6" opacity={active ? 0.75 : 0.15}>
        {active && <animate attributeName="r" values="20;34" dur="0.8s" begin="0.3s" fill="freeze" />}
        {active && <animate attributeName="opacity" values="0;0.75" dur="0.5s" begin="0.3s" fill="freeze" />}
      </circle>
      <text x="250" y="115" textAnchor="middle" fontSize="10" fill={HIGHLIGHT} opacity={active ? 0.85 : 0} fontFamily="monospace">$3</text>
    </Scene>
  );
}

export const ACCOUNT_ICONS: Record<string, (props: AccountIconProps) => JSX.Element> = {
  tfsa: TFSAIcon,
  rrsp: RRSPIcon,
  fhsa: FHSAIcon,
  resp: RESPIcon,
  'non-registered': NonRegisteredIcon,
  rrif: RRIFIcon,
  'lira-lif': LIRALIFIcon,
  rdsp: RDSPIcon,
};
