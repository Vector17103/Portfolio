import {
  TFSAIcon,
  RRSPIcon,
  FHSAIcon,
  RESPIcon,
  NonRegisteredIcon,
  RRIFIcon,
  LIRALIFIcon,
  RDSPIcon,
  AccountIconProps,
} from '../components/insurance/AccountIcons';

export interface DataTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface AccountLearnMoreLink {
  label: string;
  url: string;
  note: string;
}

export interface AccountData {
  slug: string;
  name: string;
  fullName: string;
  shortDescription: string;
  photoAlt: string;
  icon: (props: AccountIconProps) => JSX.Element;
  order: number;
  whatItIs: string[];
  contributionRules: string[];
  contributionTable?: DataTable;
  taxTreatment: DataTable;
  withdrawalRules: string[];
  overContributionPenalty: string[];
  whoItsBestFor: string[];
  bestForTable?: DataTable;
  interactions: string[];
  commonMistakes: string[];
  whatYouCanHold: string[];
  example: string;
  learnMore: AccountLearnMoreLink[];
  showMarginalRateTable?: boolean;
}

// 2026 combined federal + Ontario marginal tax rates on regular (non-dividend,
// non-capital-gains) income, including Ontario surtax. Excludes the Ontario
// Health Premium (adds up to ~$900/yr depending on income, not a marginal-rate
// line item). Source: taxtips.ca/taxrates/on.htm — verify against canada.ca
// and ontario.ca before publishing; brackets are indexed annually.
export const ontarioMarginalRates2026: DataTable = {
  title: '2026 combined federal + Ontario marginal tax rates (regular income)',
  headers: ['Taxable income', 'Combined marginal rate'],
  rows: [
    ['Up to $53,891', '19.05%'],
    ['$53,891 – $58,523', '23.15%'],
    ['$58,523 – $94,907', '29.65%'],
    ['$94,907 – $107,785', '31.48%'],
    ['$107,785 – $111,814', '33.89%'],
    ['$111,814 – $117,045', '37.91%'],
    ['$117,045 – $150,000', '43.41%'],
    ['$150,000 – $181,440', '44.97%'],
    ['$181,440 – $220,000', '48.26%'],
    ['$220,000 – $258,482', '49.82%'],
    ['Over $258,482', '53.53%'],
  ],
};

