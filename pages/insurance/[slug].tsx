import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Reveal from '../../components/Reveal';
import { useReveal } from '../../lib/useReveal';
import { getMockPersonalInfo, PersonalInfo } from '../../lib/wordpress';
import { insuranceServices, getInsuranceServiceBySlug, insuranceDisclaimer } from '../../lib/insuranceServices';
import styles from '../../styles/InsuranceDetail.module.css';

interface InsuranceDetailProps {
  slug: string;
  personalInfo: PersonalInfo;
}

export default function InsuranceDetail({ slug, personalInfo }: InsuranceDetailProps) {
  const service = getInsuranceServiceBySlug(slug);
  const { ref: heroRef, visible: heroVisible } = useReveal<HTMLDivElement>(0.3);

  if (!service) return null;

  const Icon = service.icon;
  const Diagram = service.diagram;
  const { comparisonTable } = service.detail;

  return (
    <>
      <Head>
        <title>{service.name} — Insurance — Achyut Niroula</title>
        <meta name="description" content={service.detail.summary} />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.section}>
          <div className="container">
            {/* 1. Hero */}
            <Reveal>
              <Link href="/insurance" className={styles.backLink}>← All insurance services</Link>
              <span className="eyebrow">Insurance</span>
              <h1 className={styles.title}>{service.name}</h1>
              <p className={styles.summary}>{service.detail.summary}</p>
            </Reveal>

            <div ref={heroRef} data-reveal className={`${styles.heroDiagram}${heroVisible ? ' is-visible' : ''}`} style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
              <Icon active={heroVisible} />
            </div>

            {/* 2. What it is */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">What it is</span>
                <h2 className={styles.sectionHeading}>The basics</h2>
                <div className={styles.bodyText}>
                  {service.detail.whatItIs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 3. How it works — comparison table */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">How it works</span>
                <h2 className={styles.sectionHeading}>{comparisonTable.title}</h2>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {comparisonTable.headers.map((header, i) => (
                          <th key={i}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonTable.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>

            {/* 4. Visual breakdown */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Visual breakdown</span>
                <h2 className={styles.sectionHeading}>How the mechanism works</h2>
              </Reveal>
              <Reveal className={styles.breakdownDiagram} delay={0.08}>
                <Diagram />
              </Reveal>
            </div>

            {/* 5. Who it's typically for */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Who it&apos;s typically for</span>
                <h2 className={styles.sectionHeading}>Is this a fit?</h2>
                <ul className={styles.bulletList}>
                  {service.detail.whoItsFor.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* 6. Illustrative example */}
            <Reveal className={styles.exampleBox}>
              <span className={styles.exampleLabel}>Illustrative example only — not a quote</span>
              <p className={styles.exampleText}>{service.detail.example}</p>
              <p className={styles.disclaimer}>{insuranceDisclaimer}</p>
            </Reveal>

            {/* 7. Learn more */}
            <Reveal className={styles.calloutBox}>
              <span className={styles.calloutLabel}>Learn more</span>
              <div className={styles.calloutLinks}>
                {service.detail.learnMore.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.calloutLink}>
                    <span className={styles.calloutLinkLabel}>{link.label} ↗</span>
                    <span className={styles.calloutLinkNote}>{link.note}</span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* 8. Back + CTA */}
            <Reveal className={styles.ctaRow}>
              <Link href="/insurance" className={styles.secondaryLink}>← Back to insurance services</Link>
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
    paths: insuranceServices.map((service) => ({ params: { slug: service.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const personalInfo = getMockPersonalInfo();
  return { props: { slug, personalInfo } };
};
