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

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InsuranceServiceDetail {
  summary: string;
  // 2–3 short, plain-English paragraphs — no unexplained jargon.
  whatItIs: string[];
  // Step by step: application through underwriting, issue, premiums, claim/payout.
  // Key terms are defined inline, at first use, in a sentence.
  howItWorks: string[];
  // What moves the price.
  costFactors: string[];
  // Short bullet list of who the product typically suits.
  whoItsFor: string[];
  comparisonTable: ComparisonTable;
  // Real client questions, 5 to 8 per product.
  faqs: FaqItem[];
  // Practical, advisor-framed cautions.
  watchFor: string[];
  // Full worked walkthrough: who they are, what and why, cost, year 1/10/25,
  // the claim or maturity event, what it means for them. Rounded numbers.
  exampleWalkthrough: string[];
  learnMore: LearnMoreLink[];
  // Segregated funds only: the guarantee/reset/estate-bypass value case.
  advantageNote?: string[];
}

export interface InsuranceService {
  slug: string;
  name: string;
  shortDescription: string;
  // Descriptive alt text for the grid card's photo (public/images/insurance/{slug}.webp).
  photoAlt: string;
  // Card icon (grid) — reused larger, still scroll-gated, as the detail-page hero diagram.
  icon: (props: ServiceIconProps) => JSX.Element;
  // Bigger "visual breakdown" mechanism diagram, shown further down the detail page.
  diagram: () => JSX.Element;
  order: number;
  detail: InsuranceServiceDetail;
}

// A sentence used near the bottom of every product page. Kept in one place
// so the site-wide "independent advisor" positioning stays consistent.
export const independentAdviceNote =
  'Achyut is an independent LLQP-licensed advisor, not a branch representative tied to one company. That means comparing products across insurers for your actual situation, not selling from a single proprietary shelf.';

