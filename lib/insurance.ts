export interface InsuranceProduct {
  id: string;
  title: string;
  description: string;
}

// Categories drawn from an Ontario LLQP (Life License Qualification Program) license.
// Verify this list matches your actual authorized products before publishing.
export const insuranceProducts: InsuranceProduct[] = [
  {
    id: 'term-life',
    title: 'Term Life Insurance',
    description: 'Affordable coverage for a fixed period, protecting your family’s income and debts.',
  },
  {
    id: 'whole-life',
    title: 'Whole / Universal Life Insurance',
    description: 'Permanent coverage that builds cash value alongside lifelong protection.',
  },
  {
    id: 'critical-illness',
    title: 'Critical Illness Insurance',
    description: 'A lump-sum payout on diagnosis of a covered illness, easing financial pressure during recovery.',
  },
  {
    id: 'disability',
    title: 'Disability Insurance',
    description: 'Income replacement if illness or injury keeps you from working.',
  },
  {
    id: 'segregated-funds',
    title: 'Segregated Fund Investments',
    description: 'Market-linked investments with maturity and death benefit guarantees.',
  },
  {
    id: 'annuities',
    title: 'Annuities',
    description: 'Convert savings into a predictable stream of income for retirement.',
  },
  {
    id: 'mortgage-creditor',
    title: 'Mortgage / Creditor Insurance',
    description: 'Coverage that pays down your mortgage or debts if you pass away or become disabled.',
  },
  {
    id: 'group-benefits',
    title: 'Group / Employee Benefits',
    description: 'Health, dental, and life coverage plans designed for small business teams.',
  },
];

// Placeholder figures — replace with real numbers before publishing.
export const insuranceStats = {
  servicesOffered: 10,
  clientsHelped: 3,
  premiumPlaced: 5000,
};
