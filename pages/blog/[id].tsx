import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getMockBlogPosts, getMockPersonalInfo, BlogPost, PersonalInfo } from '../../lib/wordpress';
import styles from '../../styles/BlogPost.module.css';

interface BlogPostPageProps {
  post: BlogPost;
  personalInfo: PersonalInfo;
}

export default function BlogPostPage({ post, personalInfo }: BlogPostPageProps) {
  return (
    <>
      <Head>
        <title>{post.title.rendered} - Achyut</title>
        <meta name="description" content={post.excerpt.rendered.replace(/<[^>]*>/g, '')} />
      </Head>

      <Layout personalInfo={personalInfo}>
        <article className={styles.blogPost}>
          <div className="container">
            <Link href="/" className={styles.backLink}>
              ← Back to Home
            </Link>

            <header className={styles.header}>
              <time className={styles.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h1 className={styles.title}>{post.title.rendered}</h1>
            </header>

            <div 
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>
        </article>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getMockBlogPosts();
  
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getMockBlogPosts();
  const post = posts.find((p) => p.id.toString() === params?.id);
  const personalInfo = getMockPersonalInfo();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      personalInfo,
    },
  };
};
