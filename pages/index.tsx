import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import ProjectThumbnail from '../components/ProjectThumbnail';
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import type { MouseEvent } from 'react';
import { getMockProjects, getMockPersonalInfo, Project, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Home.module.css';

interface HomeProps {
  projects: Project[];
  personalInfo: PersonalInfo;
}

export default function Home({ projects, personalInfo }: HomeProps) {
  const selectedWorkOrder = [10, 9, 1];
  const selectedProjects = selectedWorkOrder
    .map(id => projects.find(project => project.id === id))
    .filter(Boolean) as Project[];

  const selectedWorkDetails: Record<number, { summary: string }> = {
    10: {
      summary:
        'Resume Engine rewrites career achievements into role-aligned narratives with ATS-aware language, secure PDF export, and semantic resume optimization for hiring pipelines.',
    },
    9: {
      summary:
        'LEON is a voice-first adaptive learning platform that listens, understands, and responds with natural speech. It generates personalized curricula, spaced repetition reviews, quizzes, and knowledge graph memory to guide learners through every session.',
    },
    1: {
      summary:
        'Video Understanding brings multimodal perception, scene segmentation, and timeline analysis together in a demo-ready platform for research and product development.',
    },
  };

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
        <title>Achyut Niroula — Portfolio</title>
        <meta
          name="description"
          content="Achyut Niroula is a Computer Science student building cloud-native AI and software experiences."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.hero}>
          <div className={styles.heroIntro}>
            <span className={styles.heroLabel}>Portfolio</span>
            <h1 className={styles.heroTitle}>Achyut Niroula</h1>
            <p className={styles.heroText}>
              {personalInfo.bio}. I design elegant, resilient software and AI-first systems with a focus on cloud architecture,
              scalable products, and polished user experiences.
            </p>
            <div className={styles.heroActions}>
              <a href="#selected-work" className={styles.primaryBtn}>
                Selected Work
              </a>
              <a href="#site-footer" className={styles.secondaryBtn}>
                Contact
              </a>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <strong>8+</strong>
                <span>Projects shipped</span>
              </div>
              <div className={styles.statCard}>
                <strong>Cloud & AI</strong>
                <span>Specialization</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.featureResearch}>
              <div className={styles.featurePanelHeader}>
                <span>Featured research</span>
              </div>
              <a
                href="/capstone"
                className={styles.featureResearchCard}
                onMouseMove={handleTilePointerMove}
              >
                <div className={styles.featureResearchContent}>
                  <p className={styles.featureResearchTag}>Capstone Paper</p>
                  <h3 className={styles.featureResearchTitle}>Multimodel video understanding</h3>
                  <p className={styles.featureResearchText}>
                    Research paper and capstone demo for the Multimodel Video Understanding platform.
                  </p>
                </div>
                <span className={styles.featureIcon}><FaArrowRight /></span>
                <div className={styles.featureResearchAccent} />
              </a>
            </div>

            <div
              className={styles.presentationCard}
              onMouseMove={handleTilePointerMove}
            >
              <div className={styles.presentationLayer} />
              <svg
                aria-hidden="true"
                width="100%"
                height="100%"
                viewBox="0 0 420 240"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
              >
                <defs>
                  <linearGradient id="bgVideo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#141416" />
                    <stop offset="100%" stopColor="#1e1e22" />
                  </linearGradient>
                  <linearGradient id="panelGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(198, 126, 255, 0.16)" />
                    <stop offset="100%" stopColor="rgba(115, 64, 255, 0.05)" />
                  </linearGradient>
                </defs>

                <rect width="420" height="240" fill="url(#bgVideo)" />
                <rect x="16" y="16" width="388" height="208" rx="24" fill="none" stroke="#2a2a2e" strokeWidth="1" />
                <rect x="16" y="16" width="388" height="208" rx="24" fill="rgba(255, 255, 255, 0.02)" />

                <rect x="28" y="28" width="220" height="184" rx="18" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.7" />
                <rect x="34" y="38" width="208" height="18" rx="10" fill="#141416" opacity="0.9" />
                <circle cx="54" cy="47" r="3" fill="#c6c6c8" opacity="0.55" />
                <circle cx="68" cy="47" r="3" fill="#c6c6c8" opacity="0.35" />
                <circle cx="82" cy="47" r="3" fill="#c6c6c8" opacity="0.2" />

                <rect x="42" y="64" width="170" height="8" rx="4" fill="#141416" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.55" />
                <rect x="42" y="78" width="104" height="6" rx="3" fill="#c6c6c8" opacity="0.12" />
                <rect x="42" y="92" width="138" height="6" rx="3" fill="#c6c6c8" opacity="0.09" />
                <rect x="42" y="106" width="88" height="6" rx="3" fill="#c6c6c8" opacity="0.08" />
                <rect x="42" y="124" width="172" height="10" rx="5" fill="#141416" stroke="#c6c6c8" strokeWidth="0.4" opacity="0.45" />
                <rect x="44" y="126" width="28" height="6" rx="3" fill="#c6c6c8" opacity="0.6">
                  <animate attributeName="width" values="28;106;28" dur="2.2s" repeatCount="indefinite" />
                </rect>
                <rect x="42" y="142" width="188" height="10" rx="5" fill="#141416" stroke="#c6c6c8" strokeWidth="0.4" opacity="0.35" />
                <rect x="44" y="144" width="18" height="6" rx="3" fill="#c6c6c8" opacity="0.6">
                  <animate attributeName="width" values="18;78;18" dur="2.6s" repeatCount="indefinite" begin="0.4s" />
                </rect>

                <path d="M 64 168 C 90 146 132 178 148 164 C 168 146 202 166 224 154" fill="none" stroke="#c6c6c8" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
                <path d="M 64 170 C 90 150 132 180 148 167 C 168 150 202 168 224 156" fill="none" stroke="#c6c6c8" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
                <circle cx="74" cy="164" r="4" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.9" opacity="0.85">
                  <animate attributeName="r" values="4;6;4" dur="2.1s" repeatCount="indefinite" />
                </circle>
                <circle cx="156" cy="159" r="5" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.9" opacity="0.75">
                  <animate attributeName="opacity" values="0.75;0.35;0.75" dur="2.4s" repeatCount="indefinite" />
                </circle>

                <rect x="254" y="32" width="124" height="66" rx="14" fill="#1a1a1c" stroke="#c6c6c8" strokeWidth="0.7" />
                <rect x="260" y="40" width="98" height="12" rx="6" fill="#141416" stroke="#c6c6c8" strokeWidth="0.4" opacity="0.55" />
                <rect x="260" y="58" width="54" height="10" rx="5" fill="#141416" opacity="0.7" />
                <rect x="260" y="72" width="72" height="10" rx="5" fill="#141416" opacity="0.7" />

                <line x1="274" y1="94" x2="334" y2="94" stroke="#c6c6c8" strokeWidth="0.35" opacity="0.35" />
                <line x1="274" y1="108" x2="352" y2="108" stroke="#c6c6c8" strokeWidth="0.35" opacity="0.35" />
                <line x1="274" y1="122" x2="320" y2="122" stroke="#c6c6c8" strokeWidth="0.35" opacity="0.35" />

                <rect x="254" y="122" width="124" height="44" rx="12" fill="#141416" opacity="0.85" stroke="#c6c6c8" strokeWidth="0.5" />
                <circle cx="274" cy="144" r="4" fill="#c6c6c8" opacity="0.8" />
                <circle cx="296" cy="144" r="4" fill="#c6c6c8" opacity="0.8" />
                <circle cx="318" cy="144" r="4" fill="#c6c6c8" opacity="0.8" />

                <rect x="284" y="154" width="32" height="8" rx="4" fill="#c6c6c8" opacity="0.22">
                  <animate attributeName="opacity" values="0.22;0.55;0.22" dur="3s" repeatCount="indefinite" />
                </rect>

                <rect x="46" y="198" width="120" height="14" rx="7" fill="#141416" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.5" />
                <text x="54" y="207" fill="#c6c6c8" fontSize="8" fontFamily="monospace" opacity="0.8">
                  Multimodal frame analysis
                </text>

                <rect x="248" y="198" width="142" height="14" rx="7" fill="#141416" stroke="#c6c6c8" strokeWidth="0.5" opacity="0.5" />
                <text x="256" y="207" fill="#c6c6c8" fontSize="8" fontFamily="monospace" opacity="0.8">
                  Live summary generation
                </text>

                <path d="M 314 82 C 324 72 344 74 354 80" fill="none" stroke="#c6c6c8" strokeWidth="0.7" opacity="0.35">
                  <animate attributeName="d" values="M 314 82 C 324 72 344 74 354 80; M 314 84 C 324 74 344 76 354 82; M 314 82 C 324 72 344 74 354 80" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M 326 94 C 336 84 356 86 366 92" fill="none" stroke="#c6c6c8" strokeWidth="0.6" opacity="0.25">
                  <animate attributeName="d" values="M 326 94 C 336 84 356 86 366 92; M 326 96 C 336 86 356 88 366 94; M 326 94 C 336 84 356 86 366 92" dur="3.2s" repeatCount="indefinite" />
                </path>

                <rect x="312" y="34" width="80" height="4" rx="2" fill="#c6c6c8" opacity="0.12" />
                <rect x="312" y="42" width="58" height="4" rx="2" fill="#c6c6c8" opacity="0.12" />
              </svg>
            </div>
          </div>
        </section>

        <section className={styles.projectsSection} id="selected-work">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Selected Work</span>
            </div>

            <div className={styles.projectGrid}>
              {selectedProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={styles.projectCard}
                  style={{ animationDelay: `${index * 0.12}s` }}
                  onMouseMove={handleTilePointerMove}
                >
                  <div className={styles.projectFrame}>
                    <div className={styles.projectThumbnail}>
                      <ProjectThumbnail projectId={project.id} />
                      <div className={styles.thumbnailOverlay} />
                    </div>
                  </div>
                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title.rendered}</h3>
                    <p className={styles.projectDescription}>
                      {selectedWorkDetails[project.id]?.summary || 'A hand-crafted software project focused on intelligent systems, polished documentation, and thoughtful architecture.'}
                    </p>
                    <div className={styles.projectFooter}>
                      <span>{project.acf?.technologies || 'Software Development'}</span>
                      {project.acf?.github_url ? (
                        <a
                          href={project.acf.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.projectLink}
                        >
                          View code <FaExternalLinkAlt />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = getMockProjects();
  const personalInfo = getMockPersonalInfo();

  return {
    props: {
      projects,
      personalInfo,
    },
  };
};
