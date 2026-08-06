import { useMemo, useState } from 'react';
import { FundRow } from '../../lib/segFunds';
import styles from './FundTable.module.css';

interface FundTableProps {
  funds: FundRow[];
  showRisk?: boolean;
}

type SortKey = 'name' | 'category' | 'risk' | 'mer' | 'r1y' | 'r3y' | 'r5y' | 'r10y';

const RISK_ORDER = ['Low', 'Low to Medium', 'Medium', 'Medium to High', 'High'];

function toNumber(value: string): number {
  const n = parseFloat(value.replace('%', ''));
  return Number.isNaN(n) ? -Infinity : n;
}

// The fund data only carries a category label (e.g. "Canadian Fixed Income
// Balanced"), not a published equity/fixed-income split per fund. This
// estimates a rough split from that category name so the column isn't
// blank — it's not a precise holdings figure. Flagged as such in the note
// below the table; confirm exact allocation in the fund facts document
// before relying on it for a client conversation.
function estimateAllocation(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('money market')) return '0 / 100';
  if (c.includes('fixed income') && !c.includes('balanced')) return '0 / 100';
  if (c.includes('fixed income balanced')) return '25 / 75';
  if (c.includes('equity balanced')) return '70 / 30';
  if (c.includes('neutral balanced')) return '50 / 50';
  if (c.includes('balanced')) return '55 / 45';
  if (c.includes('tactical') || c.includes('portfolio') || c.includes('target date')) return 'Diversified';
  if (c.includes('equity')) return '100 / 0';
  return '—';
}

interface ColumnDef {
  key: SortKey | 'alloc';
  label: string;
  width: string;
  numeric?: boolean;
  hideAt1100?: boolean;
}

