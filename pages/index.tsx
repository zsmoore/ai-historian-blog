import Head from 'next/head'
import Link from 'next/link';
import { Post, getAll } from '../lib/notion'
import styles from '@component/styles/Home.module.css'
import { Inter } from 'next/font/google'

const inter = Inter({subsets: ['latin']});

interface HomeProps {
  posts: Post[]
}

export default function Home(props: HomeProps) {
  if(!props.posts) {
    return <h1>No posts</h1>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>On This Day in History</title>
        <meta name="description" content='An AI powered history blog' />
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <main className={inter.className}>
        <h1>On This Day In History</h1>
        {props.posts.map((post: Post, index: number) => {
          return (
            <section key={index} className={styles.card}>
              <div>
                <h2>
                  <Link href={post.slug}>
                    {post.title}
                  </Link>
                </h2>
              </div>
              <div>{post.date}</div>
              <p>{post.description}</p>
            </section>
          );
          })
        }
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const data: Post[] = await getAll();
  return {
    props: {
      posts: data,
    },
    revalidate: 60
  };
};
