import {
  SegregatedFundsIcon,
  WholeLifeIcon,
  CriticalIllnessIcon,
  DisabilityIcon,
  TermLifeIcon,
  AnnuitiesIcon,
  MortgageCreditorIcon,
  GroupBenefitsIcon,
  ServiceIconProps,
} from '../components/insurance/ServiceIcons';
import {
  SegregatedFundsDiagram,
  WholeLifeDiagram,
  CriticalIllnessDiagram,
  DisabilityDiagram,
  TermLifeDiagram,
  AnnuitiesDiagram,
  MortgageCreditorDiagram,
  GroupBenefitsDiagram,
} from '../components/insurance/ServiceDiagrams';

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface LearnMoreLink {
  label: string;
  url: string;
  note: string;
}

export interface InsuranceServiceDetail {
  summary: string;
  // 2–3 short, plain-English paragraphs — no unexplained jargon.
  whatItIs: string[];
  // Short bullet list of who the product typically suits.
  whoItsFor: string[];
  comparisonTable: ComparisonTable;
  example: string;
  learnMore: LearnMoreLink[];
}

export interface InsuranceService {
  slug: string;
  name: string;
  shortDescription: string;
  // Card icon (grid) — reused larger, still scroll-gated, as the detail-page hero diagram.
  icon: (props: ServiceIconProps) => JSX.Element;
  // Bigger "visual breakdown" mechanism diagram, shown further down the detail page.
  diagram: () => JSX.Element;
  order: number;
  detail: InsuranceServiceDetail;
}

