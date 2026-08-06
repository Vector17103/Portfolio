import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Reveal from '../../../components/Reveal';
import { useReveal } from '../../../lib/useReveal';
import { getMockPersonalInfo, PersonalInfo } from '../../../lib/wordpress';
import { accounts, getAccountBySlug, ontarioMarginalRates2026, DataTable } from '../../../lib/accounts';
import TfsaRrspComparator from '../../../components/insurance/charts/TfsaRrspComparator';
import RrifWithdrawalChart from '../../../components/insurance/charts/RrifWithdrawalChart';
import LiraLifBandChart from '../../../components/insurance/charts/LiraLifBandChart';
import RespGrantChart from '../../../components/insurance/charts/RespGrantChart';
import RdspGrantChart from '../../../components/insurance/charts/RdspGrantChart';
import styles from '../../../styles/InsuranceDetail.module.css';

interface AccountDetailProps {
  slug: string;
  personalInfo: PersonalInfo;
}

function Table({ table }: { table: DataTable }) {
  const stackOnMobile = table.headers.length >= 3;
  return (
    <div className={styles.tableWrap}>
      <table className={`${styles.table}${stackOnMobile ? ` ${styles.tableStackMobile}` : ''}`}>
        <thead>
          <tr>
            {table.headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} data-label={table.headers[j]}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AccountDetail({ slug, personalInfo }: AccountDetailProps) {
  const account = getAccountBySlug(slug);
  const { ref: heroRef, visible: heroVisible } = useReveal<HTMLDivElement>(0.3);

  if (!account) return null;

  const Icon = account.icon;

  return (
    <>
      <Head>
        <title>{account.name} — Accounts — Insurance — Achyut Niroula</title>
        <meta name="description" content={account.shortDescription} />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.section}>
          <div className="container">
            {/* Hero */}
            <Reveal>
              <Link href="/insurance" className={styles.backLink}>← All insurance &amp; accounts</Link>
              <span className="eyebrow">Accounts — {account.fullName}</span>
              <h1 className={styles.title}>{account.name}</h1>
              <p className={styles.summary}>{account.shortDescription}</p>
            </Reveal>

            <div ref={heroRef} data-reveal className={`${styles.heroDiagram}${heroVisible ? ' is-visible' : ''}`} style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
              <Icon active={heroVisible} />
            </div>

            {/* 1. What it is */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">What it is</span>
                <h2 className={styles.sectionHeading}>The basics</h2>
                <div className={styles.bodyText}>
                  {account.whatItIs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 2. Contribution rules */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Contribution rules</span>
                <h2 className={styles.sectionHeading}>How much you can put in</h2>
                <div className={styles.bodyText}>
                  {account.contributionRules.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
              {account.contributionTable && (
                <Reveal delay={0.08}>
                  <p className={styles.tableCaption}>{account.contributionTable.title}</p>
                  <Table table={account.contributionTable} />
                </Reveal>
              )}
            </div>

            {/* 3. Tax treatment table */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Tax treatment</span>
                <h2 className={styles.sectionHeading}>{account.taxTreatment.title}</h2>
                <Table table={account.taxTreatment} />
              </Reveal>
            </div>

            {/* Marginal tax rate table, TFSA/RRSP only */}
            {account.showMarginalRateTable && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Why this depends on your tax rate</span>
                  <h2 className={styles.sectionHeading}>{ontarioMarginalRates2026.title}</h2>
                  <p className={styles.tableIntro}>
                    The core {account.name} decision usually comes down to comparing your marginal rate today against
                    your expected marginal rate in retirement. A higher rate today favours an RRSP deduction; a lower
                    or similar rate favours a TFSA.
                  </p>
                  <Table table={ontarioMarginalRates2026} />
                </Reveal>
                {(slug === 'tfsa' || slug === 'rrsp') && (
                  <Reveal delay={0.1}>
                    <TfsaRrspComparator />
                  </Reveal>
                )}
              </div>
            )}

            {/* Account-specific interactive chart */}
            {slug === 'rrif' && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Visualized</span>
                  <h2 className={styles.sectionHeading}>Watching the minimum climb</h2>
                  <RrifWithdrawalChart />
                </Reveal>
              </div>
            )}
            {slug === 'lira-lif' && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Visualized</span>
                  <h2 className={styles.sectionHeading}>Your withdrawal room, by age</h2>
                  <LiraLifBandChart />
                </Reveal>
              </div>
            )}
            {slug === 'resp' && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Visualized</span>
                  <h2 className={styles.sectionHeading}>The grant, stacked against your own money</h2>
                  <RespGrantChart />
                </Reveal>
              </div>
            )}
            {slug === 'rdsp' && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Visualized</span>
                  <h2 className={styles.sectionHeading}>What the government adds, by income tier</h2>
                  <RdspGrantChart />
                </Reveal>
              </div>
            )}

            {/* 4. Withdrawal rules */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Withdrawal rules</span>
                <h2 className={styles.sectionHeading}>Getting money out</h2>
                <div className={styles.bodyText}>
                  {account.withdrawalRules.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 5. Over-contribution penalties */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Over-contribution penalties</span>
                <h2 className={styles.sectionHeading}>What happens if you go over</h2>
                <div className={styles.bodyText}>
                  {account.overContributionPenalty.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 6. Who it's best for */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Who it&apos;s best for</span>
                <h2 className={styles.sectionHeading}>Is this a fit?</h2>
                <ul className={styles.bulletList}>
                  {account.whoItsBestFor.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </Reveal>
              {account.bestForTable && (
                <Reveal delay={0.08}>
                  <p className={styles.tableCaption}>{account.bestForTable.title}</p>
                  <Table table={account.bestForTable} />
                </Reveal>
              )}
            </div>

            {/* 7. Interaction with other accounts */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Interaction with other accounts</span>
                <h2 className={styles.sectionHeading}>How it fits with the rest of your plan</h2>
                <ul className={styles.bulletList}>
                  {account.interactions.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* 8. Common mistakes */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Common mistakes</span>
                <h2 className={styles.sectionHeading}>What trips people up</h2>
                <ul className={styles.bulletList}>
                  {account.commonMistakes.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* 9. What you can hold */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">What you can hold inside it</span>
                <h2 className={styles.sectionHeading}>Eligible investments</h2>
                <div className={styles.bodyText}>
                  {account.whatYouCanHold.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 10. Illustrative example */}
            <Reveal className={styles.exampleBox}>
              <span className={styles.exampleLabel}>Illustrative example only — not advice or a quote</span>
              <p className={styles.exampleText}>{account.example}</p>
              <p className={styles.disclaimer}>
                Actual outcomes depend on your income, tax situation, and the rules in effect when you contribute or
                withdraw. Contact Achyut for guidance specific to your situation.
              </p>
            </Reveal>

            {/* 11. Learn more */}
            <Reveal className={styles.calloutBox}>
              <span className={styles.calloutLabel}>Learn more</span>
              <div className={styles.calloutLinks}>
                {account.learnMore.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.calloutLink}>
                    <span className={styles.calloutLinkLabel}>{link.label} ↗</span>
                    <span className={styles.calloutLinkNote}>{link.note}</span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Back + CTA */}
            <Reveal className={styles.ctaRow}>
              <Link href="/insurance" className={styles.secondaryLink}>← Back to insurance &amp; accounts</Link>
              <Link href="/#contact" className={styles.primaryLink}>Get in touch</Link>
            </Reveal>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: accounts.map((account) => ({ params: { slug: account.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const personalInfo = getMockPersonalInfo();
  return { props: { slug, personalInfo } };
};
