import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import InsuranceIcon from '../components/InsuranceIcon';
import { getMockPersonalInfo, PersonalInfo } from '../lib/wordpress';
import { insuranceProducts } from '../lib/insurance';
import styles from '../styles/Insurance.module.css';

interface InsuranceProps {
  personalInfo: PersonalInfo;
}

export default function Insurance({ personalInfo }: InsuranceProps) {
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
            <span className="eyebrow">Insurance</span>
            <h1 className={styles.title}>Insurance Services</h1>
            <p className={styles.subtitle}>
              Licensed under Ontario&apos;s LLQP (Life License Qualification Program), offering the following
              products and guidance tailored to your goals.
            </p>
            <hr className="rule" />

            <div className={styles.grid}>
              {insuranceProducts.map((product) => (
                <div key={product.id} className={styles.card}>
                  <div className={styles.thumbnail}>
                    <InsuranceIcon id={product.id} />
                  </div>
                  <div className={styles.content}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                  </div>
                </div>
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
