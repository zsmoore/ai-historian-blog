import { getAll, getSinglePost, PageResult, Post } from "@component/lib/notion";
import ReactMarkdown from 'react-markdown';
import styles from '@component/styles/Home.module.css'
import { Inter } from 'next/font/google'


const inter = Inter({subsets: ['latin']});

interface PostResultProps {
  pageResult: PageResult,
}

export default function PostResult(props: PostResultProps) {
  return (
    <div className={styles.container}>
      <main className={inter.className}>
        <div className={styles.container}>
          <section>
            <span>{props.pageResult.post.date}</span>
            <p style={{color: "gray"}}>{props.pageResult.post.tags.join(', ')}</p>
          </section>
          <br/>
          <section className={styles.component}>
            <ReactMarkdown>{props.pageResult.markdown}</ReactMarkdown>
          </section>
        </div>
      </main>
    </div>
  )
};

export interface PropArgs {
  params: any
}

export const getStaticProps = async (args: PropArgs) => {
  const pageResult = await getSinglePost(args.params.slug);

  return {
    props: {
      pageResult: pageResult
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getAll();
  const paths = posts.map((post: Post) => ({ params: { slug: post.slug }}));

  return {
    paths,
    fallback: "blocking",
  };
}