import { INK, MUTED, PANEL, PANEL_BORDER, BG } from '../../lib/thumbnailPalette';

// Larger, more detailed "mechanism" diagrams for the /insurance/[slug] detail
// pages. Same scene grammar and CSS-variable palette as ServiceIcons /
// ProjectThumbnail, just bigger and busier with labels.

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="360" fill={BG} />
      {children}
    </svg>
  );
}

function Label({ x, y, children, anchor = 'start' }: { x: number; y: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="11" fill={MUTED} opacity="0.65" fontFamily="monospace">
      {children}
    </text>
  );
}

// 1. Segregated Funds — guarantee floor vs. market growth.
export function SegregatedFundsDiagram() {
  return (
    <Frame>
      <rect x="60" y="40" width="680" height="260" fill={PANEL} stroke={PANEL_BORDER} strokeWidth="1" rx="6" />
      <line x1="90" y1="270" x2="710" y2="270" stroke={INK} strokeWidth="0.8" opacity="0.35" />
      <rect x="90" y="230" width="620" height="40" fill={INK} opacity="0.07" />
      <line x1="90" y1="230" x2="710" y2="230" stroke={INK} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      <Label x={96} y={222}>GUARANTEED MINIMUM (e.g. 75–100% of deposits at maturity)</Label>
      <path
        d="M90 210 L160 175 L230 200 L300 130 L370 155 L440 95 L510 118 L580 70 L650 88 L710 55"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        opacity="0.7"
      >
        <animate attributeName="opacity" values="0.5;0.85;0.5" dur="3.5s" repeatCount="indefinite" />
      </path>
      <circle cx="710" cy="55" r="5" fill={PANEL} stroke={INK} strokeWidth="1.4" />
      <Label x={720} y={59} anchor="start">Market value</Label>
      <circle cx="710" cy="230" r="5" fill={PANEL} stroke={INK} strokeWidth="1.4" opacity="0.6" />
      <Label x={90} y={286}>0 yrs</Label>
      <Label x={710} y={286} anchor="end">Maturity</Label>
    </Frame>
  );
}

// 2. Whole / Universal Life — cash value vs. death benefit over decades.
export function WholeLifeDiagram() {
  return (
    <Frame>
      <rect x="60" y="40" width="680" height="260" fill={PANEL} stroke={PANEL_BORDER} strokeWidth="1" rx="6" />
      <line x1="90" y1="270" x2="710" y2="270" stroke={INK} strokeWidth="0.8" opacity="0.35" />
      <path d="M90 100 L710 70" fill="none" stroke={INK} strokeWidth="2" opacity="0.55" />
      <Label x={96} y={92}>Death benefit</Label>
      <path d="M90 260 C260 245 420 190 710 110" fill="none" stroke={INK} strokeWidth="2" opacity="0.75">
        <animate attributeName="opacity" values="0.55;0.9;0.55" dur="3s" repeatCount="indefinite" />
      </path>
      <Label x={96} y={250}>Cash value (grows tax-deferred)</Label>
      {[0, 10, 20, 30].map((yr, i) => (
        <g key={yr}>
          <line x1={90 + i * 206.6} y1="270" x2={90 + i * 206.6} y2="276" stroke={INK} strokeWidth="1" opacity="0.4" />
          <Label x={90 + i * 206.6} y={292} anchor="middle">Year {yr}</Label>
        </g>
      ))}
    </Frame>
  );
}

