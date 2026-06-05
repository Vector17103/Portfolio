import { GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import Layout from '../components/Layout';
import { getMockPersonalInfo, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Capstone.module.css';

interface CapstoneProps {
  html: string;
  personalInfo: PersonalInfo;
}

export default function Capstone({ html, personalInfo }: CapstoneProps) {
  const cleanedHtml = html
    .replace(/<p[^>]*>\s*(?:A Cloud-Native Multimodal Video Understanding Platform|Using Deep Learning, Multimodal Fusion, and Large Vision-Language Models|Achyut Niroula|Department of Computer Science, Nipissing University, North Bay, Ontario, Canada|COSC 4896 – Honours Research I · Winter 2026)\s*<\/p>\s*/gi, '')
    .replace(/<p>\s*<\/p>/g, '');

  return (
    <>
      <Head>
        <title>Capstone Research — Multimodal Video Understanding</title>
        <meta
          name="description"
          content="Capstone research page for a multimodal video understanding platform, with architecture, experimental design, and results."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout personalInfo={personalInfo}>
        <div className={styles.page}>
          <section className={styles.hero}>
          <div className={styles.heroIntro}>
            <span className={styles.heroBadge}>Capstone Research</span>
            <h1 className={styles.heroTitle}>Multimodal Video Understanding</h1>
            <p className={styles.heroText}>
              A cloud-native research platform for video perception, timeline-aware reasoning, and interactive presentation of AI research work.
            </p>
            <div className={styles.heroMeta}>
              <span>Achyut Niroula</span>
              <span>Department of Computer Science, Nipissing University, North Bay, Ontario, Canada</span>
              <span>COSC 4896 – Honours Research I · Winter 2026</span>
            </div>
            <div className={styles.heroSummary}>
              <h2>Research summary</h2>
              <p>
                This page captures the core research, architecture, and results for the Multimodal Video Understanding capstone project. It is designed for reviewers and future research extensions.
              </p>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.previewCard}>
              <img
                src="/presentation.jpg"
                alt="Presentation slide for Multimodal Video Understanding capstone"
                className={styles.heroImage}
              />
              <div className={styles.previewLabel}>Capstone presentation</div>
            </div>
          </div>
        </section>

        <section className={styles.capstoneSection}>
          <div className={styles.paper}>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: cleanedHtml }} />
          </div>
        </section>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const mammoth = await import('mammoth');
  const docPath = path.join(process.cwd(), 'public', 'COSC4896_VideoUnderstanding_Niroula.docx');
  const result = await mammoth.convertToHtml({ path: docPath });

  return {
    props: {
      html: result.value,
      personalInfo: getMockPersonalInfo(),
    },
  };
};
