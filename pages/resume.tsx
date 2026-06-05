import { GetStaticProps } from 'next';
import Head from 'next/head';
import type { MouseEvent } from 'react';
import Layout from '../components/Layout';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaWrench } from 'react-icons/fa';
import { getMockPersonalInfo, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Resume.module.css';

interface ResumeProps {
  personalInfo: PersonalInfo;
}

export default function Resume({ personalInfo }: ResumeProps) {
  const handleTilePointerMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    target.style.setProperty('--pointer-x', `${x}%`);
    target.style.setProperty('--pointer-y', `${y}%`);
  };

  return (
    <>
      <Head>
        <title>Resume - Achyut</title>
        <meta name="description" content="Resume and CV of Achyut" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.resumeSection}>
          <div className="container">
            <div className={styles.header}>
              <h1 className="section-title">Resume</h1>
              <a href={personalInfo.resume_url} download className={styles.downloadBtn}>
                <FaDownload /> Download PDF
              </a>
            </div>

            {/* Experience Section */}
            <div className={styles.section} onMouseMove={handleTilePointerMove}>
              <div className={styles.sectionHeader}>
                <FaBriefcase className={styles.icon} />
                <h2>Experience</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>Software Developer, Honours Research Capstone</h3>
                  <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                  <p className={styles.date}>Jan. 2026 – Apr. 2026</p>
                  <ul className={styles.details}>
                    <li>Architected a cloud-native multimodal video understanding platform on AWS (EC2, S3, SQS, DynamoDB), integrating 8 neural models across distributed microservices.</li>
                    <li>Built and owned REST API endpoints connecting async perception, fusion, and narrative services; fused vision, depth, motion, and audio into per-frame scene representations.</li>
                    <li>Implemented post-deployment observability across all model endpoints; authored root-cause analysis reports and cross-service API documentation for engineering stakeholders.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Web Developer, Research Assistant</h3>
                  <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                  <p className={styles.date}>May 2023 – Aug. 2025</p>
                  <ul className={styles.details}>
                    <li>Built and maintained a responsive HTML5/CSS3/JavaScript website for a faculty member, integrated with a database-backed CMS and validated for accessibility each release.</li>
                    <li>Gathered requirements from faculty stakeholders and delivered features across the full SDLC using Git branching and pull request workflows.</li>
                    <li>Conducted peer code reviews and authored technical documentation for both developer and non-technical audiences.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Sales Associate II, Flooring & Decor / Tool Rental</h3>
                  <p className={styles.institution}>The Home Depot — North Bay, ON</p>
                  <p className={styles.date}>Dec. 2022 – Present</p>
                  <ul className={styles.details}>
                    <li>Advised 20+ clients weekly on product and financing solutions across two specialized departments; resolved issues through clear verbal and written communication.</li>
                    <li>Trained customers on tool operation and installation; adapted communication for audiences from contractors to first-time homeowners.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Construction Labourer / Design Consultant</h3>
                  <p className={styles.institution}>Seasonal Trades (AP Engineering, RussCollins Carpentry) — North Bay, ON</p>
                  <p className={styles.date}>2023 – 2025</p>
                  <ul className={styles.details}>
                    <li>Performed site preparation and material handling on active construction sites; followed all safety procedures including PPE and lockout/tagout.</li>
                    <li>Communicated design and layout concepts to clients that were frequently incorporated into project plans.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className={styles.section} onMouseMove={handleTilePointerMove}>
              <div className={styles.sectionHeader}>
                <FaWrench className={styles.icon} />
                <h2>Projects</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>LearnOne</h3>
                  <p className={styles.institution}>Java 21, Spring Boot, React, TypeScript, PostgreSQL, Redis, Claude API, pgvector</p>
                  <ul className={styles.details}>
                    <li>Built a Jarvis-style AI educator with persistent sessions, Claude API curriculum generation, SM-2 spaced repetition, Judge0 code execution, and KaTeX/Mermaid rendering.</li>
                    <li>Designed a Spring Boot REST backend with PostgreSQL persistence, Redis caching, and a pgvector knowledge graph extracted from conversations.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>AI Video Analyzer</h3>
                  <p className={styles.institution}>Python, FastAPI, React, AWS (EC2, S3, SQS, DynamoDB), Docker</p>
                  <ul className={styles.details}>
                    <li>Orchestrated 8+ neural models (SigLIP, DepthAnything V2, Mask2Former, SlowFast, ByteTrack, Whisper, Qwen2-VL) into a unified per-frame scene pipeline.</li>
                    <li>Containerized all services on Linux/EC2; wrote 9 automated test suites covering frame-level correctness and edge cases.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>ResOptimum</h3>
                  <p className={styles.institution}>Python, FastAPI, Flask, Claude API, pdfplumber, LaTeX</p>
                  <ul className={styles.details}>
                    <li>Built a resume optimizer that ingests a PDF and job description and generates an ATS-targeted LaTeX resume preserving factual accuracy.</li>
                    <li>Engineered structured Claude API prompts with JSON schema validation, role detection, and a one-page LaTeX fit-check with auto-compression.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>JobHunt AI</h3>
                  <p className={styles.institution}>Python, FastAPI, React, TypeScript, Docker, Nginx, SQLite</p>
                  <ul className={styles.details}>
                    <li>Built a multi-step LLM pipeline scraping 7 job boards concurrently with an ATS classifier and semantic resume matching end-to-end.</li>
                    <li>Containerized deployment with Docker Compose and Nginx reverse proxy; wrote a pytest integration suite covering all API endpoints.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Cloud Inventory</h3>
                  <p className={styles.institution}>Python, Flask, Firebase, Google Cloud Run, Cloudinary, Chart.js, Docker</p>
                  <ul className={styles.details}>
                    <li>Deployed a serverless inventory system to Google Cloud Run with role-based access control (Admin/Editor/Viewer) and analytics dashboards.</li>
                    <li>Integrated Firebase Realtime Database, Cloudinary CDN image uploads, and real-time data synchronization.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Cloud-Chat</h3>
                  <p className={styles.institution}>Java, Firebase Realtime Database, WebSocket, Maven</p>
                  <ul className={styles.details}>
                    <li>Built a distributed real-time messaging platform with WebSocket synchronization and event-driven listeners across distributed clients.</li>
                    <li>Demonstrated CAP theorem and eventual consistency tradeoffs; wrote JUnit tests and Maven build configuration.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>rlget</h3>
                  <p className={styles.institution}>Python, ThreadPoolExecutor, pytest, CLI</p>
                  <ul className={styles.details}>
                    <li>Built a production-style CLI file downloader with parallel downloads, token-bucket rate limiting, and exponential backoff with jitter.</li>
                    <li>Handled real-world HTTP robustly with Content-Disposition parsing and no-clobber safe file naming; covered with pytest.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>PromptShop Test Agent</h3>
                  <p className={styles.institution}>Python, OpenRouter API, OpenAI-compatible client</p>
                  <ul className={styles.details}>
                    <li>Built an LLM agent that reads structured JSON prompts and routes them to multiple open-source models via OpenRouter for automated evaluation.</li>
                    <li>Designed for integration with agent execution systems using an OpenAI-compatible client.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Indeed Stealth Scraper</h3>
                  <p className={styles.institution}>Python, FastAPI, Playwright</p>
                  <ul className={styles.details}>
                    <li>Built a modular scraper with proxy rotation and exponential backoff exposing scrape and export endpoints via FastAPI.</li>
                    <li>Wrote integration tests in live Playwright environments; documented root-cause analysis on bot-detection failures.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className={styles.section} onMouseMove={handleTilePointerMove}>
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
                    <li>President’s Scholarship (2021); Carl Sanders Scholarship (2022–2025).</li>
                    <li>Relevant coursework: Distributed Systems (96%), Databases & Data Management (96%), Software Engineering (89%), Security & Protection (86%), Data Structures (83%), Artificial Neural Networks (83%), Digital Systems (81%), Intro to Data Science (80%).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className={styles.section} onMouseMove={handleTilePointerMove}>
              <div className={styles.sectionHeader}>
                <FaCode className={styles.icon} />
                <h2>Technical Skills</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.skillsGrid}>
                  <div className={styles.skillCategory} onMouseMove={handleTilePointerMove}>
                    <h3>Languages</h3>
                    <div className={styles.skillTags}>
                      <span>Python</span><span>Java</span><span>TypeScript</span><span>JavaScript</span><span>SQL</span><span>C++</span><span>HTML5/CSS3</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory} onMouseMove={handleTilePointerMove}>
                    <h3>Frameworks &amp; APIs</h3>
                    <div className={styles.skillTags}>
                      <span>FastAPI</span><span>Spring Boot</span><span>React</span><span>Next.js</span><span>Flask</span><span>Node.js</span><span>RESTful APIs</span><span>microservices</span><span>Nginx</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory} onMouseMove={handleTilePointerMove}>
                    <h3>AI &amp; LLM</h3>
                    <div className={styles.skillTags}>
                      <span>Claude API (Anthropic)</span><span>OpenRouter</span><span>multi-step LLM pipelines</span><span>tool-calling</span><span>pgvector</span><span>RAG</span><span>semantic similarity</span><span>PyTorch models</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory} onMouseMove={handleTilePointerMove}>
                    <h3>Cloud &amp; DevOps</h3>
                    <div className={styles.skillTags}>
                      <span>AWS (EC2, S3, SQS, DynamoDB)</span><span>Google Cloud Run</span><span>Firebase</span><span>Docker</span><span>Docker Compose</span><span>Git</span><span>CI/CD</span><span>Linux</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory} onMouseMove={handleTilePointerMove}>
                    <h3>Databases</h3>
                    <div className={styles.skillTags}>
                      <span>PostgreSQL</span><span>Redis</span><span>SQLite</span><span>Firebase (NoSQL)</span><span>pgvector</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory} onMouseMove={handleTilePointerMove}>
                    <h3>Testing</h3>
                    <div className={styles.skillTags}>
                      <span>pytest</span><span>JUnit</span><span>Playwright</span><span>TDD</span><span>integration testing</span><span>end-to-end testing</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory} onMouseMove={handleTilePointerMove}>
                    <h3>Other</h3>
                    <div className={styles.skillTags}>
                      <span>Stakeholder communication</span><span>technical writing</span><span>agile/SDLC</span><span>WHMIS certified</span>
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
