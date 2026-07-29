import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import ProjectThumbnail from '../components/ProjectThumbnail';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { getMockProjects, getMockPersonalInfo, Project, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Projects.module.css';

interface ProjectsProps {
  projects: Project[];
  personalInfo: PersonalInfo;
}

export default function Projects({ projects, personalInfo }: ProjectsProps) {
  return (
    <>
      <Head>
        <title>Projects — Achyut Niroula</title>
        <meta name="description" content="Portfolio of projects by Achyut Niroula" />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.projectsSection}>
          <div className="container">
            <span className="eyebrow">Projects</span>
            <h1 className={styles.title}>My Projects</h1>
            <p className={styles.subtitle}>
              A collection of projects showcasing my work in cloud-native systems, multimodal AI, and full-stack web development.
            </p>
            <hr className="rule" />

            <div className={styles.projectsGrid}>
              {projects.map((project) => (
                <div key={project.id} className={styles.projectCard}>
                  <div className={styles.projectThumbnail}>
                    <ProjectThumbnail projectId={project.id} />
                  </div>

                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title.rendered}</h3>

                    <div
                      className={styles.projectDescription}
                      dangerouslySetInnerHTML={{ __html: project.content.rendered }}
                    />

                    {project.acf?.technologies && (
                      <div className={styles.technologies}>
                        {project.acf.technologies.split('·').map((tech, i) => (
                          <span key={i} className={styles.techTag}>{tech.trim()}</span>
                        ))}
                      </div>
                    )}

                    <div className={styles.projectLinks}>
                      {project.acf?.github_url && (
                        <a href={project.acf.github_url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                          <FaGithub /> GitHub
                        </a>
                      )}
                      {project.acf?.project_url && (
                        <a href={project.acf.project_url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
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
  const projects = getMockProjects();
  const personalInfo = getMockPersonalInfo();
  return { props: { projects, personalInfo } };
};
