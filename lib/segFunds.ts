export interface FundRow {
  name: string;
  category: string;
  risk?: string;
  mer: string;
  r1y: string;
  r3y: string;
  r5y: string;
  r10y: string;
  si?: boolean;
  index?: boolean;
}

// Sourced from https://equitablelife.fundata.com/ — data as of the date below.
// This is a REPRESENTATIVE SUBSET (one MER series per fund; MER varies by the
// guarantee level chosen — 75/75, 75/100, or 100/100 — at the contract level,
// not shown per-row here) spanning every asset class and risk band, not the
// full several-hundred-row lineup. Re-pull from the live tool and update the
// as-of date before publishing; MERs and returns change.
export const fundDataAsOf = 'June 30, 2026';

const RISK = {
  low: 'Low',
  lowMed: 'Low to Medium',
  med: 'Medium',
  medHigh: 'Medium to High',
  high: 'High',
};

export const segregatedFunds: FundRow[] = [
  { name: 'Equitable Money Market', category: 'Canadian Money Market', risk: RISK.med, mer: '1.49%', r1y: '1.5%', r3y: '2.6%', r5y: '2.1%', r10y: '1.1%' },
  { name: 'Equitable Bond', category: 'Canadian Fixed Income', risk: RISK.med, mer: '2.11%', r1y: '1.6%', r3y: '2.6%', r5y: '-1.0%', r10y: '0.0%' },
  { name: 'Equitable Vanguard Canadian Aggregate Bond Index ETF', category: 'Canadian Fixed Income', risk: RISK.medHigh, mer: '2.02%', r1y: '2.0%', r3y: '2.5%', r5y: '-1.1%', r10y: '-0.3%', index: true },
  { name: 'Equitable Mackenzie Income', category: 'Canadian Fixed Income Balanced', risk: RISK.medHigh, mer: '2.87%', r1y: '8.1%', r3y: '7.0%', r5y: '2.5%', r10y: '2.9%' },
  { name: 'Equitable Canoe Enhanced Income', category: 'Canadian Fixed Income Balanced', risk: RISK.medHigh, mer: '2.58%', r1y: '5.4%', r3y: '6.5%', r5y: '3.2%', r10y: '3.2%' },
  { name: 'Equitable Franklin Quotential Balanced Income Portfolio', category: 'Global Fixed Income Balanced', risk: RISK.low, mer: '2.84%', r1y: '10.8%', r3y: '8.5%', r5y: '3.4%', r10y: '3.6%' },
  { name: 'Equitable Balanced', category: 'Global Neutral Balanced', risk: RISK.lowMed, mer: '2.45%', r1y: '14.8%', r3y: '10.8%', r5y: '5.6%', r10y: '5.0%' },
  { name: 'Equitable MFS Balanced', category: 'Global Neutral Balanced', risk: RISK.med, mer: '2.89%', r1y: '12.8%', r3y: '11.1%', r5y: '5.6%', r10y: '6.0%' },
  { name: 'Equitable Franklin Quotential Balanced Growth Portfolio', category: 'Global Neutral Balanced', risk: RISK.low, mer: '2.91%', r1y: '15.7%', r3y: '11.7%', r5y: '5.8%', r10y: '5.6%' },
  { name: 'Equitable Income', category: 'Canadian Neutral Balanced', risk: RISK.medHigh, mer: '2.45%', r1y: '12.0%', r3y: '9.7%', r5y: '4.6%', r10y: '4.1%' },
  { name: 'Equitable Franklin Canadian Monthly Income and Growth', category: 'Canadian Neutral Balanced', risk: RISK.lowMed, mer: '2.72%', r1y: '11.6%', r3y: '8.7%', r5y: '5.2%', r10y: '4.7%' },
  { name: 'Equitable Dynamic Value Balanced', category: 'Canadian Equity Balanced', risk: RISK.low, mer: '3.22%', r1y: '17.4%', r3y: '11.5%', r5y: '6.9%', r10y: '5.4%' },
  { name: 'Equitable Franklin ClearBridge Dividend Income', category: 'Canadian Equity Balanced', risk: RISK.low, mer: '3.32%', r1y: '17.0%', r3y: '11.4%', r5y: '7.8%', r10y: '6.5%' },
  { name: 'Equitable Mackenzie Bluewater Canadian Growth Balanced', category: 'Canadian Equity Balanced', risk: RISK.medHigh, mer: '2.84%', r1y: '-2.0%', r3y: '3.9%', r5y: '2.5%', r10y: '4.5%' },
  { name: 'Equitable Mackenzie Ivy Canadian Balanced', category: 'Canadian Equity Balanced', risk: RISK.medHigh, mer: '2.85%', r1y: '9.3%', r3y: '10.0%', r5y: '6.9%', r10y: '—' },
  { name: 'Equitable Growth', category: 'Global Equity Balanced', risk: RISK.lowMed, mer: '2.54%', r1y: '18.2%', r3y: '12.9%', r5y: '7.4%', r10y: '6.7%' },
  { name: 'Equitable Franklin Quotential Growth Portfolio', category: 'Global Equity Balanced', risk: RISK.low, mer: '2.96%', r1y: '20.7%', r3y: '15.0%', r5y: '8.3%', r10y: '7.5%' },
  { name: 'Equitable Canoe Asset Allocation Portfolio', category: 'Tactical Balanced', risk: RISK.low, mer: '2.63%', r1y: '10.9%', r3y: '11.2%', r5y: '8.4%', r10y: '8.5%' },
  { name: 'Equitable MFS Low Volatility Canadian Equity', category: 'Canadian Equity', risk: RISK.lowMed, mer: '2.60%', r1y: '20.1%', r3y: '19.0%', r5y: '11.9%', r10y: '9.5%' },
  { name: 'Equitable Franklin ClearBridge Canadian Equity', category: 'Canadian Equity', risk: RISK.medHigh, mer: '2.80%', r1y: '18.3%', r3y: '14.2%', r5y: '10.8%', r10y: '8.4%' },
  { name: 'Equitable MFS Canadian Equity Plus', category: 'Canadian Focused Equity', risk: RISK.med, mer: '2.92%', r1y: '20.9%', r3y: '17.6%', r5y: '10.6%', r10y: '9.9%' },
  { name: 'Equitable Invesco EQV Canadian Premier Equity', category: 'Canadian Focused Equity', risk: RISK.low, mer: '3.63%', r1y: '37.1%', r3y: '24.1%', r5y: '15.6%', r10y: '10.3%' },
  { name: 'Equitable Invesco S&P/TSX Composite ESG Index ETF', category: 'Canadian Equity', risk: RISK.low, mer: '2.35%', r1y: '33.2%', r3y: '21.2%', r5y: '11.5%', r10y: '9.1%', si: true, index: true },
  { name: 'Equitable Dynamic American', category: 'U.S. Equity', risk: RISK.low, mer: '3.13%', r1y: '22.8%', r3y: '18.1%', r5y: '8.9%', r10y: '10.8%' },
  { name: 'Equitable Vanguard S&P 500 Index ETF', category: 'U.S. Equity', risk: RISK.med, mer: '2.33%', r1y: '27.8%', r3y: '21.4%', r5y: '14.2%', r10y: '13.9%', index: true },
  { name: 'Equitable Invesco NASDAQ 100 ESG Index ETF', category: 'U.S. Equity', risk: RISK.low, mer: '2.41%', r1y: '38.6%', r3y: '27.4%', r5y: '18.4%', r10y: '21.5%', si: true, index: true },
  { name: 'Equitable Brandes U.S. Equity', category: 'U.S. Equity', risk: RISK.med, mer: '2.69%', r1y: '21.3%', r3y: '16.5%', r5y: '12.1%', r10y: '11.7%' },
  { name: 'Equitable Invesco European Equity', category: 'European Equity', risk: RISK.low, mer: '3.16%', r1y: '26.4%', r3y: '14.6%', r5y: '1.9%', r10y: '5.4%' },
  { name: 'Equitable Brandes International Equity', category: 'International Equity', risk: RISK.med, mer: '2.82%', r1y: '24.1%', r3y: '21.2%', r5y: '13.9%', r10y: '9.4%' },
  { name: 'Equitable Invesco International Growth', category: 'International Equity', risk: RISK.med, mer: '2.86%', r1y: '11.8%', r3y: '8.0%', r5y: '-2.3%', r10y: '3.6%' },
  { name: 'Equitable Dynamic Asia Pacific Equity', category: 'Asia Pacific Equity', risk: RISK.medHigh, mer: '3.71%', r1y: '21.4%', r3y: '5.4%', r5y: '-8.5%', r10y: '2.8%' },
  { name: 'Equitable Mackenzie Emerging Markets', category: 'Emerging Markets Equity', risk: RISK.lowMed, mer: '2.86%', r1y: '48.7%', r3y: '27.4%', r5y: '10.7%', r10y: '—' },
  { name: 'Equitable Brandes Global Equity', category: 'Global Equity', risk: RISK.medHigh, mer: '2.83%', r1y: '19.5%', r3y: '19.9%', r5y: '13.3%', r10y: '10.6%' },
  { name: 'Equitable Fidelity® Climate Leadership', category: 'Global Equity', risk: RISK.lowMed, mer: '2.91%', r1y: '20.4%', r3y: '18.5%', r5y: '9.8%', r10y: '—', si: true },
  { name: 'Equitable Franklin Quotential Diversified Equity Portfolio', category: 'Global Equity', risk: RISK.low, mer: '3.12%', r1y: '25.2%', r3y: '17.6%', r5y: '9.8%', r10y: '9.4%' },
  { name: 'Equitable Vanguard Global All Cap ex Canada Index ETF', category: 'Global Equity', risk: RISK.low, mer: '2.48%', r1y: '30.0%', r3y: '20.4%', r5y: '11.5%', r10y: '11.2%', index: true },
];