// Verify this list matches your actual LLQP-authorized products before publishing.
// To reorder or add a service, just add/reorder entries here — the grid and
// detail routes are both generated from this array.
//
// ACHYUT: review every `detail.example` figure and product claim below for
// factual accuracy against your actual licensed product lineup before this
// goes live — they're illustrative placeholders sourced from public insurer
// explainer pages (Sun Life / RBC / Manulife), not a guarantee of your rates.
export const insuranceServices: InsuranceService[] = [
  {
    slug: 'segregated-funds',
    name: 'Segregated Funds',
    shortDescription: 'Market-linked investments with maturity and death benefit guarantees.',
    icon: SegregatedFundsIcon,
    diagram: SegregatedFundsDiagram,
    order: 1,
    detail: {
      summary: 'An investment fund with an insurance-backed guarantee that protects a portion of what you put in.',
      whatItIs: [
        'A segregated fund is an investment contract offered by an insurance company rather than a mutual fund company. Your money is invested in market-linked funds — stocks, bonds, balanced portfolios — much like a mutual fund, but wrapped inside an insurance policy.',
        'That insurance wrapper adds a guarantee: typically 75–100% of the premiums you’ve paid in (net of any withdrawals) are protected at maturity or on death, no matter how the underlying investments perform in between. Because of that added protection, segregated funds generally carry higher fees than comparable mutual funds.',
        'They can also offer potential creditor protection and let you name a beneficiary directly, which may allow the proceeds to bypass probate — features standard mutual funds don’t have.',
      ],
      whoItsFor: [
        'Investors who want market exposure but can’t stomach the idea of losing their principal',
        'Business owners or professionals who value potential creditor protection',
        'Anyone who wants to name a beneficiary directly and potentially bypass probate',
      ],
      comparisonTable: {
        title: 'Segregated funds vs. mutual funds',
        headers: ['', 'Segregated funds', 'Mutual funds'],
        rows: [
          ['Maturity / death guarantee', '75–100% of premiums (net of withdrawals)', 'None'],
          ['Creditor protection', 'Potentially available', 'Not available'],
          ['Beneficiary designation', 'Yes — may bypass probate', 'No — goes through estate'],
          ['Fees', 'Generally higher (pays for the guarantee)', 'Generally lower'],
        ],
      },
      example:
        'An investor depositing $50,000 into a segregated fund with a 75% maturity guarantee is assured at least $37,500 back at maturity — even after a prolonged downturn — while still benefiting from any growth above that floor.',
      learnMore: [
        {
          label: 'Sun Life — Segregated Funds',
          url: 'https://www.sunlife.ca/en/investments/segregated-funds/',
          note: 'Overview of how segregated fund guarantees and fees work.',
        },
        {
          label: 'Manulife — Segregated Funds',
          url: 'https://www.manulife.ca/personal/plan-and-learn/healthy-finances/financial-planning/discover-the-difference-of-segregated-funds.html',
          note: 'Explains how segregated funds differ from mutual funds.',
        },
      ],
    },
  },
  {
    slug: 'whole-life',
    name: 'Whole / Universal Life Insurance',
    shortDescription: 'Permanent coverage that builds cash value alongside lifelong protection.',
    icon: WholeLifeIcon,
    diagram: WholeLifeDiagram,
    order: 2,
    detail: {
      summary: 'Lifelong coverage that builds tax-advantaged cash value you can access while you’re still living.',
      whatItIs: [
        'Whole and universal life are two types of permanent life insurance — coverage that lasts your entire life, as long as premiums are paid, rather than expiring after a fixed term.',
        'With whole life, premiums are fixed and cash value grows on a guaranteed schedule set by the insurer; participating policies may also pay dividends. With universal life, premiums are more flexible and cash-value growth depends on investment options you choose within the policy — a more hands-on approach.',
        'In both cases, part of every premium builds tax-deferred cash value that you can borrow against or withdraw from while you’re alive, on top of the death benefit paid to your beneficiaries.',
      ],
      whoItsFor: [
        'People with a lifelong coverage need — estate planning, final expenses, wealth transfer',
        'Business owners wanting a tax-advantaged way to accumulate savings alongside protection',
        'Anyone who wants predictable premiums (whole life) or more control over investments (universal life)',
      ],
      comparisonTable: {
        title: 'Whole life vs. universal life',
        headers: ['', 'Whole life', 'Universal life'],
        rows: [
          ['Premiums', 'Fixed', 'Flexible'],
          ['Cash value growth', 'Guaranteed schedule (+ possible dividends)', 'Tied to investment options you choose'],
          ['Hands-on involvement', 'Low', 'Higher — you manage the investment component'],
          ['Best for', 'Predictability', 'Control and flexibility'],
        ],
      },
      example:
        'A 35-year-old buying $250,000 of permanent coverage might pay roughly $180–$260/month, with part of every payment building cash value they can access decades later.',
      learnMore: [
        {
          label: 'Sun Life — Whole vs. Universal Life',
          url: 'https://www.sunlife.ca/en/insurance/life/whole-life-vs-universal-life-insurance-whats-the-difference/',
          note: 'Breaks down the difference between whole and universal life.',
        },
        {
          label: 'RBC Insurance — Whole vs. Universal Life',
          url: 'https://www.rbcinsurance.com/en-ca/advice-learning/life-insurance/whole-life-vs-universal-life-insurance/',
          note: 'A second perspective comparing the two permanent life types.',
        },
      ],
    },
  },
  {
    slug: 'critical-illness',
    name: 'Critical Illness Insurance',
    shortDescription: 'A lump-sum payout on diagnosis of a covered illness, easing financial pressure during recovery.',
    icon: CriticalIllnessIcon,
    diagram: CriticalIllnessDiagram,
    order: 3,
    detail: {
      summary: 'A lump sum paid directly to you if you’re diagnosed with a covered serious illness.',
      whatItIs: [
        'Critical illness insurance pays a one-time lump sum if you’re diagnosed with one of the serious illnesses listed in your policy — most commonly cancer, heart attack, and stroke.',
        'Most policies require you to survive a defined period after diagnosis, commonly around 30 days, before the claim pays out. Coverage amounts typically range from about $25,000 up to $4 million, depending on the product and how much you apply for.',
        'The payout goes directly to you, not a hospital or lender, and there’s generally no restriction on how you use it — medical costs, travel for treatment, paying down debt, or simply covering living expenses while you focus on recovery. Tax treatment can vary; a tax professional can confirm how it applies to your situation.',
      ],
      whoItsFor: [
        'Anyone who wants a cash cushion that isn’t tied to being unable to work',
        'People who want funds fast — critical illness pays on diagnosis, not after a waiting period',
        'A useful complement to disability insurance, which covers ongoing income loss instead',
      ],
      comparisonTable: {
        title: 'Critical illness vs. disability insurance',
        headers: ['', 'Critical illness', 'Disability insurance'],
        rows: [
          ['Trigger', 'Diagnosis of a covered illness', 'Inability to work due to illness/injury'],
          ['Payout type', 'One-time lump sum', 'Ongoing monthly income'],
          ['Waiting period', '~30-day survival period', 'Elimination period, commonly 30–180 days'],
          ['Typical coverage', '$25,000–$4,000,000', '~60–80% of income'],
        ],
      },
      example:
        'Someone diagnosed with a covered illness after purchasing $100,000 of critical illness coverage would receive the full $100,000 as a lump sum once the survival period is met — to use however they need.',
      learnMore: [
        {
          label: 'Sun Life — Critical Illness Insurance',
          url: 'https://www.sunlife.ca/en/health/critical-illness-insurance/',
          note: 'Explains what’s typically covered and how claims are paid.',
        },
      ],
    },
  },
  {
    slug: 'disability',
    name: 'Disability Insurance',
    shortDescription: 'Income replacement if illness or injury keeps you from working.',
    icon: DisabilityIcon,
    diagram: DisabilityDiagram,
    order: 4,
    detail: {
      summary: 'Ongoing monthly income if an illness or injury keeps you from working.',
      whatItIs: [
        'Disability insurance replaces part of your income if an illness or injury leaves you unable to work — typically 60–80% of your regular income, paid monthly.',
        'Benefits don’t start immediately. There’s an elimination (waiting) period — commonly between 30 and 180 days — before payments begin, and you choose that waiting period, along with the benefit period, when you set up the policy.',
        'How "disabled" is defined matters a lot: "own occupation" coverage pays out if you can’t do your specific job, even if you could do other work, while "any occupation" coverage only pays if you can’t work in any job you’re reasonably suited for. Own-occupation coverage is more comprehensive and generally costs more.',
      ],
      whoItsFor: [
        'Anyone whose household depends on their employment income',
        'Self-employed individuals and professionals without an employer group plan',
        'People in specialized occupations who want "own occupation" protection',
      ],
      comparisonTable: {
        title: 'Disability insurance — typical structure',
        headers: ['Feature', 'Typical range / detail'],
        rows: [
          ['Income replacement', '~60–80% of pre-disability income'],
          ['Elimination period', '30–180 days (you choose)'],
          ['Definition of disability', '"Own occupation" vs. "any occupation"'],
          ['Benefit period', 'A set term (e.g. 2 or 5 years) or to age 65'],
        ],
      },
      example:
        'Someone earning $70,000/year who becomes unable to work might receive roughly $3,500–$4,500/month in benefits, depending on the replacement percentage and definition of disability chosen — beginning after their elimination period.',
      learnMore: [
        {
          label: 'Sun Life — Disability Insurance',
          url: 'https://www.sunlife.ca/en/health/disability-insurance/',
          note: 'Covers elimination periods and how benefits are structured.',
        },
      ],
    },
  },
  {
    slug: 'term-life',
    name: 'Term Life Insurance',
    shortDescription: 'Affordable coverage for a fixed period, protecting your family’s income and debts.',
    icon: TermLifeIcon,
    diagram: TermLifeDiagram,
    order: 5,
    detail: {
      summary: 'Straightforward, affordable coverage for a set number of years.',
      whatItIs: [
        'Term life insurance provides a death benefit if you pass away during a fixed period — commonly anywhere from 5 to 40 years, depending on the policy.',
        'It has no cash value component, which is why it’s typically the cheapest form of life insurance when you first buy it. That affordability makes it efficient for covering a specific need, like income replacement while children are dependants or a mortgage balance.',
        'Premiums are only guaranteed for the length of the term — renewing afterward means a significant increase, since rates are based on your age at renewal. Many term policies are convertible, meaning you can switch to permanent coverage later without a new medical exam.',
      ],
      whoItsFor: [
        'Parents and homeowners covering a defined period of financial responsibility',
        'Anyone who wants the maximum coverage for the lowest initial premium',
        'People who may want to convert to permanent coverage down the road',
      ],
      comparisonTable: {
        title: 'Term vs. permanent life insurance',
        headers: ['', 'Term life', 'Permanent (whole/universal)'],
        rows: [
          ['Coverage length', 'Fixed term (5–40 years)', 'Lifelong'],
          ['Cash value', 'None', 'Builds over time'],
          ['Initial cost', 'Lower', 'Higher'],
          ['Cost at renewal', 'Rises significantly', 'N/A — premiums structured for life'],
          ['Convertible to permanent', 'Often, within the term', '—'],
        ],
      },
      example:
        'A healthy 35-year-old buying $500,000 of 20-year term coverage might pay roughly $35–$50/month for the length of the term.',
      learnMore: [
        {
          label: 'Sun Life — Term Life Insurance',
          url: 'https://www.sunlife.ca/en/insurance/life/term-life-insurance/',
          note: 'Explains term lengths, renewal, and conversion options.',
        },
        {
          label: 'RBC Insurance — Term Life Insurance',
          url: 'https://www.rbcinsurance.com/en-ca/life-insurance/term-life-insurance/',
          note: 'A second look at how term life pricing and terms work.',
        },
      ],
    },
  },
  {
    slug: 'annuities',
    name: 'Annuities',
    shortDescription: 'Convert savings into a predictable stream of income for retirement.',
    icon: AnnuitiesIcon,
    diagram: AnnuitiesDiagram,
    order: 6,
    detail: {
      summary: 'Converts a lump sum of savings into a guaranteed, predictable income stream.',
      whatItIs: [
        'An annuity is a contract with an insurance company: you hand over a lump sum — often from retirement savings — and in exchange receive a stream of guaranteed income.',
        'A life annuity pays out for as long as you live, protecting you against the risk of outliving your savings. A term-certain annuity instead pays out for a fixed period, regardless of how long you live.',
        'Income can be structured as level (the same amount every payment) or indexed (rising over time to help keep pace with inflation) — a trade-off between simplicity and long-term purchasing power.',
      ],
      whoItsFor: [
        'Retirees who want a guaranteed income floor for essential expenses',
        'People concerned about outliving their retirement savings',
        'Anyone who prefers predictability over flexibility for part of their savings',
      ],
      comparisonTable: {
        title: 'Life annuity vs. term-certain annuity',
        headers: ['', 'Life annuity', 'Term-certain annuity'],
        rows: [
          ['Payment duration', 'For life', 'Fixed period'],
          ['Outliving-savings protection', 'Yes', 'No — payments stop at term end'],
          ['Payment structure options', 'Level or indexed', 'Level or indexed'],
        ],
      },
      example:
        'Converting a $200,000 lump sum into a life annuity might generate roughly $1,000–$1,200/month for life, depending on rates, age, and the payout options chosen.',
      learnMore: [
        {
          label: 'Sun Life — Annuities',
          url: 'https://www.sunlife.ca/en/investments/annuities/',
          note: 'Explains life vs. term-certain annuities and how payouts are set.',
        },
      ],
    },
  },
  {
    slug: 'mortgage-creditor',
    name: 'Mortgage / Creditor Insurance',
    shortDescription: 'Coverage that pays down your mortgage or debts if you pass away or become disabled.',
    icon: MortgageCreditorIcon,
    diagram: MortgageCreditorDiagram,
    order: 7,
    detail: {
      summary: 'Coverage tied to a specific loan, paying it down if you die or become disabled.',
      whatItIs: [
        'Mortgage or creditor insurance is optional coverage tied to a specific loan — most often a mortgage — that pays out if you die and, depending on the product, if you become disabled or critically ill.',
        'The key difference from standalone life insurance: the payout goes directly to the lender to pay down the loan balance, not to a beneficiary you choose. As you pay down the mortgage, the coverage amount typically declines along with the balance, even though premiums often stay level.',
        'Standalone term life insurance, by contrast, pays a fixed amount directly to your named beneficiaries, who can use it to pay off the mortgage or for anything else — offering more flexibility, often for a comparable or lower cost.',
      ],
      whoItsFor: [
        'Homeowners who want the mortgage specifically covered with minimal underwriting',
        'People who want to compare against standalone term life before deciding',
        'Borrowers looking for coverage that’s simple to set up through their lender',
      ],
      comparisonTable: {
        title: 'Mortgage/creditor insurance vs. term life',
        headers: ['', 'Mortgage/creditor insurance', 'Term life insurance'],
        rows: [
          ['Beneficiary', 'Lender', 'Person(s) you choose'],
          ['Coverage amount over time', 'Declines with loan balance', 'Stays level'],
          ['Portability', 'Tied to the specific loan', 'Independent of any loan'],
          ['Underwriting', 'Often simplified', 'Typically full underwriting'],
        ],
      },
      example:
        'A homeowner with a $400,000 mortgage carrying mortgage insurance would see their payout coverage decline over time in step with the loan balance, even as the premium often stays the same.',
      learnMore: [
        {
          label: 'Sun Life — Mortgage Insurance vs. Life Insurance',
          url: 'https://www.sunlife.ca/en/insurance/life/mortgage-insurance-vs-life-insurance/',
          note: 'Compares mortgage insurance directly against standalone life insurance.',
        },
        {
          label: 'RBC Insurance — What Is Creditor Insurance',
          url: 'https://www.rbcinsurance.com/en-ca/advice-learning/creditor-insurance/what-is-creditor-insurance-canada/',
          note: 'A plain-language explainer on how creditor insurance works in Canada.',
        },
      ],
    },
  },
  {
    slug: 'group-benefits',
    name: 'Group / Employee Benefits',
    shortDescription: 'Health, dental, and life coverage plans designed for small business teams.',
    icon: GroupBenefitsIcon,
    diagram: GroupBenefitsDiagram,
    order: 8,
    detail: {
      summary: 'Employer-sponsored health, dental, and life coverage for a team, pooled for better rates.',
      whatItIs: [
        'Group benefit plans let an employer offer health, dental, life, and disability coverage to employees — and often their dependants — under one pooled plan.',
        'Because risk is pooled across the whole group, per-person costs are typically lower and underwriting is simpler than buying the same coverage individually; basic coverage usually doesn’t require a medical exam.',
        'The trade-off is portability: coverage generally ends when you leave the employer, which is why group benefits are often paired with individual coverage — like term life or disability insurance — for protection that stays with you.',
      ],
      whoItsFor: [
        'Small business owners wanting to attract and retain employees with competitive benefits',
        'Employees who want predictable coverage for everyday health and dental needs',
        'Anyone relying on group coverage who should consider pairing it with individual protection',
      ],
      comparisonTable: {
        title: 'Group benefits vs. individual coverage',
        headers: ['', 'Group benefits', 'Individual coverage'],
        rows: [
          ['Underwriting', 'Usually none for basic coverage', 'Full medical underwriting'],
          ['Cost per person', 'Lower (pooled risk)', 'Higher'],
          ['Portability', 'Ends when you leave the employer', 'Stays with you'],
          ['Customization', 'Set by the employer’s plan design', 'Fully customizable'],
        ],
      },
      example:
        'A small business with 10 employees might budget roughly $150–$300 per employee per month for a standard health, dental, and life benefits package, depending on plan design.',
      learnMore: [
        {
          label: 'Sun Life — How Employee Benefit Plans Work',
          url: 'https://www.sunlife.ca/en/group/benefits/how-do-employee-benefit-plans-work/',
          note: 'Explains how group benefit plans are structured and priced.',
        },
      ],
    },
  },
];

export function getInsuranceServiceBySlug(slug: string): InsuranceService | undefined {
  return insuranceServices.find((service) => service.slug === slug);
}

// Homepage / overview stats. Edit these three values directly — they're the
// single source of truth for the count-up counters shown on both pages.
export const insuranceStats = {
  servicesOffered: insuranceServices.length,
  clientsHelped: 3,
  premiumPlaced: 5000,
};

export const insuranceDisclaimer =
  'Actual rates depend on health, age, and underwriting. Contact Achyut for a personalized quote.';
