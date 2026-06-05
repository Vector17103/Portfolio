import axios from 'axios';

// WordPress REST API base URL
// Replace this with your actual WordPress site URL
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

export interface BlogPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface Project {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    project_url?: string;
    github_url?: string;
    technologies?: string;
    thumbnail?: string;
    language?: string;
  };
}

export interface PersonalInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
  resume_url: string;
  bio: string;
  profile_image: string;
}

// Fetch all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await axios.get(`${WP_API_URL}/posts?_embed`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Fetch single blog post
export const getBlogPost = async (id: number): Promise<BlogPost | null> => {
  try {
    const response = await axios.get(`${WP_API_URL}/posts/${id}?_embed`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

// Fetch projects (using custom post type)
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(`${WP_API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Fetch personal information (from custom endpoint or options)
export const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
  try {
    const response = await axios.get(`${WP_API_URL}/personal-info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return null;
  }
};

// Mock data for development (remove when WordPress is set up)
export const getMockBlogPosts = (): BlogPost[] => [
  {
    id: 1,
    date: '2024-01-15',
    title: { rendered: 'My Journey in Computer Science' },
    content: { rendered: '<p>Exploring the fascinating world of distributed systems and AI...</p>' },
    excerpt: { rendered: '<p>A brief introduction to my academic journey...</p>' },
    featured_media: 1,
  },
  {
    id: 2,
    date: '2024-01-10',
    title: { rendered: 'Building Secure Applications' },
    content: { rendered: '<p>Security considerations in modern web development...</p>' },
    excerpt: { rendered: '<p>Key principles for building secure applications...</p>' },
    featured_media: 2,
  },
];


export const getMockProjects = (): Project[] => [
  {
    id: 10,
    title: { rendered: 'Resume Optimization Engine' },
    content: {
      rendered: `<p>A Flask + Claude API tool that ingests a resume PDF and job description, then produces a laser-targeted, ATS-optimized LaTeX resume ready to compile on Overleaf — preserving factual accuracy while rewriting impact, metrics, and keywords to match the role.</p>`,
    },
    acf: {
      github_url: 'https://github.com/achyutniroula/ResOptimum',
      technologies: 'Python · Flask · Claude API · pdfplumber · LaTeX',
      language: 'Python',
    },
  },
  {
    id: 9,
    title: { rendered: 'LEON — AI-Powered Learning Platform' },
    content: {
      rendered: `<p>LEON is a voice-first adaptive learning platform that listens, reasons, and responds with a conversational AI tutor. It combines structured curriculum generation, SM-2 spaced repetition reviews, quiz generation, and a knowledge graph to personalize learning with real-time voice interaction.</p>`,
    },
    acf: {
      github_url: 'https://github.com/achyutniroula/LearnOne',
      technologies: 'Python 3.14 · FastAPI · SQLAlchemy · Groq llama-3.3-70b · Groq whisper-large-v3-turbo · PostgreSQL (Supabase) · Redis (Upstash) · React 18 · TypeScript · Vite · Framer Motion · JWT · bcrypt · Web SpeechSynthesis',
      language: 'Full Stack',
    },
  },
  {
    id: 1,
    title: { rendered: 'Multimodal Video Understanding Platform' },
    content: {
      rendered: `<p>A cloud-native video analytics pipeline on AWS integrating 8+ neural models — SigLIP, DepthAnything V2, Mask2Former, SlowFast, ByteTrack, Whisper, and Qwen2-VL — fusing vision, depth, motion, and audio signals into a unified per-frame scene representation with AI-powered narrative generation.</p>`,
    },
    acf: {
      github_url: 'https://github.com/achyutniroula/AI-Video-Analyzer',
      technologies: 'Python · FastAPI · React · AWS (S3, SQS, EC2, DynamoDB) · Docker · Whisper · Qwen2-VL',
      language: 'Python',
    },
  },
  {
    id: 2,
    title: { rendered: 'Cloud Inventory — Landscaping Inventory System' },
    content: {
      rendered: `<p>A full-stack cloud-powered inventory system for landscaping businesses featuring role-based access control (Admin / Editor / Viewer), image uploads, real-time data synchronization, and analytics dashboards. Deployed serverlessly on Google Cloud Run.</p>`,
    },
    acf: {
      thumbnail: '/images/projects/inventory.jpg',
      github_url: 'https://github.com/achyutniroula/Inventory',
      project_url: 'https://niroula-inventory-860558940486.us-central1.run.app/',
      technologies: 'Flask · Python · Firebase · Google Cloud Run · Cloudinary · Chart.js · Docker',
      language: 'Python',
    },
  },
  {
    id: 3,
    title: { rendered: 'Cloud-Chat — Realtime Chat Platform' },
    content: {
      rendered: `<p>A distributed real-time messaging platform on Firebase Realtime Database with WebSocket-based synchronization, event-driven listeners, and role-based access control for non-blocking async message delivery across geographically distributed clients.</p>`,
    },
    acf: {
      thumbnail: '/images/projects/cloud-chat.jpg',
      github_url: 'https://github.com/achyutniroula/Cloud-Chat',
      project_url: 'https://cosc-3657.web.app/',
      technologies: 'Java · Firebase · WebSocket · Maven',
      language: 'Java',
    },
  },
  {
    id: 4,
    title: { rendered: 'JobHunt AI — Intelligent Job Application Assistant' },
    content: {
      rendered: `<p>An AI-powered job search tool that analyzes your resume, scores each job posting for fit, and generates tailored cover letters and optimized application materials automatically — helping candidates surface better-matched roles and apply more effectively.</p>`,
    },
    acf: {
      github_url: 'https://github.com/achyutniroula/job-hunt',
      technologies: 'JavaScript · HTML · CSS · AI/LLM Integration',
      language: 'JavaScript',
    },
  },
  {
    id: 5,
    title: { rendered: 'rlget — CLI File Downloader' },
    content: {
      rendered: `<p>A production-style command-line file downloader with parallel downloads via ThreadPoolExecutor, token bucket rate limiting, exponential backoff with jitter, safe file naming with no-clobber deduplication, and Content-Disposition parsing for robust real-world HTTP handling.</p>`,
    },
    acf: {
      thumbnail: '/images/projects/rlget.jpg',
      github_url: 'https://github.com/achyutniroula/rlget_project',
      technologies: 'Python · ThreadPoolExecutor · Token Bucket · Retry/Backoff · CLI · pytest',
      language: 'Python',
    },
  },
  {
    id: 6,
    title: { rendered: 'PromptShop Test Agent' },
    content: {
      rendered: `<p>A lightweight LLM agent that reads structured prompts from JSON input and routes them to multiple open-source models via OpenRouter's OpenAI-compatible API — designed for automated prompt evaluation and integration with agent execution systems.</p>`,
    },
    acf: {
      thumbnail: '/images/projects/promptshop.jpg',
      github_url: 'https://github.com/achyutniroula/test-agent',
      technologies: 'Python · OpenRouter API · OpenAI-Compatible Client · python-dotenv',
      language: 'Python',
    },
  },
  {
    id: 7,
    title: { rendered: 'Indeed Stealth Scraper' },
    content: {
      rendered: `<p>A web scraper for extracting structured job listings from Indeed using stealth techniques to handle bot detection. Collects job data for analysis and downstream processing pipelines.</p>`,
    },
    acf: {
      github_url: 'https://github.com/achyutniroula/indeed-stealth-scraper',
      technologies: 'Python · Web Scraping · HTML Parsing',
      language: 'Python',
    },
  },
  {
    id: 8,
    title: { rendered: 'Date Validity Checker' },
    content: {
      rendered: `<p>A Java program that validates dates in DDMMYY format including leap-year logic — a beginner project from high school (2019) that now lives on GitHub as a record of where the journey began.</p>`,
    },
    acf: {
      thumbnail: '/images/projects/date-validity.jpg',
      github_url: 'https://github.com/achyutniroula/Date-Validity',
      technologies: 'Java',
      language: 'Java',
    },
  },
];

export const getMockPersonalInfo = (): PersonalInfo => ({
  phone: '+1 (249) 358-0947',
  email: 'niroula.achyut17@gmail.com',
  linkedin: 'https://www.linkedin.com/in/achyut-niroula',
  github: 'https://github.com/achyutniroula',
  instagram: 'https://instagram.com/achniroula',
  resume_url: '/resume.pdf',
  bio: 'Computer Science student at Nipissing University',
  profile_image: '/profile.jpg',
});