// 3. Critical Illness — diagnosis → claim → lump-sum payout flow.
export function CriticalIllnessDiagram() {
  const steps = [
    { x: 130, title: 'Covered diagnosis', sub: 'e.g. cancer, heart attack, stroke' },
    { x: 400, title: 'Claim submitted', sub: 'Medical documentation reviewed' },
    { x: 670, title: 'Lump-sum payout', sub: 'Paid directly to you, tax-free' },
  ];
  return (
    <Frame>
      {steps.map((step, i) => (
        <g key={step.x}>
          <circle cx={step.x} cy="150" r="46" fill={PANEL} stroke={INK} strokeWidth="1.4" opacity="0.7">
            <animate attributeName="opacity" values="0.4;0.85;0.4" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <text x={step.x} y="155" textAnchor="middle" fontSize="20" fill={INK} opacity="0.7" fontFamily="monospace">{i + 1}</text>
          <text x={step.x} y="222" textAnchor="middle" fontSize="14" fill={INK} opacity="0.85">{step.title}</text>
          <foreignObject x={step.x - 90} y="234" width="180" height="60">
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', textAlign: 'center', lineHeight: 1.5, fontFamily: 'inherit' }}>{step.sub}</div>
          </foreignObject>
        </g>
      ))}
      <path d="M180 150 H354" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.4" markerEnd="url(#ci-arrow)" />
      <path d="M450 150 H624" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.4" markerEnd="url(#ci-arrow)" />
      <defs>
        <marker id="ci-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={INK} opacity="0.5" />
        </marker>
      </defs>
    </Frame>
  );
}

// 4. Disability — income replacement % over time after a disabling event.
export function DisabilityDiagram() {
  return (
    <Frame>
      <rect x="60" y="40" width="680" height="260" fill={PANEL} stroke={PANEL_BORDER} strokeWidth="1" rx="6" />
      <line x1="90" y1="270" x2="710" y2="270" stroke={INK} strokeWidth="0.8" opacity="0.35" />
      <line x1="360" y1="60" x2="360" y2="270" stroke={INK} strokeWidth="1.2" strokeDasharray="5 5" opacity="0.45" />
      <Label x={360} y={54} anchor="middle">Disabling event</Label>
      <path d="M90 90 H360" fill="none" stroke={INK} strokeWidth="2.4" opacity="0.75" />
      <Label x={220} y={78} anchor="middle">100% working income</Label>
      <path d="M360 90 V190" fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.4" />
      <path d="M360 190 H710" fill="none" stroke={INK} strokeWidth="2.4" opacity="0.75">
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.8s" repeatCount="indefinite" />
      </path>
      <Label x={535} y={178} anchor="middle">~60–70% income replacement benefit</Label>
      <Label x={90} y={286}>Working</Label>
      <Label x={710} y={286} anchor="end">Elimination period ends → benefit begins</Label>
    </Frame>
  );
}

// 5. Term Life — coverage-period timeline with a payout trigger.
export function TermLifeDiagram() {
  return (
    <Frame>
      <rect x="60" y="40" width="680" height="260" fill={PANEL} stroke={PANEL_BORDER} strokeWidth="1" rx="6" />
      <line x1="120" y1="170" x2="680" y2="170" stroke={PANEL_BORDER} strokeWidth="10" strokeLinecap="round" />
      <line x1="120" y1="170" x2="680" y2="170" stroke={INK} strokeWidth="10" strokeLinecap="round" opacity="0.35">
        <animate attributeName="stroke-dasharray" values="0,560;560,0" dur="2.6s" fill="freeze" />
      </line>
      <circle cx="120" cy="170" r="7" fill={PANEL} stroke={INK} strokeWidth="1.4" />
      <Label x={120} y={200} anchor="middle">Policy starts</Label>
      <circle cx="680" cy="170" r="7" fill={PANEL} stroke={INK} strokeWidth="1.4" opacity="0.6" />
      <Label x={680} y={200} anchor="middle">Term ends (e.g. 20 yrs)</Label>
      <g>
        <circle cx="430" cy="170" r="10" fill={PANEL} stroke={INK} strokeWidth="1.6">
          <animate attributeName="r" values="10;14;10" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <line x1="430" y1="110" x2="430" y2="150" stroke={INK} strokeWidth="1.2" opacity="0.5" markerEnd="url(#tl-arrow)" />
        <Label x={430} y={100} anchor="middle">If death occurs in-term → benefit paid</Label>
      </g>
      <defs>
        <marker id="tl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={INK} opacity="0.6" />
        </marker>
      </defs>
    </Frame>
  );
}

// 6. Annuities — lump sum in → periodic income out.
export function AnnuitiesDiagram() {
  return (
    <Frame>
      <circle cx="180" cy="180" r="70" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.5" />
      <Label x={180} y={176} anchor="middle">Lump sum</Label>
      <Label x={180} y={192} anchor="middle">(savings / RRSP)</Label>
      <path d="M256 180 H360" fill="none" stroke={INK} strokeWidth="1.6" opacity="0.5" markerEnd="url(#an-arrow)" />
      <rect x="360" y="120" width="150" height="120" rx="10" fill={PANEL} stroke={INK} strokeWidth="1.4" opacity="0.85" />
      <Label x={435} y={176} anchor="middle">Annuity</Label>
      <Label x={435} y={192} anchor="middle">contract</Label>
      <path d="M510 180 H570" fill="none" stroke={INK} strokeWidth="1.6" opacity="0.5" markerEnd="url(#an-arrow)" />
      <line x1="590" y1="260" x2="740" y2="260" stroke={INK} strokeWidth="0.8" opacity="0.35" />
      {[600, 640, 680, 720].map((x, i) => (
        <rect key={x} x={x} y={230} width="20" height="30" rx="3" fill={INK} opacity="0">
          <animate attributeName="opacity" values="0;0.4" dur="0.5s" begin={`${i * 0.5}s`} fill="freeze" />
        </rect>
      ))}
      <Label x={665} y={286} anchor="middle">Predictable periodic income for a set period or life</Label>
      <defs>
        <marker id="an-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={INK} opacity="0.55" />
        </marker>
      </defs>
    </Frame>
  );
}

// 7. Mortgage / Creditor — declining balance vs. payout-on-death coverage.
export function MortgageCreditorDiagram() {
  return (
    <Frame>
      <rect x="60" y="40" width="680" height="260" fill={PANEL} stroke={PANEL_BORDER} strokeWidth="1" rx="6" />
      <line x1="90" y1="270" x2="710" y2="270" stroke={INK} strokeWidth="0.8" opacity="0.35" />
      <path d="M90 70 L710 70 L710 260 L90 260 Z" fill="none" opacity="0" />
      <path d="M90 70 L200 100 L320 130 L450 165 L580 210 L710 260" fill="none" stroke={INK} strokeWidth="2" opacity="0.75">
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
      </path>
      <Label x={100} y={62}>Outstanding mortgage balance</Label>
      <path d="M90 70 L710 260" fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="6 6" opacity="0.4" />
      <Label x={560} y={192} anchor="middle">Coverage matches declining balance</Label>
      <Label x={90} y={286}>Mortgage starts</Label>
      <Label x={710} y={286} anchor="end">Paid off</Label>
    </Frame>
  );
}

// 8. Group / Employee Benefits — employer + employee + coverage pool.
export function GroupBenefitsDiagram() {
  return (
    <Frame>
      <rect x="90" y="60" width="180" height="90" rx="8" fill={PANEL} stroke={INK} strokeWidth="1.3" opacity="0.85" />
      <Label x={180} y={100} anchor="middle">Employer</Label>
      <Label x={180} y={118} anchor="middle">sponsors plan</Label>
      <rect x="90" y="210" width="180" height="90" rx="8" fill={PANEL} stroke={INK} strokeWidth="1.3" opacity="0.85" />
      <Label x={180} y={250} anchor="middle">Employees</Label>
      <Label x={180} y={268} anchor="middle">enroll (+ dependants)</Label>
      <circle cx="500" cy="180" r="100" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.5" />
      <Label x={500} y={175} anchor="middle">Shared coverage pool</Label>
      <Label x={500} y={193} anchor="middle">Health · Dental · Life · Disability</Label>
      <path d="M270 100 Q380 130 400 165" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.5" markerEnd="url(#gb-arrow)">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.6s" repeatCount="indefinite" />
      </path>
      <path d="M270 255 Q380 225 400 195" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.5" markerEnd="url(#gb-arrow)">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.6s" begin="0.6s" repeatCount="indefinite" />
      </path>
      <defs>
        <marker id="gb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={INK} opacity="0.55" />
        </marker>
      </defs>
    </Frame>
  );
}

export const SERVICE_DIAGRAMS: Record<string, () => JSX.Element> = {
  'segregated-funds': SegregatedFundsDiagram,
  'whole-life': WholeLifeDiagram,
  'critical-illness': CriticalIllnessDiagram,
  disability: DisabilityDiagram,
  'term-life': TermLifeDiagram,
  annuities: AnnuitiesDiagram,
  'mortgage-creditor': MortgageCreditorDiagram,
  'group-benefits': GroupBenefitsDiagram,
};
