import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import styles from '../styles/Footer.module.css';

interface FooterProps {
  personalInfo?: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
}

const Footer = ({ personalInfo }: FooterProps) => {
  const info = personalInfo || {
    phone: '+1 (123) 456-7890',
    email: 'your.email@example.com',
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername',
    instagram: 'https://instagram.com/yourprofile',
  };

  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Get In Touch</h3>
            <div className={styles.contactInfo}>
              <a href={`mailto:${info.email}`} className={styles.contactItem}>
                <FaEnvelope />
                <span>{info.email}</span>
              </a>
              <a href={`tel:${info.phone}`} className={styles.contactItem}>
                <FaPhone />
                <span>{info.phone}</span>
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Connect With Me</h3>
            <div className={styles.socials}>
              <a 
                href={info.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialIcon}
              >
                <FaLinkedin />
              </a>
              <a 
                href={info.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={styles.socialIcon}
              >
                <FaGithub />
              </a>
              <a 
                href={info.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialIcon}
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Achyut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
