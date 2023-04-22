import Head from 'next/head'
import Link from 'next/link';
import { Post, getAll } from '../lib/notion'
import { Inter } from 'next/font/google'
import PostCard from '@component/components/postcard';
import Footer from '@component/components/footer';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  posts: Post[]
}

export default function Home(props: HomeProps) {
  if (!props.posts) {
    return <h1>No posts</h1>
  }

  return (
    <div className='bg:white dark:bg-black'>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE?.replaceAll(/"/g, '')}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_WEBSITE_SUBTITLE?.replaceAll(/"/g, '' )} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex justify-center items-center'>
        <div className='container mx-4 sm:mx-8 max-w-3xl'>
          <section>
            <div className="px-4 py-32 lg:flex lg:items-center">
              <div className="mx-auto max-w-xl text-center">
                <h1 className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-4xl sm:text-5xl leading-tight sm:leading-tight lg:leading-relaxed">
                  {process.env.NEXT_PUBLIC_WEBSITE_TITLE?.replaceAll(/"/g, '')}
                </h1>
                <p className="mt-4 sm:text-xl/relaxed text-slate-400">
                  {process.env.NEXT_PUBLIC_WEBSITE_SUBTITLE?.replaceAll(/"/g, '' )}
                </p>
              </div>
            </div>
          </section>

          {props.posts.map((post: Post, index: number) => {
            return (
              <section key={index}>
                <Link href={post.slug}>
                  <PostCard post={post} />
                </Link>
              </section>
            );
          })}
        </div>
      </div>
      <Footer />
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