export default function FundTable({ funds, showRisk = true }: FundTableProps) {
  const categories = useMemo(() => Array.from(new Set(funds.map((f) => f.category))).sort(), [funds]);
  const risks = useMemo(
    () => RISK_ORDER.filter((r) => funds.some((f) => f.risk === r)),
    [funds]
  );

  const [category, setCategory] = useState('all');
  const [risk, setRisk] = useState('all');
  const [siOnly, setSiOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const rows = useMemo(() => {
    let filtered = funds;
    if (category !== 'all') filtered = filtered.filter((f) => f.category === category);
    if (risk !== 'all') filtered = filtered.filter((f) => f.risk === risk);
    if (siOnly) filtered = filtered.filter((f) => f.si);

    const sorted = [...filtered].sort((a, b) => {
      let result: number;
      if (sortKey === 'name' || sortKey === 'category') {
        result = a[sortKey].localeCompare(b[sortKey]);
      } else if (sortKey === 'risk') {
        result = RISK_ORDER.indexOf(a.risk ?? '') - RISK_ORDER.indexOf(b.risk ?? '');
      } else {
        result = toNumber(a[sortKey]) - toNumber(b[sortKey]);
      }
      return sortDir === 'asc' ? result : -result;
    });
    return sorted;
  }, [funds, category, risk, siOnly, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  // Column widths sum to 100%. When risk is hidden (no risk data for this
  // fund set), its width folds into the fund name column instead of
  // leaving a gap.
  const columns: ColumnDef[] = [
    { key: 'name', label: 'Fund name', width: showRisk ? '26%' : '36%' },
    { key: 'category', label: 'Category', width: '16%' },
    ...(showRisk ? [{ key: 'risk' as const, label: 'Risk', width: '10%' }] : []),
    { key: 'mer', label: 'MER', width: '9%', numeric: true },
    { key: 'r1y', label: '1 yr', width: '8%', numeric: true },
    { key: 'r3y', label: '3 yr', width: '8%', numeric: true },
    { key: 'r5y', label: '5 yr', width: '8%', numeric: true },
    { key: 'r10y', label: '10 yr', width: '8%', numeric: true, hideAt1100: true },
    { key: 'alloc', label: 'Equity / FI', width: '7%', numeric: true, hideAt1100: true },
  ];

  function headerCell(col: ColumnDef) {
    const sortable = col.key !== 'alloc';
    const active = sortable && sortKey === col.key;
    const classNames = [
      col.numeric ? styles.numericHeader : '',
      col.hideAt1100 ? styles.hideAt1100 : '',
      active ? styles.activeHeader : '',
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <th
        key={col.key}
        onClick={sortable ? () => toggleSort(col.key as SortKey) : undefined}
        className={classNames || undefined}
        style={{ cursor: sortable ? 'pointer' : 'default' }}
      >
        {col.label}
        {sortable && <span className={styles.sortArrow}>{active ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}</span>}
      </th>
    );
  }

  function bodyCell(col: ColumnDef, fund: FundRow) {
    const classNames = [col.numeric ? styles.numericCell : '', col.hideAt1100 ? styles.hideAt1100 : ''].filter(Boolean).join(' ');
    if (col.key === 'name') {
      return (
        <td key={col.key} className={classNames || undefined}>
          {fund.name}
          {fund.si && <span className={styles.badge}>SI</span>}
          {fund.index && <span className={styles.badge}>INDEX</span>}
        </td>
      );
    }
    if (col.key === 'category') return <td key={col.key} className={classNames || undefined}>{fund.category}</td>;
    if (col.key === 'risk') return <td key={col.key} className={classNames || undefined}>{fund.risk ?? '—'}</td>;
    if (col.key === 'mer') return <td key={col.key} className={`${styles.mer} ${classNames}`.trim()}>{fund.mer}</td>;
    if (col.key === 'alloc') return <td key={col.key} className={classNames || undefined}>{estimateAllocation(fund.category)}</td>;
    return <td key={col.key} className={classNames || undefined}>{fund[col.key]}</td>;
  }

  return (
    <div>
      <div className={styles.filters}>
        <label className={styles.filterField}>
          <span>Asset class</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        {showRisk && risks.length > 0 && (
          <label className={styles.filterField}>
            <span>Risk rating</span>
            <select value={risk} onChange={(e) => setRisk(e.target.value)}>
              <option value="all">All</option>
              {risks.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
        )}
        <label className={styles.filterCheckbox}>
          <input type="checkbox" checked={siOnly} onChange={(e) => setSiOnly(e.target.checked)} />
          <span>Sustainable Investment (SI) only</span>
        </label>
        <span className={styles.resultCount}>{`${rows.length} of ${funds.length} funds`}</span>
      </div>

      {/* Desktop / tablet: fixed-layout table. Hidden below 700px via CSS. */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ width: col.width }} className={col.hideAt1100 ? styles.hideAt1100 : undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>{columns.map(headerCell)}</tr>
          </thead>
          <tbody>
            {rows.map((fund) => (
              <tr key={fund.name}>{columns.map((col) => bodyCell(col, fund))}</tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards, no horizontal scrolling at any width. Shown below 700px via CSS. */}
      <div className={styles.cardList}>
        {rows.map((fund) => (
          <div key={fund.name} className={styles.card}>
            <p className={styles.cardName}>
              {fund.name}
              {fund.si && <span className={styles.badge}>SI</span>}
              {fund.index && <span className={styles.badge}>INDEX</span>}
            </p>
            <div className={styles.cardRow}>
              <span>Category</span>
              <span>{fund.category}</span>
            </div>
            {showRisk && (
              <div className={styles.cardRow}>
                <span>Risk</span>
                <span>{fund.risk ?? '—'}</span>
              </div>
            )}
            <div className={styles.cardRow}>
              <span>MER</span>
              <span className={styles.mer}>{fund.mer}</span>
            </div>
            <div className={styles.cardRow}>
              <span>1 yr</span>
              <span>{fund.r1y}</span>
            </div>
            <div className={styles.cardRow}>
              <span>3 yr</span>
              <span>{fund.r3y}</span>
            </div>
            <div className={styles.cardRow}>
              <span>5 yr</span>
              <span>{fund.r5y}</span>
            </div>
            <div className={styles.cardRow}>
              <span>10 yr</span>
              <span>{fund.r10y}</span>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.allocNote}>
        Equity / fixed income split is estimated from each fund&apos;s asset-class category, not a precise published
        allocation. Confirm exact holdings in the fund facts document before relying on it.
      </p>
    </div>
  );
}
