import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaWrench } from 'react-icons/fa';
import { getMockPersonalInfo, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Resume.module.css';

interface ResumeProps {
  personalInfo: PersonalInfo;
}

export default function Resume({ personalInfo }: ResumeProps) {
  return (
    <>
      <Head>
        <title>Resume — Achyut Niroula</title>
        <meta name="description" content="Resume and CV of Achyut Niroula" />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.resumeSection}>
          <div className="container">
            <div className={styles.header}>
              <span className="eyebrow">Resume</span>
              <a href={personalInfo.resume_url} download className={styles.downloadBtn}>
                <FaDownload /> Download PDF
              </a>
            </div>
            <h1 className={styles.title}>Resume</h1>
            <hr className="rule" />

            {/* Experience Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaBriefcase className={styles.icon} />
                <h2>Experience</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>Co-Founder, Founding Software Engineer</h3>
                  <p className={styles.institution}>Apatheia — North Bay, ON</p>
                  <p className={styles.date}>Jun. 2025 – Present</p>
                  <ul className={styles.details}>
                    <li>Architected a cloud-native multimodal video understanding platform on AWS (EC2, S3, SQS, DynamoDB), integrating 8 neural models across distributed microservices.</li>
                    <li>Built and owned REST API endpoints connecting async perception, fusion, and narrative services; authored root-cause analysis and cross-service API documentation for stakeholders.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Web Developer, Research Assistant</h3>
                  <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                  <p className={styles.date}>May 2023 – Aug. 2025</p>
                  <ul className={styles.details}>
                    <li>Built and maintained a responsive HTML5/CSS3/JavaScript faculty website integrated with a database-backed CMS; delivered features across the full SDLC using Git branching and pull request workflows.</li>
                    <li>Conducted peer code reviews and authored technical documentation for both developer and non-technical audiences.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Sales Associate II, Flooring &amp; Decor / Tool Rental</h3>
                  <p className={styles.institution}>The Home Depot — North Bay, ON</p>
                  <p className={styles.date}>Dec. 2022 – Present</p>
                  <ul className={styles.details}>
                    <li>Advised 20+ clients weekly across two specialized departments; resolved issues through clear verbal and written communication.</li>
                    <li>Trained customers on tool operation and installation; adapted communication for audiences from contractors to first-time homeowners.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaWrench className={styles.icon} />
                <h2>Projects</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>LEON (LearnOne)</h3>
                  <p className={styles.institution}>Python, FastAPI, PostgreSQL, Redis, Gemini (Google AI)</p>
                  <ul className={styles.details}>
                    <li>Engineered a sub-300ms conversational AI loop using Gemini for low-latency LLM inference, streaming sentence-by-sentence TTS, and VAD-based barge-in interruption; migrated from Groq to Gemini to address rate-limit constraints in a real-time voice pipeline.</li>
                    <li>Designed an adaptive learning engine with SM-2 spaced repetition and a knowledge graph extracted per conversation; FastAPI backend with PostgreSQL and Redis.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>JobHunt AI</h3>
                  <p className={styles.institution}>Python, FastAPI, React, TypeScript, Docker, Nginx, SQLite</p>
                  <ul className={styles.details}>
                    <li>Built a multi-step LLM pipeline scraping 7 job boards concurrently with an ATS classifier and semantic resume-matching; containerized with Docker Compose and Nginx reverse proxy.</li>
                    <li>Wrote a pytest integration suite covering all REST API endpoints; implemented agentic workflow orchestrating scraping, classification, and cover letter generation end-to-end.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>ResOptimum</h3>
                  <p className={styles.institution}>Python, FastAPI, Claude API, pdfplumber, LaTeX</p>
                  <ul className={styles.details}>
                    <li>Engineered structured LLM prompts with JSON schema validation, role detection, and prompt chaining; built a REST API ingesting PDF and job description inputs to produce ATS-targeted LaTeX output.</li>
                    <li>Implemented a one-page fit-check with auto-compression via a second LLM pass; applied prompt engineering techniques to maintain factual accuracy under structured output constraints.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaGraduationCap className={styles.icon} />
                <h2>Education</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>B.Sc. Honours Specialization in Computer Science</h3>
                  <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                  <p className={styles.date}>May 2026 | GPA: 3.7/4.0</p>
                  <ul className={styles.details}>
                    <li>Awards: President&apos;s Scholarship (2021), Carl Sanders Scholarship (2022, 2023, 2024, 2025)</li>
                    <li>Relevant coursework: Distributed Systems (96%), Databases &amp; Data Management (96%), Software Engineering (89%), Artificial Neural Networks (83%), Data Structures (83%)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaCode className={styles.icon} />
                <h2>Technical Skills</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.skillsGrid}>
                  <div className={styles.skillCategory}>
                    <h3>Languages</h3>
                    <div className={styles.skillTags}>
                      <span>Java</span><span>TypeScript</span><span>Python</span><span>JavaScript</span><span>SQL</span><span>C++</span><span>HTML5/CSS3</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>Frameworks &amp; APIs</h3>
                    <div className={styles.skillTags}>
                      <span>FastAPI</span><span>React</span><span>Node.js</span><span>Flask</span><span>Nginx</span><span>RESTful APIs</span><span>microservices</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>AI &amp; LLM</h3>
                    <div className={styles.skillTags}>
                      <span>Claude API</span><span>Gemini</span><span>Groq</span><span>OpenRouter</span><span>agentic workflows</span><span>LLM pipelines</span><span>prompt engineering</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>Cloud &amp; DevOps</h3>
                    <div className={styles.skillTags}>
                      <span>AWS (EC2, S3, SQS, DynamoDB)</span><span>Docker</span><span>Linux</span><span>Git</span><span>Google Cloud Run</span><span>Firebase</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>Databases</h3>
                    <div className={styles.skillTags}>
                      <span>PostgreSQL</span><span>Redis</span><span>SQLite</span><span>Firebase</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>Testing</h3>
                    <div className={styles.skillTags}>
                      <span>pytest</span><span>JUnit</span><span>Playwright</span><span>TDD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="contact-target" className={styles.contactAnchor} />
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