// ACHYUT: every figure below was cross-checked against canada.ca/CRA (and
// FSRA for the Ontario-specific LIRA/LIF figures) as of this writing — but
// contribution limits, thresholds, and prescribed factors are indexed and
// change annually. Re-verify each one against canada.ca before publishing,
// and review all content against your actual licensed offerings.
export const accounts: AccountData[] = [
  {
    slug: 'tfsa',
    name: 'TFSA',
    fullName: 'Tax-Free Savings Account',
    shortDescription: 'Contributions aren’t deductible, but growth and withdrawals are completely tax-free.',
    photoAlt: 'A glass jar of coins with a small plant growing from it, on a wooden table, symbolizing everyday tax-free saving.',
    icon: TFSAIcon,
    order: 1,
    whatItIs: [
      'A TFSA lets you invest after-tax money and never pay tax again on what it earns — no tax on growth while it’s inside the account, and no tax when you take money out, ever.',
      'Unlike an RRSP, contributions don’t reduce your taxable income. The trade is simple: no deduction going in, but complete tax freedom coming out, for any reason, at any age.',
      '"Contribution room" is the amount you’re allowed to deposit. It accumulates every year you’re 18+ and resident in Canada, whether or not you actually open an account.',
    ],
    contributionRules: [
      'You get new room every January 1st automatically — you don’t need to file anything to "earn" it, unlike RRSP room, which depends on income.',
      'Unused room carries forward indefinitely. If you’ve never contributed and were 18 or older in 2009, your cumulative room by 2026 is $109,000 (see table below) — but that assumes you were a Canadian resident with a valid SIN for every one of those years; non-residents and people who turned 18 later have less.',
      'Withdrawals restore room, but not until January 1st of the following calendar year — pull money out in 2026 and you can’t recontribute that amount until 2027 without triggering an over-contribution penalty.',
    ],
    contributionTable: {
      title: 'TFSA annual dollar limit by year',
      headers: ['Year', 'Annual limit', 'Cumulative (if eligible since 2009)'],
      rows: [
        ['2009 – 2012', '$5,000/yr', '$20,000'],
        ['2013 – 2014', '$5,500/yr', '$31,000'],
        ['2015', '$10,000', '$41,000'],
        ['2016 – 2018', '$5,500/yr', '$57,500'],
        ['2019 – 2022', '$6,000/yr', '$81,500'],
        ['2023', '$6,500', '$88,000'],
        ['2024 – 2026', '$7,000/yr', '$109,000'],
      ],
    },
    taxTreatment: {
      title: 'TFSA tax treatment',
      headers: ['', 'Treatment'],
      rows: [
        ['Contributions', 'Not tax-deductible'],
        ['Growth inside the account', 'Never taxed'],
        ['Withdrawals', 'Never taxed, no matter the amount or reason'],
        ['Effect on income-tested benefits (OAS, GIS, CCB)', 'None — TFSA withdrawals don’t count as income'],
        ['Effect on contribution room', 'Withdrawals are added back to room, effective the next calendar year'],
      ],
    },
    withdrawalRules: [
      'No restrictions — withdraw any amount, at any time, for any reason, with no tax owing and no requirement to ever "repay" it the way HBP or LLP withdrawals from an RRSP must be repaid.',
      'The only timing rule that matters is on the way back in: the withdrawn room isn’t available to recontribute until the following January 1st.',
    ],
    overContributionPenalty: [
      'Over-contributing triggers a 1% per month tax on the highest excess amount in the account that month, for every month the excess remains.',
      'A common trap: withdrawing and recontributing in the same calendar year, not realizing the room isn’t restored until January 1st of the next year — the recontribution is treated as a fresh over-contribution against your existing room.',
    ],
    whoItsBestFor: [
      'Anyone expecting to be in the same or a higher tax bracket in retirement than they are now',
      'Short- and medium-term savings goals where you may need penalty-free access to the money',
      'People who have already maximized higher-priority registered room (e.g., employer-matched RRSP contributions)',
    ],
    bestForTable: {
      title: 'TFSA vs. RRSP — which wins, roughly',
      headers: ['Your situation', 'Likely better choice'],
      rows: [
        ['Lower income now than expected in retirement', 'TFSA (limited deduction value today)'],
        ['Higher income now than expected in retirement', 'RRSP (deduction is worth more today)'],
        ['Might need the money before retirement', 'TFSA (no penalty, no repayment)'],
        ['Receiving income-tested benefits (GIS, CCB)', 'TFSA (withdrawals don’t reduce benefits)'],
        ['Want to shelter growth beyond RRSP room', 'TFSA (no earned-income requirement)'],
      ],
    },
    interactions: [
      'TFSA and RRSP room are completely independent — maxing one doesn’t use up the other.',
      'Because TFSA withdrawals aren’t counted as income, drawing from a TFSA in retirement (instead of a RRIF) can help keep income low enough to avoid OAS clawback or preserve GIS eligibility.',
      'A common sequencing approach: contribute enough to an employer RRSP to capture any employer match, then fill the TFSA, then return to further RRSP contributions if room and tax bracket justify it.',
    ],
    commonMistakes: [
      'Over-contributing after a withdrawal, not realizing room isn’t restored until the following year',
      'Holding U.S. dividend-paying stocks in a TFSA — unlike an RRSP, the TFSA isn’t recognized under the Canada-U.S. tax treaty, so U.S. withholding tax on those dividends isn’t recoverable',
      'Day-trading inside a TFSA — the CRA can deem frequent, business-like trading in a TFSA to be taxable business income, and has assessed accounts this way',
      'Not tracking contribution room carefully across multiple institutions, leading to accidental over-contribution',
    ],
    whatYouCanHold: [
      'Cash, GICs, mutual funds, ETFs, individual stocks and bonds, and segregated fund contracts.',
      'Segregated funds held in a TFSA combine the account’s tax-free growth with the insurance contract’s maturity/death benefit guarantees and potential creditor protection — worth discussing if those guarantees matter to you.',
      'A TFSA held as an insurance contract lets you name a beneficiary directly, which can allow the proceeds to bypass probate on death — a plain investment TFSA instead names a "successor holder" (spouse only) or beneficiary with somewhat different mechanics.',
    ],
    example:
      'A 30-year-old contributing $7,000/year for 30 years at a 5% average return would have contributed $210,000 and could have roughly $490,000 in the account — all of it withdrawable tax-free.',
    learnMore: [
      {
        label: 'CRA — Tax-Free Savings Account (TFSA)',
        url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html',
        note: 'Official rules, contribution room calculator, and current limits.',
      },
      {
        label: 'Equitable Life — Segregated Funds',
        url: 'https://www.equitable.ca/products/investments/segregated-funds',
        note: 'How segregated fund guarantees work if held inside a TFSA.',
      },
    ],
    showMarginalRateTable: true,
  },

  {
    slug: 'rrsp',
    name: 'RRSP',
    fullName: 'Registered Retirement Savings Plan',
    shortDescription: 'Contributions are tax-deductible now; growth and withdrawals are taxed later, in retirement.',
    photoAlt: 'A person walking along a long dirt path toward distant hills, representing a steady, long-term retirement horizon.',
    icon: RRSPIcon,
    order: 2,
    whatItIs: [
      'An RRSP lets you deduct contributions from your income today, defer tax on growth while the money stays inside the plan, and pay tax only when you eventually withdraw — ideally in retirement, when your income (and tax rate) may be lower.',
      'It’s built for long-term retirement saving: withdrawals before retirement are fully taxed as income in the year you take them out, on top of upfront withholding tax, which makes early withdrawals expensive.',
      'Room is tied to your income, not just your age — no earned income in a given year means no new RRSP room from that year.',
    ],
    contributionRules: [
      'Your annual limit is the lesser of 18% of your prior year’s earned income or the year’s dollar limit ($33,810 for 2026), plus any unused room carried forward from previous years, minus any pension adjustment (PA) if you or an employer contributed to a workplace pension or group plan.',
      'Unlike TFSA room, RRSP room carries forward indefinitely but is never simply "given" — it has to be earned through income, so someone with irregular or no earned income accumulates little or no new room.',
      'A related but distinct figure is the money purchase (MP) limit ($35,390 for 2026), used for defined-contribution pension plans — it is not your personal RRSP limit, though the two are calculated on a related schedule.',
    ],
    taxTreatment: {
      title: 'RRSP tax treatment',
      headers: ['', 'Treatment'],
      rows: [
        ['Contributions', 'Tax-deductible against income in the year contributed (or a later year, if you carry the deduction forward)'],
        ['Growth inside the account', 'Tax-deferred — no annual tax while it stays in the plan'],
        ['Withdrawals', 'Fully taxed as income in the year withdrawn, plus upfront withholding tax'],
        ['Effect on income-tested benefits (OAS, GIS, CCB)', 'Withdrawals count as income and can reduce GIS, trigger OAS clawback, or reduce CCB'],
        ['Effect on contribution room', 'A withdrawal does NOT restore room — once withdrawn (outside HBP/LLP), that room is gone for good'],
      ],
    },
    withdrawalRules: [
      'Any withdrawal is added to income for that year and subject to upfront withholding tax (roughly 10–30% depending on the amount and province, with the balance reconciled on your tax return).',
      'Two special programs let you withdraw without immediate tax, provided you repay: the Home Buyers’ Plan (HBP) — up to $60,000 for a qualifying first home, repaid over 15 years starting the second year after withdrawal — and the Lifelong Learning Plan (LLP) — up to $10,000/year, $20,000 total, for qualifying education, repaid over 10 years.',
      'RRSPs must be converted — typically to a RRIF or annuity — by December 31 of the year you turn 71; you can’t hold a personal RRSP past that point.',
    ],
    overContributionPenalty: [
      'You’re allowed a lifetime $2,000 over-contribution cushion with no penalty (a buffer for estimation error, not an extra deduction).',
      'Beyond that $2,000, excess contributions are taxed at 1% per month until withdrawn or absorbed by new room.',
    ],
    whoItsBestFor: [
      'People in a higher tax bracket now than they expect to be in retirement — the deduction is worth more today',
      'Anyone with an employer RRSP match — that match is close to free money and should usually be captured before anything else',
      'Those who want to reduce taxable income in a specific high-earning year',
    ],
    bestForTable: {
      title: 'RRSP vs. TFSA — which wins, roughly',
      headers: ['Your situation', 'Likely better choice'],
      rows: [
        ['Higher income now than expected in retirement', 'RRSP'],
        ['Employer matches RRSP contributions', 'RRSP (at least up to the match)'],
        ['Lower income now than expected in retirement', 'TFSA'],
        ['Need flexible, penalty-free access', 'TFSA'],
        ['Want to reduce this year’s taxable income', 'RRSP'],
      ],
    },
    interactions: [
      'A spousal RRSP lets a higher-earning spouse contribute (using their own room) to a plan owned by the lower-earning spouse, splitting retirement income and future tax more evenly between them.',
      'FHSA and HBP can be combined for a first home purchase — money can come from both, though not for the exact same portion, meaningfully increasing what a first-time buyer can withdraw tax-free.',
      'Once you retire, RRSP/RRIF withdrawals are taxed as regular income and count toward OAS clawback and GIS testing — many retirees deliberately draw down RRSPs earlier and delay CPP/OAS to manage this.',
    ],
    commonMistakes: [
      'Contributing when in a low tax bracket, then withdrawing in a similarly low bracket later — the deduction was worth little and the eventual withdrawal is still fully taxed',
      'Forgetting HBP/LLP repayments — a missed annual repayment is added to your income for that year instead',
      'Not naming a beneficiary (or naming the estate by default), which can expose the RRSP to probate fees',
      'Withdrawing early to cover a short-term cash need, losing both the room and paying withholding tax and income tax on the withdrawal',
    ],
    whatYouCanHold: [
      'Cash, GICs, mutual funds, ETFs, individual stocks and bonds, and segregated fund contracts.',
      'A segregated fund RRSP adds maturity/death benefit guarantees and potential creditor protection on top of the RRSP’s tax deferral — relevant for business owners and professionals concerned about creditor exposure.',
      'Naming a beneficiary directly on an insurance-contract RRSP can allow proceeds to bypass probate on death, unlike a plain brokerage RRSP where the estate is typically involved unless a successor annuitant is named.',
    ],
    example:
      'Someone earning $90,000/year contributing $10,000 to their RRSP would save roughly $2,965–$3,148 in tax immediately (at the ~29.65–31.48% marginal rate shown below), with the $10,000 then growing tax-deferred until withdrawn in retirement.',
    learnMore: [
      {
        label: 'CRA — RRSPs and related plans',
        url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans.html',
        note: 'Contribution limits, HBP/LLP rules, and conversion deadlines.',
      },
    ],
    showMarginalRateTable: true,
  },

  {
    slug: 'fhsa',
    name: 'FHSA',
    fullName: 'First Home Savings Account',
    shortDescription: 'Deductible contributions like an RRSP, tax-free qualifying withdrawals like a TFSA — built for a first home.',
    photoAlt: 'A hand holding a house-shaped keychain with new keys in front of a bright doorway, marking a first home milestone.',
    icon: FHSAIcon,
    order: 3,
    whatItIs: [
      'The FHSA combines the best of both worlds for a first-time home purchase: contributions are tax-deductible (like an RRSP), and a qualifying withdrawal toward a first home is completely tax-free (like a TFSA).',
      'It’s available to Canadian residents 18 or older (19 in some provinces for opening) who haven’t owned a home they lived in as their principal residence in the current year or the four preceding calendar years.',
      'It’s narrowly purposed: money not used for a qualifying home purchase can be transferred tax-free to an RRSP or RRIF, but a non-qualifying withdrawal is fully taxed as income.',
    ],
    contributionRules: [
      'Participation room accrues at $8,000/year, starting the year you open your first FHSA — unlike TFSA room, it does not accumulate before you open an account.',
      'Unused room carries forward, but only up to $8,000 — so the maximum you can contribute in any single year (current year + one year carried forward) is $16,000.',
      'Lifetime contribution limit across all your FHSAs is $40,000.',
    ],
    taxTreatment: {
      title: 'FHSA tax treatment',
      headers: ['', 'Treatment'],
      rows: [
        ['Contributions', 'Tax-deductible, same as an RRSP contribution'],
        ['Growth inside the account', 'Tax-deferred while inside the plan'],
        ['Qualifying withdrawals (first home)', 'Completely tax-free'],
        ['Non-qualifying withdrawals', 'Fully taxed as income (unless transferred to an RRSP/RRIF first)'],
        ['Effect on income-tested benefits', 'Qualifying withdrawals don’t count as income; non-qualifying withdrawals do'],
      ],
    },
    withdrawalRules: [
      'A qualifying withdrawal requires a written agreement to buy or build a qualifying home in Canada, intended as your principal residence, and that you haven’t owned a home you lived in during the current year or the previous four calendar years.',
      'Your FHSA(s) must be closed by December 31 of the year that is earliest of: the 15th anniversary of opening your first FHSA, the year you turn 71, or the year following your first qualifying withdrawal.',
      'At closure, any remaining balance can be transferred tax-free to an RRSP or RRIF (using no RRSP room), or withdrawn and taxed as income.',
    ],
    overContributionPenalty: [
      'Excess FHSA contributions are taxed at 1% per month on the highest excess amount for each month it remains, similar to TFSA and RRSP over-contributions.',
    ],
    whoItsBestFor: [
      'First-time home buyers who haven’t owned and lived in a home in the current year or the past four years',
      'Anyone who can also use the Home Buyers’ Plan alongside it — the two can be combined toward the same purchase',
      'Buyers in higher tax brackets who benefit most from the upfront deduction',
    ],
    interactions: [
      'FHSA and HBP can both be used for the same first home purchase, substantially increasing the tax-advantaged amount available for a down payment.',
      'If you don’t end up buying a home, the balance transfers tax-free to your RRSP or RRIF (this transfer doesn’t use up RRSP contribution room, but does count against nothing — it’s simply a tax-free rollover).',
      'Because contributions are deductible like an RRSP, an FHSA contribution in a high-income year has similar tax-planning value to an RRSP contribution, on top of the eventual tax-free withdrawal.',
    ],
    commonMistakes: [
      'Opening the account too late — room only starts accruing once it’s opened, so waiting to open an FHSA "until you’re ready to buy" wastes years of potential $8,000/year room',
      'Not confirming eligibility (the four-year non-ownership rule) before contributing',
      'Letting the account run past its closure deadline without a plan to transfer or withdraw the balance',
      'Assuming any home withdrawal is automatically tax-free — it must meet the qualifying-withdrawal conditions',
    ],
    whatYouCanHold: [
      'Cash, GICs, mutual funds, ETFs, individual stocks and bonds — similar eligible investments to a TFSA or RRSP.',
      'Segregated fund contracts are available inside an FHSA through insurance company issuers, adding maturity/death benefit guarantees to the account’s tax treatment.',
    ],
    example:
      'A first-time buyer who opens an FHSA and contributes $8,000/year for 5 years (total $40,000, the lifetime max) at a modest return might have roughly $43,000–$45,000 available, entirely tax-free, toward their down payment.',
    learnMore: [
      {
        label: 'CRA — First Home Savings Account (FHSA)',
        url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html',
        note: 'Eligibility, contribution room, and qualifying withdrawal rules.',
      },
    ],
  },

  {
    slug: 'resp',
    name: 'RESP',
    fullName: 'Registered Education Savings Plan',
    shortDescription: 'Tax-deferred growth plus a 20% government grant on contributions, for a child’s post-secondary education.',
    photoAlt: 'A child reading a book by a sunlit window, representing education savings for the future.',
    icon: RESPIcon,
    order: 4,
    whatItIs: [
      'An RESP lets you save for a beneficiary’s post-secondary education with tax-deferred growth and, critically, a government grant that adds 20% on top of your own contributions.',
      'Contributions themselves aren’t tax-deductible, but the growth and grants inside the plan aren’t taxed until withdrawn — and when withdrawn for education, they’re taxed in the student’s hands, typically at a very low or zero rate.',
      'There’s no annual contribution cap, only a lifetime one — so you can catch up in a single large contribution if you started late, subject to the grant’s own annual matching limits.',
    ],
    contributionRules: [
      'Lifetime contribution limit is $50,000 per beneficiary, with no annual maximum.',
      'The Canada Education Savings Grant (CESG) matches 20% of contributions, up to $500/year (on the first $2,500 contributed that year), to a lifetime maximum of $7,200 per beneficiary.',
      'Unused CESG grant room carries forward and can be caught up (at $1,000/year in grant, i.e. matching $5,000 of contributions in a single catch-up year) until the beneficiary turns 17 — but the $7,200 lifetime cap still applies.',
      'Lower-income families may also qualify for the Canada Learning Bond (CLB), worth up to $2,000 over the life of the plan, with no contribution required to receive it.',
    ],
    taxTreatment: {
      title: 'RESP tax treatment',
      headers: ['', 'Treatment'],
      rows: [
        ['Contributions', 'Not tax-deductible'],
        ['Growth and grants inside the account', 'Tax-deferred'],
        ['Withdrawn contributions (Post-Secondary Education, "PSE")', 'Tax-free — return of your own after-tax money'],
        ['Withdrawn growth + grants ("EAP")', 'Taxed in the student’s hands, usually at little or no tax given typical student income'],
        ['Effect on income-tested benefits', 'RESP withdrawals are attributed to the student, not the contributing parent, so they generally don’t affect the parent’s benefits'],
      ],
    },
    withdrawalRules: [
      'Contributions can be withdrawn by the subscriber at any time, tax-free, since they were never deductible.',
      'Educational Assistance Payments (EAPs) — the grant and growth portion — require proof of enrollment in a qualifying post-secondary program, and are capped at $8,000 for the first 13 weeks of full-time study (uncapped after that, subject to reasonableness).',
      'RESPs must generally be collapsed within 35 years of being opened (40 years for a plan with a beneficiary eligible for the Disability Tax Credit).',
    ],
    overContributionPenalty: [
      'Contributing beyond the $50,000 lifetime limit per beneficiary triggers a 1% per month tax on the excess amount until it’s withdrawn.',
    ],
    whoItsBestFor: [
      'Parents, grandparents, or other family members saving for a child’s post-secondary education',
      'Anyone who wants "free" government matching money — the CESG is one of the highest guaranteed returns available for education savings',
      'Families who can contribute at least $2,500/year per child to capture the full annual CESG match',
    ],
    interactions: [
      'RESP grants and growth are separate from RRSP and TFSA room — contributing to an RESP doesn’t use up either.',
      'If a child doesn’t pursue post-secondary education, up to $50,000 of the growth portion (not grants, which are repaid to the government) can generally be transferred to the subscriber’s RRSP, if they have the room.',
      'Family RESPs (covering multiple children) allow grant room and growth to be shared among siblings, which can help if one child’s education costs less than others.',
    ],
    commonMistakes: [
      'Not contributing at least $2,500/year per child, leaving CESG matching money unclaimed',
      'Waiting too long to open the plan — CESG catch-up is capped at $1,000/year in grant, so large gaps are hard to fully recover before the beneficiary turns 17',
      'Withdrawing EAPs inefficiently — a large lump-sum EAP withdrawal in one year can push a student’s income tax bill up unnecessarily; spreading withdrawals across years is often more efficient',
      'Not understanding that if the RESP is collapsed without a beneficiary pursuing education, the CESG and CLB portions must be repaid to the government',
    ],
    whatYouCanHold: [
      'Cash, GICs, mutual funds, ETFs, individual stocks and bonds, and segregated fund contracts, similar to a TFSA or RRSP.',
      'Segregated fund RESPs add maturity guarantees on the invested portion, which can appeal to risk-averse families saving over a fixed, relatively short time horizon before funds are needed.',
    ],
    example:
      'A parent contributing $2,500/year from birth receives the full $500/year CESG match; by age 18 that’s $45,000 in contributions plus $9,000 in grants (capped at the $7,200 lifetime maximum) — call it roughly $52,200 in contributions and grants before any investment growth.',
    learnMore: [
      {
        label: 'CRA — Registered Education Savings Plans (RESPs)',
        url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps.html',
        note: 'Contribution limits, grant rules, and withdrawal (EAP) mechanics.',
      },
    ],
  },

  {
    slug: 'non-registered',
    name: 'Non-Registered',
    fullName: 'Non-Registered (Taxable) Investment Account',
    shortDescription: 'No contribution limit and no restrictions — but growth is taxed every year it’s realized.',
    photoAlt: 'A cup of coffee and scattered coffee beans resting on a folded newspaper, representing open, flexible investing.',
    icon: NonRegisteredIcon,
    order: 5,
    whatItIs: [
      'A non-registered account is simply a regular, unsheltered investment account — no government limits on contributions, no deductions, and no tax-free growth. You pay tax annually on interest, dividends, and any capital gains you realize.',
      'It’s the default option once registered room (TFSA, RRSP, FHSA, RESP) is used up, or for money you want fully liquid and unrestricted.',
      'Different types of investment income are taxed differently inside a non-registered account, which makes what you hold — and how it’s taxed — matter more here than in a registered plan.',
    ],
    contributionRules: [
      'No contribution limit, no earned-income requirement, no annual cap — you can deposit any amount at any time.',
      'Because there’s no deduction and no cap to track, there’s no "contribution room" concept at all for a non-registered account.',
    ],
    taxTreatment: {
      title: 'How different income types are taxed (non-registered)',
      headers: ['Income type', '2026 treatment'],
      rows: [
        ['Interest income', 'Fully taxable at your marginal rate — the least tax-efficient income type to hold here'],
        ['Eligible Canadian dividends', 'Grossed up 38%, then a 15.02% federal dividend tax credit applies (plus a provincial credit)'],
        ['Non-eligible Canadian dividends', 'Grossed up 15%, then a 9.03% federal dividend tax credit applies (plus a provincial credit)'],
        ['Capital gains', 'Only 50% of the gain is included in taxable income (the inclusion rate) — realized only when you sell'],
        ['Foreign income (e.g., U.S. dividends)', 'Fully taxable, though foreign withholding tax is usually creditable against Canadian tax owing'],
      ],
    },
    withdrawalRules: [
      'No restrictions of any kind — withdraw any amount, at any time, for any reason. There’s no "withdrawal" event to report; only realized income and capital gains are taxed as they occur.',
      'Capital gains are only taxed when you actually sell (or otherwise dispose of) an investment — unrealized gains on investments you continue to hold are not taxed.',
    ],
    overContributionPenalty: [
      'Not applicable — there is no contribution limit, so there is no over-contribution penalty.',
    ],
    whoItsBestFor: [
      'Anyone who has maximized TFSA, RRSP, and other registered room and still wants to invest more',
      'Money you may need access to without any plan-specific rules or repayment obligations',
      'Investors comfortable managing adjusted cost base (ACB) tracking and annual tax reporting',
    ],
    interactions: [
      'A non-registered account is often the "overflow" once TFSA and RRSP room are used — many advisors recommend filling registered room first, since it shelters growth from tax entirely or defers it.',
      'Because dividends and capital gains are taxed more favourably than interest, asset location matters: it’s often more efficient to hold interest-bearing investments (bonds, GICs) inside a registered account, and dividend/capital-gains-generating investments in the non-registered account.',
      'Capital losses realized in a non-registered account can offset capital gains in the same year, or be carried back 3 years or forward indefinitely — a planning tool not available inside registered accounts.',
    ],
    commonMistakes: [
      'Not tracking adjusted cost base (ACB) carefully, especially with reinvested distributions, leading to an incorrect (and often overstated) capital gain when eventually reported',
      'Triggering the superficial loss rule — selling an investment at a loss and buying it back (or having a spouse or your RRSP/TFSA buy it) within 30 days before or after denies the loss',
      'Holding interest-heavy investments in a non-registered account when registered room is still available — interest is the least tax-efficient income type and belongs in a TFSA or RRSP first if possible',
      'Forgetting that reinvested (not just cash) distributions from mutual funds and ETFs are still taxable income in the year received, even though no cash left the account',
    ],
    whatYouCanHold: [
      'Cash, GICs, mutual funds, ETFs, individual stocks and bonds, and segregated fund contracts — the widest range of any account type, with no eligibility restrictions.',
      'A non-registered segregated fund contract adds maturity/death benefit guarantees, potential creditor protection, and the ability to name a beneficiary directly (bypassing probate) — features a standard non-registered brokerage account doesn’t have.',
    ],
    example:
      'An investor holding $50,000 in a non-registered account that grows by $5,000 in eligible Canadian dividends and realized capital gains combined would pay meaningfully less tax on that growth than if the same amount were earned as interest, due to the dividend tax credit and the 50% capital gains inclusion rate.',
    learnMore: [
      {
        label: 'CRA — Line 12700, Capital gains',
        url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains.html',
        note: 'How capital gains, the inclusion rate, and ACB are reported.',
      },
    ],
  },

  {
    slug: 'rrif',
    name: 'RRIF',
    fullName: 'Registered Retirement Income Fund',
    shortDescription: 'The RRSP’s decumulation counterpart — mandatory minimum withdrawals, taxed as income, once you retire.',
    photoAlt: 'A person relaxing in a rocking chair on a porch overlooking green fields at golden hour, representing calm retirement income.',
    icon: RRIFIcon,
    order: 6,
    whatItIs: [
      'A RRIF is what an RRSP becomes when it’s time to draw income from it. You can convert voluntarily earlier, but conversion is mandatory by December 31 of the year you turn 71.',
      'Once converted, no further contributions are allowed — a RRIF is purely a decumulation vehicle. Each year, you must withdraw at least a prescribed minimum amount, which is added to your taxable income.',
      'You choose the investments and the withdrawal amount above the minimum; the account continues to grow tax-deferred on whatever remains inside it.',
    ],
    contributionRules: [
      'No contributions are permitted — money arrives in a RRIF only by transfer from an RRSP (or another RRIF), not by new deposits.',
      'You can convert an RRSP to a RRIF at any age, but it becomes mandatory in the year you turn 71.',
    ],
    taxTreatment: {
      title: 'RRIF tax treatment',
      headers: ['', 'Treatment'],
      rows: [
        ['Transfer in from RRSP', 'Tax-free rollover, no new deduction'],
        ['Growth inside the account', 'Tax-deferred while it remains in the RRIF'],
        ['Withdrawals (minimum and above)', 'Fully taxed as income in the year withdrawn'],
        ['Effect on income-tested benefits (OAS, GIS)', 'Withdrawals count as income and can trigger OAS clawback or reduce GIS'],
        ['Withholding tax', 'Applies only to withdrawals above the annual required minimum'],
      ],
    },
    withdrawalRules: [
      'You must withdraw at least the prescribed minimum each year, calculated as a percentage of the RRIF’s value at the start of the year, based on your age (or your spouse’s, if you elect to use their younger age to reduce the minimum).',
      'There is no maximum — you can withdraw the entire RRIF at once if you choose, fully taxable in that year.',
      'The first year, if you convert partway through the year, no minimum withdrawal is required for that partial first year.',
    ],
    contributionTable: {
      title: 'RRIF prescribed minimum withdrawal factors by age',
      headers: ['Age (Jan 1)', 'Minimum withdrawal %'],
      rows: [
        ['65', '1 ÷ (90 − age) ≈ 4.00%'],
        ['71', '5.28%'],
        ['72', '5.40%'],
        ['75', '5.82%'],
        ['80', '6.82%'],
        ['85', '8.51%'],
        ['90', '11.92%'],
        ['95+', '20.00%'],
      ],
    },
    overContributionPenalty: [
      'Not applicable in the usual sense — you can’t "over-contribute" to a RRIF. The risk runs the other way: failing to withdraw at least the required minimum each year can trigger CRA penalties and interest on the shortfall.',
    ],
    whoItsBestFor: [
      'Anyone with RRSP savings reaching age 71, since conversion becomes mandatory',
      'Retirees who want a structured, government-mandated framework for drawing down retirement savings',
      'Those who want to convert earlier (before 71) to start splitting RRIF income with a spouse via pension income splitting, available from age 65',
    ],
    interactions: [
      'RRIF withdrawals qualify for pension income splitting with a spouse starting at age 65, which can meaningfully reduce a couple’s combined tax bill.',
      'The first $2,000 of eligible pension income (which includes RRIF withdrawals from age 65) qualifies for the federal pension income tax credit.',
      'Because RRIF withdrawals count as income for OAS clawback purposes, some retirees draw down RRSP/RRIF savings earlier and more aggressively (even before 71) specifically to reduce the RRIF balance — and future mandatory withdrawals — before OAS and other income-tested benefits begin.',
    ],
    commonMistakes: [
      'Not withdrawing the required minimum in a given year',
      'Converting the full RRSP to a RRIF exactly at 71 without considering a partial, earlier conversion for income-splitting or benefit-management purposes',
      'Withdrawing far more than the minimum without a plan, accelerating tax and depleting savings faster than needed',
      'Not electing to base the minimum on a younger spouse’s age when it would meaningfully reduce required withdrawals and tax',
    ],
    whatYouCanHold: [
      'Cash, GICs, mutual funds, ETFs, individual stocks and bonds, and segregated fund contracts, transferred in from the originating RRSP.',
      'A segregated fund RRIF continues any maturity/death benefit guarantees from the original contract and can allow a named beneficiary to receive proceeds directly, bypassing probate.',
    ],
    example:
      'Someone converting a $500,000 RRSP to a RRIF at age 71 would need to withdraw at least 5.28% in the first full year — about $26,400 — added to their taxable income for that year, whether or not they need the cash.',
    learnMore: [
      {
        label: 'CRA — Registered Retirement Income Funds (RRIFs)',
        url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-a-registered-retirement-income-fund.html',
        note: 'Conversion deadlines, minimum withdrawal rules, and the prescribed factor table.',
      },
    ],
  },

  {
    slug: 'lira-lif',
    name: 'LIRA / LIF',
    fullName: 'Locked-In Retirement Account / Life Income Fund',
    shortDescription: 'Locked-in savings from a former employer pension — access is restricted by provincial pension law, not just tax rules.',
    photoAlt: 'An office bag resting on the floor beside an empty desk chair, representing the transition of leaving an employer pension plan.',
    icon: LIRALIFIcon,
    order: 7,
    whatItIs: [
      'A LIRA holds money transferred out of a former employer’s pension plan when you leave that job. It behaves like an RRSP for tax and investment purposes, but the money is "locked in" under provincial pension legislation — you generally can’t simply withdraw it.',
      'To draw income, a LIRA is converted to a LIF (or, in some provinces, a Life Annuity), which — like a RRIF — has minimum withdrawal requirements, but also a maximum, unlike a RRIF.',
      'Ontario’s locked-in rules are set by FSRA (the Financial Services Regulatory Authority of Ontario) under the Pension Benefits Act, which governs both the LIF maximum and the specific "unlocking" options described below.',
    ],
    contributionRules: [
      'No new contributions are permitted — money enters a LIRA only by transfer from a former employer pension plan (or another LIRA/locked-in RRSP), never by direct deposit.',
      'A LIRA has no mandatory conversion age tied to it directly, but must be converted (typically to a LIF) by the same December 31 of the year you turn 71 deadline that applies to RRSPs.',
    ],
    taxTreatment: {
      title: 'LIRA / LIF tax treatment',
      headers: ['', 'Treatment'],
      rows: [
        ['Transfer in from pension plan', 'Tax-free rollover'],
        ['Growth inside the account', 'Tax-deferred while it remains locked in'],
        ['LIF withdrawals', 'Fully taxed as income in the year withdrawn, like a RRIF'],
        ['Effect on income-tested benefits', 'Withdrawals count as income and can affect OAS clawback and GIS, same as RRIF income'],
        ['One-time unlocking transfers (see below)', 'Tax-free rollover to RRSP/RRIF, not a withdrawal'],
      ],
    },
    withdrawalRules: [
      'Once converted to a LIF, Ontario requires you to withdraw at least the RRIF minimum each year, and no more than a maximum set annually by FSRA’s payment formula — roughly 6–7% at age 65, rising with age, unlike a RRIF, which has no maximum.',
      'Ontario allows a one-time transfer of up to 50% of the balance to a regular (unlocked) RRSP or RRIF within 60 days of converting a LIRA to certain LIFs — that unlocked portion then has no maximum withdrawal limit.',
      'Other Ontario unlocking categories exist for shortened life expectancy, small balances (a low-balance threshold indexed annually — roughly $29,840 for 2026 at age 55+), non-residency for 24+ months, and amounts exceeding Income Tax Act maximums.',
    ],
    overContributionPenalty: [
      'Not applicable — LIRAs/LIFs only receive locked-in pension transfers, not ordinary contributions, so there’s no over-contribution scenario in the RRSP/TFSA sense.',
    ],
    whoItsBestFor: [
      'Anyone who left an employer with a defined-contribution or defined-benefit pension and transferred the commuted value out',
      'People who want more investment control than the original pension plan offered, while accepting the locked-in restrictions',
      'Those approaching LIF conversion who should evaluate the 50% one-time unlocking option for added flexibility',
    ],
    interactions: [
      'The 50% unlocking option effectively converts half your locked-in savings into ordinary RRSP/RRIF money — after that transfer, that portion follows all normal RRSP/RRIF rules (including income splitting and no maximum withdrawal).',
      'LIF withdrawals qualify for pension income splitting with a spouse from age 65, the same as RRIF withdrawals.',
      'Because a LIF has both a minimum and maximum, it offers less withdrawal flexibility than a RRIF — some retirees prioritize unlocking what they can specifically to gain that flexibility back.',
    ],
    commonMistakes: [
      'Missing the 60-day window to apply for the 50% one-time unlock at the time of LIF conversion',
      'Assuming locked-in money can be accessed like an RRSP — provincial pension rules, not just CRA rules, govern access',
      'Not checking which province’s pension legislation actually governs the account — it depends on where you worked and earned the pension, not necessarily where you live now',
      'Withdrawing only the minimum without checking the maximum, missing an opportunity to draw more in a lower-income year',
    ],
    whatYouCanHold: [
      'Cash, GICs, mutual funds, ETFs, individual stocks and bonds, and segregated fund contracts, subject to the same locked-in withdrawal restrictions.',
      'A segregated fund LIRA/LIF adds maturity/death benefit guarantees and can allow a named beneficiary, subject to the same locking-in rules that govern the rest of the account.',
    ],
    example:
      'Someone converting a $300,000 LIRA to a LIF at age 65 in Ontario would need to withdraw between roughly the RRIF minimum (~4.00%, about $12,000) and the FSRA maximum (~6–7%, roughly $18,000–$21,000) in that first year.',
    learnMore: [
      {
        label: 'FSRA — Locked-in accounts',
        url: 'https://www.fsrao.ca/consumers/pensions/locked-accounts',
        note: 'Ontario-specific LIF minimum/maximum rules and unlocking options.',
      },
    ],
  },

  {
    slug: 'rdsp',
    name: 'RDSP',
    fullName: 'Registered Disability Savings Plan',
    shortDescription: 'Long-term savings for a person eligible for the Disability Tax Credit, with substantial government matching.',
    photoAlt: 'A father warmly embracing his laughing child in golden sunlight, representing dignified, supportive family care.',
    icon: RDSPIcon,
    order: 8,
    whatItIs: [
      'An RDSP helps a person eligible for the Disability Tax Credit (DTC) save for long-term financial security, with government grants and bonds that can far exceed what the family itself contributes.',
      'The beneficiary must be DTC-eligible, a Canadian resident, and under 60 to open a plan. Contributions can be made by the beneficiary, a family member, or anyone with written permission from the plan holder.',
      'It’s designed to stay open for decades — grants and bonds are only fully retained if the plan isn’t collapsed or the beneficiary doesn’t withdraw for at least 10 years after each grant/bond deposit (the "10-year rule," discussed below).',
    ],
    contributionRules: [
      'Lifetime contribution limit is $200,000 per beneficiary, with no annual maximum.',
      'The Canada Disability Savings Grant (CDSG) matches contributions at 300%, 200%, or 100%, depending on family income, up to $3,500 in grant per year and $70,000 over the beneficiary’s lifetime.',
      'The Canada Disability Savings Bond (CDSB) adds up to $1,000/year with no contribution required, for lower-income families (family net income under roughly $38,237 for 2026), to a lifetime maximum of $20,000.',
      'Families with net income over roughly $117,045 (2026) receive a reduced CDSG rate — 100% matching on the first $1,000 contributed, rather than the higher-tier rates.',
    ],
    taxTreatment: {
      title: 'RDSP tax treatment',
      headers: ['', 'Treatment'],
      rows: [
        ['Contributions', 'Not tax-deductible'],
        ['Grants (CDSG) and bonds (CDSB)', 'Not counted as income when deposited'],
        ['Growth inside the account', 'Tax-deferred'],
        ['Withdrawn contributions', 'Tax-free — return of after-tax money'],
        ['Withdrawn grants, bonds, and growth', 'Taxed in the beneficiary’s hands, usually at little or no tax given typical income levels'],
      ],
    },
    withdrawalRules: [
      'Withdrawals (called "Disability Assistance Payments," DAPs) can be lump-sum or, once the beneficiary turns 60, must include a minimum annual "Lifetime Disability Assistance Payment" (LDAP).',
      'The 10-year rule (Assistance Holdback Amount): if a DAP is made within 10 years of any CDSG/CDSB deposit, the plan must repay $3 of grant/bond for every $1 withdrawn, up to the total grants and bonds received in that 10-year window — a significant penalty for early withdrawal.',
      'The plan must generally be collapsed by December 31 of the year the beneficiary turns 59, if LDAPs haven’t already begun.',
    ],
    overContributionPenalty: [
      'Contributing beyond the $200,000 lifetime limit triggers a 1% per month tax on the excess amount until it’s withdrawn or otherwise resolved.',
    ],
    whoItsBestFor: [
      'Any Disability Tax Credit-eligible person (or their family) planning for long-term financial security',
      'Lower- and middle-income families, who receive the highest CDSG matching rates and are eligible for the CDSB',
      'Families able to commit to a long time horizon — the 10-year holdback rule makes the RDSP poorly suited to short-term savings needs',
    ],
    interactions: [
      'RDSP withdrawals are generally not counted as income for federal income-tested benefits, and in most provinces (including Ontario, under ODSP rules) RDSP assets and withdrawals are treated favourably and don’t reduce provincial disability support payments — a major advantage over other savings vehicles for ODSP recipients.',
      'An RDSP does not affect TFSA or RRSP contribution room — they’re entirely independent.',
      'On the death of an RRSP/RRIF holder, proceeds can in some cases roll over tax-free to a financially dependent child or grandchild’s RDSP, subject to that beneficiary’s own $200,000 lifetime RDSP limit.',
    ],
    commonMistakes: [
      'Withdrawing within 10 years of a grant or bond deposit without understanding the repayment (holdback) consequence',
      'Not applying for the CDSB, incorrectly assuming a bond requires a contribution — it doesn’t',
      'Delaying opening the plan, since the CDSG and CDSB are only paid up to the end of the year the beneficiary turns 49',
      'Not coordinating RDSP withdrawals with ODSP or other provincial disability benefit rules, even though RDSP treatment is generally favourable in Ontario',
    ],
    whatYouCanHold: [
      'Cash, GICs, mutual funds, ETFs, individual stocks and bonds, and segregated fund contracts.',
      'A segregated fund RDSP adds maturity/death benefit guarantees, which can suit families prioritizing capital preservation over the plan’s long, locked-in time horizon.',
    ],
    example:
      'A family with modest income contributing $1,500/year to an RDSP could receive the full 300%/200% tiered CDSG match plus the $1,000/year CDSB, meaning total annual deposits well above $1,500/year from contributions and government support combined, before any investment growth.',
    learnMore: [
      {
        label: 'CRA — Registered Disability Savings Plan (RDSP)',
        url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-disability-savings-plan-rdsp.html',
        note: 'Eligibility, grant/bond matching rates, and the 10-year holdback rule.',
      },
    ],
  },
];

export function getAccountBySlug(slug: string): AccountData | undefined {
  return accounts.find((account) => account.slug === slug);
}
