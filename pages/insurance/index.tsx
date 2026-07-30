import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import StatCounter from '../../components/StatCounter';
import Reveal from '../../components/Reveal';
import { useReveal } from '../../lib/useReveal';
import { getMockPersonalInfo, PersonalInfo } from '../../lib/wordpress';
import { insuranceServices, insuranceStats, InsuranceService } from '../../lib/insuranceServices';
import styles from '../../styles/Insurance.module.css';

interface InsuranceProps {
  personalInfo: PersonalInfo;
}

function ServiceCard({ service, delay }: { service: InsuranceService; delay: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>(0.3);
  const Icon = service.icon;

  return (
    <Link
      href={`/insurance/${service.slug}`}
      ref={ref}
      data-reveal
      className={`${styles.card}${visible ? ' is-visible' : ''}`}
      style={{ '--reveal-delay': `${delay}s` } as React.CSSProperties}
    >
      <div className={styles.thumbnail}>
        <Icon active={visible} />
      </div>
      <div className={styles.content}>
        <h3>{service.name}</h3>
        <p title={service.shortDescription}>{service.shortDescription}</p>
      </div>
    </Link>
  );
}

export default function Insurance({ personalInfo }: InsuranceProps) {
  const orderedServices = [...insuranceServices].sort((a, b) => a.order - b.order);

  return (
    <>
      <Head>
        <title>Insurance — Achyut Niroula</title>
        <meta
          name="description"
          content="Ontario LLQP-licensed insurance services offered by Achyut Niroula."
        />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.section}>
          <div className="container">
            <Reveal>
              <span className="eyebrow">Insurance</span>
              <h1 className={styles.title}>Insurance Services</h1>
              <p className={styles.subtitle}>
                Licensed under Ontario&apos;s LLQP (Life License Qualification Program), offering the following
                products and guidance tailored to your goals.
              </p>
            </Reveal>

            <Reveal className={styles.statsRow} delay={0.1}>
              <StatCounter label="Services offered" value={insuranceStats.servicesOffered} suffix="+" />
              <StatCounter label="Clients helped" value={insuranceStats.clientsHelped} suffix="+" />
              <StatCounter label="Premium placed" value={insuranceStats.premiumPlaced} prefix="$" suffix="+" />
            </Reveal>

            <hr className="rule" />

            <div className={styles.grid}>
              {orderedServices.map((service, index) => (
                <ServiceCard key={service.slug} service={service} delay={(index % 3) * 0.08} />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const personalInfo = getMockPersonalInfo();
  return { props: { personalInfo } };
};