// Verify this list matches your actual LLQP-authorized products before publishing.
// To reorder or add a service, just add/reorder entries here — the grid and
// detail routes are both generated from this array.
//
// ACHYUT: review every `exampleWalkthrough` figure and product claim below for
// factual accuracy against your actual licensed product lineup before this
// goes live. Sourced from public insurer explainer pages (Sun Life, RBC,
// Manulife, Equitable) and, for the segregated fund guarantee/reset details,
// Equitable's advisor-facing GIF documentation. Not a guarantee of your rates.
export const insuranceServices: InsuranceService[] = [
  {
    slug: 'segregated-funds',
    name: 'Segregated Funds',
    shortDescription: 'Market-linked investments with maturity and death benefit guarantees.',
    photoAlt: 'A calm, considered view of financial planning — reviewing investment growth at a desk.',
    icon: SegregatedFundsIcon,
    diagram: SegregatedFundsDiagram,
    order: 1,
    detail: {
      summary: 'An investment fund with an insurance-backed guarantee that protects a portion of what you put in.',
      whatItIs: [
        'A segregated fund is an investment contract offered by an insurance company rather than a mutual fund company. Your money is invested in market-linked funds, stocks, bonds, balanced portfolios, much like a mutual fund, but wrapped inside an insurance policy.',
        'That insurance wrapper adds a guarantee: typically 75 to 100% of the premiums you have paid in, net of any withdrawals, are protected at maturity or on death, no matter how the underlying investments perform in between. Because of that added protection, segregated funds generally carry higher fees than comparable mutual funds.',
        'They can also offer potential creditor protection and let you name a beneficiary directly, which may allow the proceeds to bypass probate, a feature standard mutual funds do not have.',
      ],
      howItWorks: [
        'You start by choosing a guarantee level. This is the percentage of your deposits protected at maturity and on death. Equitable\'s current lineup offers an Estate Class (75% maturity guarantee, 100% death benefit guarantee) and a Protection Class (100% on both). The higher the guarantee, the higher the fee that pays for it.',
        'Underwriting for a segregated fund contract is light compared to life insurance. Since the contract insures your investment, not your health, most applications are approved with basic identification and suitability questions rather than a medical exam.',
        'Once the contract is issued, you choose which underlying funds to hold, from money market through equity. You can switch between them without triggering the guarantee to reset on its own.',
        'A reset is a request you make, usually once per calendar year, to lock in investment gains as your new guaranteed death benefit. If the market has gone up since you opened the contract, resetting raises your permanent floor. Equitable processes reset requests within five valuation dates and allows them until the annuitant turns 80.',
        'At maturity, typically a date you set decades out, or on death, the insurer pays out the greater of the contract\'s market value or the guaranteed amount. Naming a beneficiary directly on the contract means that payout goes to them outside your estate, skipping probate entirely.',
      ],
      costFactors: [
        'Guarantee level chosen (75/75, 75/100, or 100/100), the single biggest driver of the fee',
        'Underlying fund selected, equity funds generally carry higher management fees than fixed income',
        'Whether resets are used, since some guarantee classes charge slightly more for reset flexibility',
        'Deposit amount and timing, since fees are charged as a percentage (the MER) rather than a flat dollar figure',
      ],
      whoItsFor: [
        'Investors who want market exposure but can’t stomach the idea of losing their principal',
        'Business owners or professionals who value potential creditor protection',
        'Anyone who wants to name a beneficiary directly and potentially bypass probate',
      ],
      comparisonTable: {
        title: 'Segregated funds vs. mutual funds',
        headers: ['', 'Segregated funds', 'Mutual funds', 'What the difference buys you'],
        rows: [
          ['Maturity / death guarantee', '75–100% of premiums (net of withdrawals)', 'None', 'A contractual floor. Your account cannot be worth less than the guarantee, no matter what the market does.'],
          ['Annual resets', 'Available, locks in gains as the new guarantee, to age 80', 'Not applicable', 'Every reset raises your floor permanently. A good year becomes a permanent gain, not just a paper one.'],
          ['Creditor protection', 'Potentially available', 'Not available', 'Meaningful for business owners, incorporated professionals, and the self-employed.'],
          ['Beneficiary designation', 'Yes, may bypass probate', 'No, goes through estate', 'Faster payout to your family and lower estate costs. See the worked example below.'],
          ['Fees', 'Generally higher (pays for the guarantee)', 'Generally lower', 'You are pricing insurance, not just fund management. The comparison below shows what that price buys.'],
        ],
      },
      faqs: [
        {
          question: 'Are segregated funds cheaper than a mutual fund or ETF?',
          answer: 'No, and it would be misleading to say otherwise. Equitable\'s current GIF lineup runs roughly 1.95% to 3.81% MER, generally above a comparable mutual fund. The higher fee is the price of the guarantee, the reset feature, and the estate benefits. If none of those matter to your situation, a lower-cost fund or ETF may be the better fit.',
        },
        {
          question: 'What happens if the market crashes right before maturity?',
          answer: 'Your guarantee still applies. If your contract guarantees 75% of deposits and the market has fallen well below that, you still receive at least 75% of what you put in, net of withdrawals, at the maturity date.',
        },
        {
          question: 'Can I lose the guarantee by switching funds?',
          answer: 'Switching between the funds available inside your contract does not cancel the guarantee. Withdrawing money does reduce the guaranteed amount proportionally, since the guarantee is based on deposits net of withdrawals.',
        },
        {
          question: 'How does the creditor protection actually work?',
          answer: 'When a properly designated beneficiary is in place (typically a spouse, child, grandchild, or parent, under Ontario insurance law), segregated fund assets may fall outside the reach of creditors in a bankruptcy or lawsuit. This is potential, not automatic, and depends on the circumstances and timing of the deposits, so it is worth discussing directly.',
        },
        {
          question: 'Is the death benefit guarantee the same as the maturity guarantee?',
          answer: 'Not always. Equitable\'s Estate Class, for example, guarantees 75% at maturity but 100% on death. Read the specific guarantee level of your contract rather than assuming both numbers match.',
        },
        {
          question: 'What is a reset, and should I do it every year?',
          answer: 'A reset locks in current market gains as your new permanent guarantee. It is usually worth doing after a strong year. It is not always worth doing after a flat or down year, since resetting can extend the maturity date and, on some contracts, slightly increase ongoing fees.',
        },
        {
          question: 'Do I need a medical exam to open a segregated fund contract?',
          answer: 'Generally no. Underwriting is light since the guarantee insures your investment rather than your life, though very large deposits may prompt additional source-of-funds questions.',
        },
      ],
      watchFor: [
        'Fee drag on long, flat markets: the guarantee costs the same whether markets are up or down, so it delivers the most value during volatility and less during a long, calm bull run',
        'Reset timing: resetting locks in gains but can reset the maturity clock, so check the new maturity date before requesting one',
        'Beneficiary designation errors: an outdated or missing beneficiary can send the payout through your estate anyway, defeating the probate-bypass benefit entirely',
        'Contract wording varies by insurer and by guarantee class: confirm the exact guarantee percentage, reset rules, and age-80 cutoff on your specific contract',
      ],
      exampleWalkthrough: [
        'Priya is 45, self-employed, and has just sold a small business interest for $50,000 she does not need for at least 15 years. She is uncomfortable with the idea of a market downturn wiping out a chunk of that money right before she needs it, and as a sole proprietor she is also thinking about creditor exposure.',
        'She chooses an Estate Class segregated fund contract with a 75% maturity guarantee and 100% death benefit guarantee, split across a balanced fund and a Canadian equity fund. The guarantee costs more than a comparable mutual fund would, roughly 2.5% to 3% MER instead of 1.5% to 2%, but Priya decides the floor and the potential creditor protection are worth the difference for money she considers untouchable.',
        'In year 1, her $50,000 is worth $52,000 after a decent year in the markets. She requests a reset, locking in a new guaranteed floor of $39,000 (75% of the higher value) rather than the original $37,500.',
        'By year 10, after resetting twice more during strong years and riding out one downturn without resetting, her guaranteed floor has climbed to roughly $46,000 while her actual market value sits around $71,000.',
        'By year 25, well past her original 15-year horizon, she has extended the contract and reset several more times. Her guaranteed floor is now $58,000, comfortably above her original deposit, and the market value has grown to roughly $118,000.',
        'Priya never needs to rely on the guarantee, since markets cooperated. But she also never lost a night of sleep over a downturn wiping out money she had already earmarked, and on her death the full market value passes directly to her named beneficiary, outside her estate, without probate delay.',
      ],
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
        {
          label: 'Equitable — Segregated Funds',
          url: 'https://www.equitable.ca/products/investments/segregated-funds',
          note: 'The specific segregated fund contracts and guarantee levels Achyut can place.',
        },
        {
          label: 'Equitable — Lock in Gains With Resets',
          url: 'https://www.equitable.ca/products/investments/segregated-funds/grow-your-guarantee-with-resets',
          note: 'How the annual reset feature works and its age-80 limit.',
        },
      ],
      advantageNote: [
        'The fee difference is real, and it is right there in the fund table above. It buys four things a mutual fund or ETF structurally cannot offer: a contractual floor on your principal, the ability to reset that floor higher every year markets cooperate (until age 80), potential creditor protection, and a named-beneficiary payout that bypasses your estate.',
        'That last point has a concrete dollar value in Ontario. Estate Administration Tax runs roughly 1.5% on estate value above $50,000. On a $500,000 portfolio passing through probate, that is about $6,750, plus a settlement process that commonly takes months rather than the weeks a directly-paid beneficiary designation takes.',
        'There is also a behavioural benefit that does not show up in any fee table. The single largest destroyer of retail investment returns is selling at the bottom of a downturn. A contractual floor is one of the few things that reliably keeps an anxious investor holding their allocation through a bad quarter instead of locking in losses.',
        'None of this means a segregated fund is the right fit for every dollar. Money you can afford to leave fully exposed to the market, with no need for creditor protection or probate bypass, is often better served by a lower-fee mutual fund or ETF. This is exactly the kind of decision worth making with an independent advisor rather than defaulting to whatever a single bank branch happens to sell.',
      ],
    },
  },
  {
    slug: 'whole-life',
    name: 'Whole / Universal Life Insurance',
    shortDescription: 'Permanent coverage that builds cash value alongside lifelong protection.',
    photoAlt: 'A multigenerational family together at home, representing lifelong protection and legacy.',
    icon: WholeLifeIcon,
    diagram: WholeLifeDiagram,
    order: 2,
    detail: {
      summary: 'Lifelong coverage that builds tax-advantaged cash value you can access while you’re still living.',
      whatItIs: [
        'Whole and universal life are two types of permanent life insurance, coverage that lasts your entire life, as long as premiums are paid, rather than expiring after a fixed term.',
        'With whole life, premiums are fixed and cash value grows on a guaranteed schedule set by the insurer; participating policies may also pay dividends. With universal life, premiums are more flexible and cash value growth depends on investment options you choose within the policy, a more hands-on approach.',
        'In both cases, part of every premium builds tax-deferred cash value that you can borrow against or withdraw from while you are alive, on top of the death benefit paid to your beneficiaries.',
      ],
      howItWorks: [
        'The application asks about your health, family history, lifestyle, and finances, then the insurer underwrites the policy, meaning they assess how risky you are to insure and set your premium accordingly. Permanent life insurance usually requires more thorough underwriting than term, since the insurer is on the hook for longer.',
        'Once approved, the policy is issued and you name one or more beneficiaries, the people or entities who receive the death benefit. You can change this designation later as your circumstances change.',
        'Every premium payment splits into two parts: the cost of the pure insurance protection, and an amount that builds cash value inside the policy. On a participating whole life policy, the insurer may also declare a dividend scale, its stated annual dividend rate, which can be taken as cash, used to reduce premiums, or left to buy more coverage.',
        'Cash surrender value is what you would receive if you cancelled the policy entirely, generally less than the full cash value in the early years due to surrender charges. You can also borrow against the cash value without cancelling the policy, though an outstanding loan reduces the death benefit if unpaid.',
        'If a policy accumulates enough cash value, some whole life contracts can become paid-up, meaning no further premiums are required for the coverage to stay in force for life.',
        'On death, the insurer pays the death benefit to your named beneficiaries, generally tax-free, usually within a few weeks of receiving the claim and a death certificate.',
      ],
      costFactors: [
        'Age at purchase, since permanent coverage bought younger locks in a lower rate for life',
        'Health and any pre-existing conditions revealed during underwriting',
        'Smoking status, which can roughly double the premium',
        'Coverage amount and whether it is level or increasing',
        'Whole life vs. universal life, and how actively you manage the investment component of a universal policy',
        'Riders selected, such as critical illness or disability waiver of premium',
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
      faqs: [
        {
          question: 'What is the difference between cash value and cash surrender value?',
          answer: 'Cash value is the total amount built up inside the policy. Cash surrender value is what you would actually receive if you cancelled, which is usually less than the full cash value in the early policy years because of surrender charges that decrease over time.',
        },
        {
          question: 'Can I borrow against my policy without cancelling it?',
          answer: 'Yes, most permanent policies allow policy loans against the cash value. Interest applies, and any unpaid loan balance is deducted from the death benefit when you die.',
        },
        {
          question: 'What happens if I stop paying premiums on a whole life policy?',
          answer: 'Depending on how much cash value has built up, the policy may lapse, be reduced to a smaller paid-up amount that requires no further premiums, or use accumulated cash value to keep paying premiums for a time. Ask specifically which option applies to your contract.',
        },
        {
          question: 'Is a dividend on a participating whole life policy guaranteed?',
          answer: 'No. The dividend scale is declared annually by the insurer based on its investment, mortality, and expense experience, and can go up or down. It is not a contractual guarantee the way the base death benefit is.',
        },
        {
          question: 'How is universal life cash value taxed?',
          answer: 'Growth inside the policy is tax-deferred as long as it stays within exempt-policy limits set by the Income Tax Act. Withdrawals may trigger tax on the growth portion. This is worth reviewing with a tax professional alongside your advisor before making withdrawals.',
        },
        {
          question: 'Why is permanent insurance so much more expensive than term?',
          answer: 'Term only covers a fixed period and builds no cash value, so its premiums reflect only the cost of protection during that window. Permanent insurance covers your entire life and builds cash value, so premiums are higher to fund both the lifelong guarantee and the savings component.',
        },
        {
          question: 'Can I convert term insurance to permanent later?',
          answer: 'Many term policies include a conversion privilege allowing you to switch to permanent coverage, often without new medical underwriting, within a specified window. It is worth checking this option before it expires.',
        },
      ],
      watchFor: [
        'Policy lapse risk on universal life: if the investment component underperforms and cash value runs low, you may need to increase premiums to keep the policy from lapsing',
        'Surrender charges: cancelling in the early years can mean receiving significantly less than the stated cash value',
        'Dividend scale changes: a participating policy\'s illustrated growth assumes a dividend scale that can be reduced by the insurer in future years',
        'Loan interest compounding: an unpaid policy loan grows and can eventually exceed the cash value, causing the policy to lapse with a tax consequence',
      ],
      exampleWalkthrough: [
        'David is 35, married with two young children, and runs an incorporated consulting business. Beyond the term coverage he already has for income replacement, he wants something permanent to cover final expenses and eventually help equalize his estate between his children and the business.',
        'He chooses a $250,000 participating whole life policy with fixed premiums of roughly $220 per month. He picks whole life over universal life specifically because he does not want to actively manage an investment component inside the policy.',
        'In year 1, almost all of his premium goes toward the cost of insurance and policy fees; cash value is modest, a few hundred dollars. His $250,000 death benefit is in force from day one regardless.',
        'By year 10, having paid roughly $26,400 in total premiums, his policy has built approximately $18,000 in cash surrender value, boosted slightly by dividends he has chosen to leave inside the policy to buy additional small amounts of coverage.',
        'By year 25, at age 60, his cumulative premiums total roughly $66,000, and his cash surrender value has grown to approximately $95,000 (helped by decades of compounding dividends), while his death benefit has grown modestly above the original $250,000 from the additional paid-up insurance those dividends purchased.',
        'David never needs to access the cash value, and the policy remains in force. When he eventually passes away decades later, his beneficiaries receive the full death benefit tax-free, giving his family liquidity to cover final costs and estate taxes without having to sell shares of the business.',
      ],
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
        {
          label: 'Equitable — Insurance Products',
          url: 'https://www.equitable.ca/products/insurance',
          note: 'Equimax, Equitable Generations™, and EquiLiving — the specific products Achyut can place.',
        },
      ],
    },
  },
  {
    slug: 'critical-illness',
    name: 'Critical Illness Insurance',
    shortDescription: 'A lump-sum payout on diagnosis of a covered illness, easing financial pressure during recovery.',
    photoAlt: 'A bright, hopeful hospital hallway conveying recovery rather than a clinical setting.',
    icon: CriticalIllnessIcon,
    diagram: CriticalIllnessDiagram,
    order: 3,
    detail: {
      summary: 'A lump sum paid directly to you if you’re diagnosed with a covered serious illness.',
      whatItIs: [
        'Critical illness insurance pays a one-time lump sum if you are diagnosed with one of the serious illnesses listed in your policy, most commonly cancer, heart attack, and stroke.',
        'Most policies require you to survive a defined period after diagnosis, commonly around 30 days, called the survival period, before the claim pays out. Coverage amounts typically range from about $25,000 up to $4 million, depending on the product and how much you apply for.',
        'The payout goes directly to you, not a hospital or lender, and there is generally no restriction on how you use it: medical costs, travel for treatment, paying down debt, or simply covering living expenses while you focus on recovery. Tax treatment can vary, so a tax professional can confirm how it applies to your situation.',
      ],
      howItWorks: [
        'The application covers your health history and lifestyle, and underwriting for critical illness coverage is typically similar in depth to life insurance underwriting, since the insurer is assessing your risk of developing a covered condition.',
        'The policy lists specific covered conditions with precise medical definitions. A diagnosis has to meet the exact policy definition, not just a general diagnosis of the same illness, which is why definitions matter more here than in most insurance products.',
        'You can often add a rider, an optional add-on that changes the base coverage, such as a return-of-premium rider that refunds premiums paid if you never make a claim.',
        'If you are diagnosed with a covered illness, you submit a claim with medical documentation. Once the survival period passes and the diagnosis is confirmed against the policy wording, the insurer pays the full lump sum.',
        'Some policies pay a partial benefit for certain less severe conditions and reserve the full benefit for the most serious diagnoses, so it is worth understanding whether your policy has this structure.',
      ],
      costFactors: [
        'Age at application, the biggest single factor',
        'Health history and family history of covered conditions',
        'Smoking status',
        'Coverage amount chosen',
        'Number and type of covered conditions in the policy (broader lists generally cost more)',
        'Riders added, such as return of premium',
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
      faqs: [
        {
          question: 'What illnesses are typically covered?',
          answer: 'Cancer, heart attack, and stroke are the core three found on nearly every policy. Broader policies add conditions like coronary bypass surgery, kidney failure, major organ transplant, blindness, and paralysis, among others. Always check the specific list on your policy.',
        },
        {
          question: 'What is the survival period, and why does it exist?',
          answer: 'It is a defined number of days, commonly around 30, that you must live past diagnosis before the claim pays. It exists so the coverage is genuinely about ongoing survivorship and recovery costs, not a substitute for life insurance.',
        },
        {
          question: 'Is the payout taxable?',
          answer: 'Individually owned critical illness policies are generally structured so the benefit is not considered taxable income, but tax treatment can depend on how premiums were paid and whether the policy is corporately owned. Confirm your specific situation with a tax professional.',
        },
        {
          question: 'Can I get critical illness coverage if a family member had cancer?',
          answer: 'Often yes, family history is one factor among several in underwriting, not an automatic decline. Depending on the specifics, you may still qualify, sometimes with an adjusted premium or a specific condition exclusion.',
        },
        {
          question: 'Does critical illness insurance cover mental health conditions?',
          answer: 'Generally no. Critical illness policies are built around a defined list of physical illnesses and medical events. Mental health related income loss is more typically addressed through disability insurance.',
        },
        {
          question: 'What happens to my premiums if I never get sick?',
          answer: 'On a standard policy, nothing is returned, the premiums simply paid for the coverage during that time, similar to home or auto insurance. A return-of-premium rider can refund some or all premiums at a set point if no claim was made, for an additional cost.',
        },
        {
          question: 'Can I have both critical illness and disability insurance?',
          answer: 'Yes, and many advisors recommend both, since they cover different gaps. Critical illness pays a lump sum fast, on diagnosis, while disability replaces ongoing income if you cannot work, for as long as you remain unable to.',
        },
      ],
      watchFor: [
        'Definition mismatches: a real-world diagnosis has to match the policy\'s precise medical definition, which is narrower than the everyday meaning of the same illness',
        'Survival period timing: a claim can be denied if death occurs before the survival period ends, which is a reason to also carry life insurance',
        'Exclusion periods for pre-existing conditions, common in the first 90 days to two years of a new policy',
        'Coverage gaps between insurers\' condition lists: a condition covered by one insurer\'s policy may not appear on another\'s',
      ],
      exampleWalkthrough: [
        'Fatima is 40, married, and the primary income earner in her household. She already has disability coverage through her employer, but it only replaces 60% of her salary, and she is worried about the immediate, lump-sum costs a serious diagnosis could bring: travel to specialists, home modifications, or simply a financial cushion while her family adjusts.',
        'She applies for $100,000 of critical illness coverage with a policy covering the standard core conditions plus 15 additional illnesses. Her premium, based on her age, non-smoker status, and clean health history, comes to roughly $75 per month.',
        'In year 1, she pays $900 in premiums and makes no claim. Nothing is returned; this is the cost of the coverage being in place.',
        'By year 10, she has paid roughly $9,500 in cumulative premiums (rates increase slightly with age on this policy type) with no claims made, and her coverage remains at $100,000.',
        'In year 12, Fatima is diagnosed with a covered form of cancer. She survives the 30-day survival period and submits her claim with the required medical documentation.',
        'The insurer pays the full $100,000 lump sum directly to her, tax-free under her policy structure. She uses part of it to cover a leave of absence beyond what her disability coverage replaces, part toward specialist travel, and keeps the remainder as a buffer during treatment and recovery, without having to touch her family\'s retirement savings.',
      ],
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
    photoAlt: 'A person in physiotherapy recovery, dignified and actively working toward returning to work.',
    icon: DisabilityIcon,
    diagram: DisabilityDiagram,
    order: 4,
    detail: {
      summary: 'Ongoing monthly income if an illness or injury keeps you from working.',
      whatItIs: [
        'Disability insurance replaces part of your income if an illness or injury leaves you unable to work, typically 60 to 80% of your regular income, paid monthly.',
        'Benefits don\'t start immediately. There is an elimination period, a waiting period commonly between 30 and 180 days, before payments begin, and you choose that waiting period, along with the benefit period, when you set up the policy.',
        'How "disabled" is defined matters a lot: "own occupation" coverage pays out if you can\'t do your specific job, even if you could do other work, while "any occupation" coverage only pays if you can\'t work in any job you\'re reasonably suited for. Own-occupation coverage is more comprehensive and generally costs more.',
      ],
      howItWorks: [
        'The application reviews your occupation, income, health, and lifestyle in detail. Underwriting for disability insurance is thorough, since your occupation itself is a major risk factor, not just your health.',
        'You choose your elimination period, the number of days you must be disabled before benefits start, and your benefit period, how long payments continue, up to a set number of years or to age 65.',
        'You also choose your definition of disability. "Own occupation" and "any occupation" are the two core definitions, and some policies blend them, paying own-occupation-style benefits for an initial period before switching to a stricter any-occupation test.',
        'Riders can modify the base policy. A cost-of-living rider increases your benefit with inflation once claims begin; a future insurability rider lets you increase coverage later without new medical underwriting as your income grows.',
        'If you become unable to work, you file a claim with medical documentation. Once your elimination period passes and the insurer confirms you meet the policy\'s definition of disability, monthly payments begin and continue as long as you remain disabled, up to your benefit period.',
      ],
      costFactors: [
        'Occupation and its associated risk class',
        'Age and health at application',
        'Income level, since benefits are capped as a percentage of income',
        'Elimination period chosen (a longer wait lowers the premium)',
        'Benefit period chosen (to age 65 costs more than a fixed 2 or 5 year period)',
        'Definition of disability selected ("own occupation" costs more than "any occupation")',
        'Riders added, such as cost-of-living adjustment or future insurability',
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
      faqs: [
        {
          question: 'What is the elimination period, exactly?',
          answer: 'It is the waiting period between the start of your disability and the first benefit payment. Choosing a longer elimination period, say 90 days instead of 30, lowers your premium, since you are self-insuring the early weeks.',
        },
        {
          question: 'Why does my occupation matter so much for pricing?',
          answer: 'Insurers classify occupations by risk. A desk-based professional and a tradesperson doing physical labour face very different odds of a disabling injury, and pricing reflects that directly.',
        },
        {
          question: 'What is "own occupation" coverage worth the extra cost?',
          answer: 'For specialized professionals, often yes. It means you can be paid a disability benefit even if you could technically still work in a different, lower-paying field, because you cannot perform your specific occupation. That distinction matters most for surgeons, dentists, and other highly trained specialists.',
        },
        {
          question: 'Does my employer group disability plan cover enough?',
          answer: 'Often not entirely. Group plans typically max out around 60 to 66% of income, are usually taxable if your employer paid the premiums, and coverage ends if you leave the job. Many people supplement with an individual policy for the gap.',
        },
        {
          question: 'Can my premiums or benefits change after the policy is issued?',
          answer: 'A non-cancellable policy locks in your premium and terms for a stated period. A guaranteed renewable policy guarantees you can keep the coverage but the insurer can adjust rates for the whole risk class over time. Confirm which type you are buying.',
        },
        {
          question: 'What counts as a partial or residual disability?',
          answer: 'Many policies pay a reduced, proportional benefit if you can work part-time or in a limited capacity but your income has dropped due to the disability, rather than requiring total inability to work.',
        },
        {
          question: 'Is disability insurance worth it if I have savings?',
          answer: 'For most people, savings cover months, not years. A serious disability lasting years can exhaust an emergency fund quickly, especially with ongoing living costs and no income. Disability insurance is designed for exactly that longer-tail risk.',
        },
      ],
      watchFor: [
        'Definition creep at renewal: some policies shift from "own occupation" to "any occupation" after a set number of years on claim, reducing your protection partway through',
        'Mental health and chronic pain claim limits: some contracts cap benefit duration for these conditions differently than physical injuries',
        'Taxable vs. non-taxable benefits: if your employer paid group premiums, the benefit is usually taxable; if you paid the premiums personally, it usually is not',
        'Coverage gaps when self-employed income fluctuates, since insurers base your benefit on a defined income history that can be harder to document',
      ],
      exampleWalkthrough: [
        'Marcus is 32, a self-employed electrician earning roughly $85,000 a year, with no employer group plan to fall back on. His trade is physically demanding, so he is specifically concerned about an injury, not just illness, ending his ability to work.',
        'He applies for a policy replacing 65% of his income, about $4,600 per month, with a 90-day elimination period and an "own occupation" definition for the first two years, switching to "any occupation" after that. His premium comes to roughly $180 per month.',
        'In year 1, he pays about $2,160 in premiums and has no claim. His coverage is in force the entire time.',
        'By year 10, having paid roughly $21,600 in cumulative premiums with no claims, he has also added a future insurability rider along the way, increasing his benefit to keep pace as his income grew.',
        'In year 14, Marcus injures his back on a job site and cannot perform electrical work. He files a claim, and after his 90-day elimination period, his benefit begins.',
        'For the next 18 months, he receives roughly $5,200 per month (reflecting the coverage increases from his future insurability rider) while he cannot work, covering his mortgage, family expenses, and physiotherapy costs. He eventually recovers enough to return to modified work, and his benefit adjusts down as his own income resumes, rather than stopping abruptly.',
      ],
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
    photoAlt: 'Parents and children together outdoors, representing a family’s forward-looking life stage.',
    icon: TermLifeIcon,
    diagram: TermLifeDiagram,
    order: 5,
    detail: {
      summary: 'Straightforward, affordable coverage for a set number of years.',
      whatItIs: [
        'Term life insurance provides a death benefit if you pass away during a fixed period, commonly anywhere from 5 to 40 years, depending on the policy.',
        'It has no cash value component, which is why it is typically the cheapest form of life insurance when you first buy it. That affordability makes it efficient for covering a specific need, like income replacement while children are dependants or a mortgage balance.',
        'Premiums are only guaranteed for the length of the term. Renewing afterward means a significant increase, since rates are based on your age at renewal. Many term policies are convertible, meaning you can switch to permanent coverage later without a new medical exam.',
      ],
      howItWorks: [
        'The application collects your health history, lifestyle, and the coverage amount you want, then the insurer underwrites the policy, sometimes with a paramedical exam (basic vitals, blood, and urine tests), sometimes fully digitally for smaller amounts.',
        'You choose your term length and your coverage amount, then the insurer quotes a premium, the amount you pay, usually monthly or annually, fixed for the entire term.',
        'You name one or more beneficiaries, who can be changed at any point during the policy without needing to requalify medically.',
        'Every premium you pay during the term goes entirely toward the cost of the insurance protection itself, since there is no cash value component to fund.',
        'If you pass away during the term, your beneficiaries file a claim with a death certificate, and the insurer pays the full death benefit, generally tax-free, typically within a few weeks.',
        'If the term ends and you are still alive, coverage simply expires unless you renew (usually at a much higher rate reflecting your current age) or convert to a permanent policy, if your contract includes that conversion privilege.',
      ],
      costFactors: [
        'Age at purchase, the single largest factor',
        'Health history and any medications or conditions',
        'Smoking or vaping status',
        'Coverage amount requested',
        'Term length chosen (a 30-year term costs more per year than a 10-year term for the same coverage)',
        'Riders selected, such as a conversion privilege or accidental death benefit',
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
      faqs: [
        {
          question: 'How much term life coverage do I actually need?',
          answer: 'A common starting point is 7 to 10 times your annual income, adjusted for outstanding debts like a mortgage, remaining years of dependant support, and any existing coverage through work. It is worth calculating your specific number rather than guessing.',
        },
        {
          question: 'What happens when my term ends?',
          answer: 'You can let it lapse if you no longer need coverage, renew at a new (usually much higher) premium based on your age at renewal, or convert to a permanent policy if your contract has a conversion privilege, which locks in coverage without new medical underwriting.',
        },
        {
          question: 'Is a medical exam always required?',
          answer: 'Not always. Many insurers now offer simplified or fully digital underwriting for smaller coverage amounts, using data checks instead of a paramedical exam. Larger coverage amounts typically still require one.',
        },
        {
          question: 'Can I have more than one term life policy?',
          answer: 'Yes. Some people layer a longer, smaller policy over their mortgage term with a shorter, larger policy that expires once children are financially independent, which can be more cost-efficient than one large policy sized for the whole period.',
        },
        {
          question: 'Is the death benefit taxable?',
          answer: 'Generally no. Life insurance death benefits paid to a named beneficiary in Canada are typically received tax-free.',
        },
        {
          question: 'What if I develop a health condition partway through my term?',
          answer: 'Your premium is locked in for the length of the term regardless of health changes during that period. A new health condition only affects pricing if you apply for new or additional coverage later.',
        },
        {
          question: 'Should I choose a 10, 20, or 30-year term?',
          answer: 'Match it to the length of the obligation. A 25-year mortgage suggests a 20 to 25-year term; supporting young children through their dependant years might suggest 20 to 25 years as well. It is common to combine terms of different lengths for different needs.',
        },
        {
          question: 'Why did my renewal quote jump so much?',
          answer: 'Renewal rates are based on your age at the time of renewal, not your original age, and no longer include the risk-pooling discount of a fresh multi-year term. This is exactly why converting to permanent coverage, or applying for a new term policy while you still qualify medically, is usually cheaper than simply renewing.',
        },
      ],
      watchFor: [
        'Renewal sticker shock: know your renewal rate before you need it, since it is usually printed in your policy contract, and plan ahead rather than being surprised',
        'Conversion window expiry: conversion privileges often close by a certain age or number of years into the term, so check the deadline if you think you might want permanent coverage later',
        'Coverage gaps from underinsuring to save on premium: a policy sized too small to fully cover debts and income replacement can leave a shortfall exactly when it matters most',
        'Lapse risk from missed payments: a missed premium payment can lapse the policy, sometimes requiring new underwriting to reinstate, which is a real risk if health has changed since the original approval',
      ],
      exampleWalkthrough: [
        'Aisha and Tom are both 35, just bought a home with a $500,000 mortgage, and have two young children. They want to make sure that if either of them died unexpectedly, the surviving spouse would not need to sell the house or dramatically change the children\'s lives.',
        'Each buys a $500,000, 20-year term policy. As healthy non-smokers, their premiums come to roughly $35 to $50 per month each, based on the rounded figures typical for this age and coverage amount.',
        'In year 1, they have paid roughly $500 to $600 each in premiums, with full $500,000 coverage in force for both of them from day one.',
        'By year 10, they have each paid roughly $5,000 to $6,000 in cumulative premiums. Their mortgage balance has fallen to around $350,000, so their coverage now comfortably exceeds their remaining debt, with room left over for income replacement.',
        'By year 20, at the end of the term, they have paid a combined total of roughly $16,800 to $24,000 across both policies over two decades. Their mortgage is nearly paid off and their children are financially independent adults, so they let both policies expire rather than renewing at the much higher age-55 rate.',
        'The coverage did its job during the years it mattered most: if either of them had passed away at any point during that 20-year window, the surviving spouse would have received the full $500,000, enough to pay off the mortgage entirely and provide years of income replacement, without having to uproot the family.',
      ],
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
    photoAlt: 'A retired couple walking together, calm and secure in retirement.',
    icon: AnnuitiesIcon,
    diagram: AnnuitiesDiagram,
    order: 6,
    detail: {
      summary: 'Converts a lump sum of savings into a guaranteed, predictable income stream.',
      whatItIs: [
        'An annuity is a contract with an insurance company: you hand over a lump sum, often from retirement savings, and in exchange receive a stream of guaranteed income.',
        'A life annuity pays out for as long as you live, protecting you against the risk of outliving your savings. A term-certain annuity instead pays out for a fixed period, regardless of how long you live.',
        'Income can be structured as level (the same amount every payment) or indexed (rising over time to help keep pace with inflation), a trade-off between simplicity and long-term purchasing power.',
      ],
      howItWorks: [
        'You choose the amount to annuitize, the lump sum you are converting into income, and the type of annuity: life or term-certain. This decision is generally permanent, so it is worth only annuitizing money you are confident you will not need as a lump sum again.',
        'Underwriting for a standard annuity is minimal, since the insurer is not taking on mortality risk in the way life insurance does. Some insurers offer enhanced payouts if health information reveals a shorter life expectancy, since the insurer expects to pay for fewer years.',
        'You select payment options: level or indexed income, and whether to add a guarantee period (payments continue to a beneficiary for a minimum number of years even if you die early) or joint coverage (payments continue to a surviving spouse).',
        'Once the contract is issued, you receive scheduled payments, monthly, quarterly, or annually, for the life of the contract. This income is generally partly taxable and partly a tax-free return of your original capital, depending on how the annuity is structured and whether it was purchased with registered or non-registered funds.',
        'On a life annuity, payments simply continue for as long as you live, with no further action required. On a term-certain annuity, payments stop once the fixed term ends.',
      ],
      costFactors: [
        'Your age and sex at purchase, since payout rates are calculated on life expectancy',
        'Prevailing interest rates at the time of purchase, which directly set annuity payout rates',
        'Life annuity vs. term-certain, and the length of any term chosen',
        'Level vs. indexed payments (indexed starts lower but rises over time)',
        'Guarantee period or joint coverage added, which reduces the payout in exchange for the added protection',
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
      faqs: [
        {
          question: 'What happens to my money if I die shortly after buying a life annuity?',
          answer: 'Without a guarantee period, the payments simply stop and no further amount is paid to your estate, which is the trade-off for the higher payout rate. Adding a guarantee period, commonly 10 or 15 years, ensures payments continue to a beneficiary for at least that long, for a somewhat lower monthly amount.',
        },
        {
          question: 'Can I get my lump sum back after buying an annuity?',
          answer: 'Generally no. Annuitizing is typically an irreversible decision, which is why it is worth only converting money you are confident you will not need as a lump sum again, and keeping other savings liquid.',
        },
        {
          question: 'Why do annuity payout rates change so much over time?',
          answer: 'Payout rates are closely tied to prevailing interest rates when the contract is purchased. Higher rates generally mean higher annuity payouts, and vice versa, which is why timing purchases around rate environments matters to some retirees.',
        },
        {
          question: 'Is annuity income taxed the same as other retirement income?',
          answer: 'It depends on the source of funds. An annuity purchased with registered money (like an RRSP) is generally fully taxable as income. One purchased with non-registered savings is often partly taxable and partly a tax-free return of capital. Confirm the specific tax treatment with a tax professional.',
        },
        {
          question: 'What is a joint life annuity?',
          answer: 'It continues paying, often at a reduced amount, to a surviving spouse after the first annuitant dies, rather than stopping. It is a common choice for couples wanting to ensure the survivor keeps a guaranteed income floor.',
        },
        {
          question: 'Can I buy an annuity with only part of my retirement savings?',
          answer: 'Yes, and many retirees do exactly this: annuitizing a portion to cover essential fixed expenses while keeping the rest invested and flexible for discretionary spending and emergencies.',
        },
      ],
      watchFor: [
        'Irreversibility: annuitizing locks in the decision, so consider annuitizing only a portion of your savings rather than the full amount',
        'Inflation erosion on level payments: a level annuity\'s purchasing power declines over a long retirement unless you choose the indexed option, which starts lower',
        'Interest rate timing: since payout rates track prevailing rates at purchase, some retirees stagger annuity purchases over several years rather than committing a lump sum at a single point in time',
        'No liquidity for emergencies: once converted, that capital is no longer available as a lump sum for unexpected large expenses',
      ],
      exampleWalkthrough: [
        'Robert is 65, recently retired, with $400,000 in savings split across registered and non-registered accounts. He wants to be certain his essential monthly expenses, roughly $2,000, are covered no matter how long he lives or how markets behave, while keeping the rest of his savings invested for flexibility and larger discretionary spending.',
        'He annuitizes $200,000 into a joint life annuity with his wife, ensuring payments continue to her if he predeceases her, choosing a level (non-indexed) payment structure for simplicity.',
        'In year 1, he begins receiving roughly $1,100 per month, or about $13,200 for the year, guaranteed regardless of what markets do with his remaining $200,000.',
        'By year 10, he has received roughly $132,000 in cumulative annuity payments. His remaining invested savings have grown and shrunk with markets along the way, but his essential monthly expenses have never been at risk, since the annuity income kept flowing every single month.',
        'By year 25, at age 90, he has received roughly $330,000 in cumulative payments, well beyond his original $200,000 lump sum, since the annuity has simply kept paying for as long as he has lived. His invested savings have been drawn down more carefully over the decades, knowing the essential expenses were always covered separately.',
        'When Robert eventually passes away, his wife\'s joint annuity payments continue uninterrupted, ensuring she is never without that guaranteed income floor, exactly as the couple planned when they set up the contract at 65.',
      ],
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
    photoAlt: 'The exterior of a Canadian home, representing the residential mortgage this coverage protects.',
    icon: MortgageCreditorIcon,
    diagram: MortgageCreditorDiagram,
    order: 7,
    detail: {
      summary: 'Coverage tied to a specific loan, paying it down if you die or become disabled.',
      whatItIs: [
        'Mortgage or creditor insurance is optional coverage tied to a specific loan, most often a mortgage, that pays out if you die and, depending on the product, if you become disabled or critically ill.',
        'The key difference from standalone life insurance: the payout goes directly to the lender to pay down the loan balance, not to a beneficiary you choose. As you pay down the mortgage, the coverage amount typically declines along with the balance, even though premiums often stay level.',
        'Standalone term life insurance, by contrast, pays a fixed amount directly to your named beneficiaries, who can use it to pay off the mortgage or for anything else, offering more flexibility, often for a comparable or lower cost.',
      ],
      howItWorks: [
        'Mortgage or creditor insurance is usually offered by the lender at the time you sign for the loan. Underwriting is often simplified, sometimes just a health questionnaire, with the actual medical review happening only if a claim is made, which is called post-claim underwriting.',
        'There is no individual policy contract in your name in the same way as standalone life insurance; instead, you are added to (or covered under) a group policy the lender holds, and the lender itself is the beneficiary.',
        'Premiums are typically charged as a percentage of your remaining balance or a flat monthly cost added to your mortgage payment. As your balance declines through regular payments, your coverage amount declines with it, even if the premium you pay does not fall at the same rate.',
        'If you pass away or, on some products, become disabled or critically ill, a claim is filed with the lender. Because underwriting often happens at the claim stage rather than at application, this is when your health history is most closely reviewed, which can lead to claim denials that would not happen with standalone insurance underwritten upfront.',
        'If approved, the payout goes directly to the lender to reduce or eliminate the mortgage balance. It does not pass to your family as cash they control.',
      ],
      costFactors: [
        'Your outstanding mortgage balance',
        'Age at the time coverage begins',
        'Health disclosed on the simplified application',
        'Whether disability or critical illness coverage is bundled in, in addition to life coverage',
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
          ['Underwriting', 'Often simplified, at claim time', 'Typically full underwriting, upfront'],
        ],
      },
      faqs: [
        {
          question: 'Why would my claim get denied if I already had the coverage approved?',
          answer: 'Because underwriting on many creditor insurance products happens at the time of claim rather than at the time of application, a health condition not disclosed accurately on the original simplified questionnaire can surface during the claim review and lead to a denial, even years into making payments.',
        },
        {
          question: 'What happens to my coverage if I switch lenders or renew my mortgage?',
          answer: 'Mortgage insurance is typically tied to the specific loan with that specific lender. Switching lenders usually means reapplying for new coverage, potentially at a new premium reflecting your current age and health.',
        },
        {
          question: 'Is mortgage insurance the same thing as mortgage default insurance?',
          answer: 'No, these are different products. Mortgage default insurance (like CMHC insurance) protects the lender if you default on payments due to financial hardship. Mortgage life or creditor insurance pays out on death, disability, or critical illness, protecting your family from being left with the debt.',
        },
        {
          question: 'Can I use term life insurance instead of mortgage insurance?',
          answer: 'Yes, and it is worth comparing directly. A term life policy sized to your mortgage balance often costs a similar amount, pays a fixed amount rather than a declining one, and gives your beneficiaries the flexibility to use the funds however they choose, not only to pay off the mortgage.',
        },
        {
          question: 'Does my premium decrease as my mortgage balance goes down?',
          answer: 'Not always. Some creditor insurance products keep the premium level even as the payout amount declines with your balance, meaning you pay the same for shrinking coverage over time. Check your specific product\'s structure.',
        },
        {
          question: 'Can I get mortgage insurance without going through my lender?',
          answer: 'The coverage itself is tied to the specific loan and is generally arranged through the lender at closing, but you are not obligated to buy it there. An independent advisor can quote standalone term life insurance sized to the same balance for comparison before you commit.',
        },
      ],
      watchFor: [
        'Post-claim underwriting risk: since health review sometimes happens only when a claim is filed, be scrupulously accurate on the original application questionnaire',
        'Declining coverage with level premiums: confirm whether your specific product reduces the premium as the balance declines, or keeps charging the same amount for less coverage',
        'Loss of coverage when switching lenders: mortgage insurance does not automatically transfer, unlike a standalone term policy that stays in force regardless of who holds your mortgage',
        'No flexibility in payout use: the funds go straight to the lender, so if your family\'s priority in a crisis is something other than the mortgage, mortgage insurance cannot help with that',
      ],
      exampleWalkthrough: [
        'James and Linda, both 38, just bought a home with a $400,000 mortgage. At closing, the lender offers mortgage life insurance for roughly $65 per month combined, covering both of them, and they are deciding whether to take it or arrange their own term life insurance instead.',
        'They compare it against a $400,000, 25-year term life policy for each of them and find the standalone term insurance costs roughly the same combined monthly premium, but pays a level amount directly to whichever of them survives, rather than a declining amount paid to the bank.',
        'They choose standalone term life. In year 1, they pay roughly $780 combined in premiums, with $400,000 of coverage each, level and fully underwritten upfront rather than at claim time.',
        'By year 10, they have paid roughly $7,800 combined in premiums. Their mortgage balance has fallen to around $310,000, but their term life coverage has stayed at the full $400,000 each, giving them a real cushion beyond just the mortgage.',
        'By year 25, at the end of the mortgage amortization, they have paid a combined total of roughly $19,500 over the full term. Their mortgage is paid off, and their term coverage, having served its purpose, is allowed to expire.',
        'Had James passed away at any point during those 25 years, Linda would have received the full $400,000 directly, with complete flexibility to pay off the remaining mortgage and still have funds left over, rather than a declining, lender-controlled payout that shrinks the longer the mortgage is held.',
      ],
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
    photoAlt: 'A diverse small-business team collaborating together in an office.',
    icon: GroupBenefitsIcon,
    diagram: GroupBenefitsDiagram,
    order: 8,
    detail: {
      summary: 'Employer-sponsored health, dental, and life coverage for a team, pooled for better rates.',
      whatItIs: [
        'Group benefit plans let an employer offer health, dental, life, and disability coverage to employees, and often their dependants, under one pooled plan.',
        'Because risk is pooled across the whole group, per-person costs are typically lower and underwriting is simpler than buying the same coverage individually; basic coverage usually doesn\'t require a medical exam.',
        'The trade-off is portability: coverage generally ends when you leave the employer, which is why group benefits are often paired with individual coverage, like term life or disability insurance, for protection that stays with you.',
      ],
      howItWorks: [
        'A business owner works with an advisor to design a plan: which benefit categories to include (health, dental, life, disability), what coverage levels, and what portion of premiums the employer covers versus employees.',
        'The insurer underwrites the group as a whole rather than each individual, called pooled underwriting. This is why most employees can enroll in basic coverage without a personal medical exam, since the insurer\'s risk is spread across everyone in the plan.',
        'Employees enroll during a set enrollment window, choosing coverage tiers if the plan offers them, and naming beneficiaries for any life insurance component.',
        'Premiums are billed to the employer, who may deduct the employee-paid portion directly from payroll. Claims for eligible expenses (dental cleanings, prescription drugs, paramedical services like physiotherapy) are submitted to the insurer for reimbursement, often electronically at the point of service.',
        'If an employee leaves the company, their coverage under the group plan typically ends on their last day or shortly after, though some plans include a conversion privilege allowing a departing employee to convert a portion of their group life coverage to an individual policy without new underwriting.',
      ],
      costFactors: [
        'Size of the group, since larger groups generally get better pooled rates',
        'Industry and claims history of the group over time',
        'Which benefit categories are included and at what coverage level',
        'Employer vs. employee cost-sharing structure chosen',
        'Whether disability coverage is included, which typically costs more than health and dental alone',
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
      faqs: [
        {
          question: 'How much does a group benefits plan typically cost a small business?',
          answer: 'It varies widely by group size, industry, and coverage level, but small businesses commonly budget roughly $150 to $300 per employee per month for a standard health, dental, and life package. An advisor can quote your specific group.',
        },
        {
          question: 'Can we start a group plan with just a few employees?',
          answer: 'Yes, though very small groups (sometimes under 3 to 5 employees, depending on the insurer) may face different underwriting rules or minimum participation requirements than larger groups. It is worth discussing your specific headcount with an advisor.',
        },
        {
          question: 'What happens to an employee\'s coverage if they go on leave?',
          answer: 'This depends on the plan design and the type of leave. Many plans continue coverage during a standard maternity or parental leave, sometimes with the employer continuing to pay premiums, but rules vary and are worth confirming in the plan documents.',
        },
        {
          question: 'Do all employees have to be offered the same coverage?',
          answer: 'Plans can often be structured with different coverage tiers or classes, for example, differentiating full-time from part-time employees, but within a class, coverage generally needs to be applied consistently to avoid running afoul of insurer and human rights requirements.',
        },
        {
          question: 'Is group life insurance enough, or do employees need their own policy too?',
          answer: 'Group life coverage is often a modest, flat amount or a multiple of salary, frequently less than what a family actually needs for full income replacement. Many employees supplement it with an individual term life policy sized to their real needs.',
        },
        {
          question: 'Can premiums change year to year?',
          answer: 'Yes. Group plans are typically renewed annually, and premiums can rise based on the group\'s claims experience, insurer-wide trend increases, or changes to the plan design.',
        },
      ],
      watchFor: [
        'Coverage cliff on termination: group coverage often ends abruptly when employment ends, so departing employees should act quickly on any conversion privilege before it expires',
        'Modest default life and disability amounts: group defaults are frequently insufficient on their own for a family\'s full income replacement needs',
        'Claims history driving future premiums: a plan with heavy claims usage can see meaningful premium increases at renewal, which is worth understanding when designing the plan',
        'Inconsistent benefit application across employee classes, which can create fairness concerns and, in some cases, legal exposure',
      ],
      exampleWalkthrough: [
        'Sarah owns a marketing agency with 8 employees and wants to offer competitive benefits to help retain her small team, several of whom have young families and have mentioned dental and health coverage as a priority.',
        'She works with an advisor to design a plan including health, dental, and a modest $25,000 group life benefit per employee, with the company covering 75% of premiums and employees covering the remaining 25% through payroll deduction.',
        'In year 1, the plan costs the business roughly $18,000 in premiums across all 8 employees (about $2,250 per employee annually, split per the cost-sharing structure), and claims usage is moderate, mostly routine dental and prescription costs.',
        'By year 3, the team has grown to 12 employees, and the plan\'s pooled rate has become more favourable with the larger group size, even as one employee\'s ongoing physiotherapy claims push usage slightly above average for that person.',
        'By year 5, the plan renews with a modest premium increase reflecting both the group\'s claims experience and general cost trends, and Sarah decides to add a basic disability benefit category, having seen how valuable the health and dental coverage has been for retention.',
        'One employee leaves the company in year 6 and uses the plan\'s conversion privilege to convert a portion of their $25,000 group life coverage into an individual policy within the required window, preserving some coverage without new medical underwriting despite losing the group plan on their last day.',
      ],
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