// Sourced from https://equitableul.fundata.com/ — investment accounts available
// under Equitable Generations™ (the current universal life series). The site
// lists "Equation Generation IV" as a LEGACY series, not the current product —
// verify this against your actual in-force book before quoting to a client.
// No risk ratings are published on this tool as of writing.
export const ulInvestmentAccounts: FundRow[] = [
  { name: 'Equitable Money Market', category: 'Fixed Income', mer: '1.35%', r1y: '1.7%', r3y: '2.8%', r5y: '2.2%', r10y: '1.2%' },
  { name: 'Canadian Bond', category: 'Fixed Income', mer: '0.89%', r1y: '2.8%', r3y: '3.8%', r5y: '-0.1%', r10y: '0.4%' },
  { name: 'Equitable MFS Canadian Fixed Income', category: 'Fixed Income', mer: '0.38%', r1y: '3.6%', r3y: '4.6%', r5y: '0.8%', r10y: '1.7%' },
  { name: 'Equitable Bond', category: 'Fixed Income', mer: '2.47%', r1y: '1.2%', r3y: '2.2%', r5y: '-1.4%', r10y: '-0.4%' },
  { name: 'Global Fixed Income', category: 'Fixed Income', mer: '1.62%', r1y: '1.4%', r3y: '3.4%', r5y: '-0.7%', r10y: '1.2%' },
  { name: 'Equitable MFS Balanced', category: 'Balanced', mer: '2.89%', r1y: '12.8%', r3y: '11.1%', r5y: '5.6%', r10y: '6.0%' },
  { name: 'Global Balanced', category: 'Balanced', mer: '2.32%', r1y: '4.8%', r3y: '8.7%', r5y: '5.0%', r10y: '5.6%' },
  { name: 'Target Date 2050', category: 'Portfolio Funds', mer: '2.48%', r1y: '28.2%', r3y: '20.1%', r5y: '11.1%', r10y: '10.6%' },
  { name: 'Canadian Equity', category: 'Domestic Equities', mer: '2.14%', r1y: '19.1%', r3y: '15.0%', r5y: '11.5%', r10y: '9.0%' },
  { name: 'Equitable MFS Canadian Equity Plus', category: 'Domestic Equities', mer: '2.93%', r1y: '20.9%', r3y: '17.6%', r5y: '10.6%', r10y: '9.9%' },
  { name: 'Equitable MFS Common Stock', category: 'Domestic Equities', mer: '1.13%', r1y: '23.0%', r3y: '19.7%', r5y: '12.5%', r10y: '11.8%' },
  { name: 'Canadian Equity Index', category: 'Index Funds', mer: '—', r1y: '32.9%', r3y: '23.1%', r5y: '14.9%', r10y: '13.2%', index: true },
  { name: 'Canadian Equity Index (ESG)', category: 'Index Funds', mer: '—', r1y: '36.6%', r3y: '24.3%', r5y: '14.6%', r10y: '—', si: true, index: true },
  { name: 'American Growth Equity', category: 'Foreign Equities', mer: '2.46%', r1y: '48.4%', r3y: '30.1%', r5y: '17.1%', r10y: '18.5%' },
  { name: 'American Equity Index', category: 'Index Funds', mer: '—', r1y: '27.4%', r3y: '23.5%', r5y: '16.5%', r10y: '16.6%', index: true },
  { name: 'American Equity Index (ESG)', category: 'Index Funds', mer: '—', r1y: '31.3%', r3y: '23.7%', r5y: '17.5%', r10y: '17.4%', si: true, index: true },
  { name: 'U.S. Technologies Index', category: 'Index Funds', mer: '—', r1y: '40.0%', r3y: '29.9%', r5y: '19.9%', r10y: '23.5%', index: true },
  { name: 'Global Innovators Equity', category: 'Foreign Equities', mer: '2.47%', r1y: '66.4%', r3y: '45.2%', r5y: '22.9%', r10y: '—' },
];
