import { getAll, getSinglePost, PageResult, Post } from "@component/lib/notion";
import ReactMarkdown from 'react-markdown';
import { Tags } from "@component/components/tags";
import Footer from "@component/components/footer";
import { ShareBar } from "@component/components/share";
import Head from "next/head";
import Link from "next/link";

interface PostResultProps {
  pageResult: PageResult,
}

export default function PostResult(props: PostResultProps) {
  return (
    <div className="bg-white dark:bg-black">
      <Head>
        <title>{props.pageResult.post.title}</title>
        <meta name="keywords" content={props.pageResult.post.tags.join(', ')}/>
        <meta name="description" content={`${process.env.NEXT_PUBLIC_WEBSITE_TITLE?.replaceAll(/"/g, '')}: ${props.pageResult.post.title}`}/>
      </Head>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <Link href="/" className="flex-items-center">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-md sm:text-lg leading-tight sm:leading-tight lg:leading-relaxed">{process.env.NEXT_PUBLIC_WEBSITE_TITLE?.replaceAll(/"/g, '')}</span>
          </Link>
        </div>
      </nav>
      <div className="justify-center items-center">
        <div className="container mx-auto px-8 max-w-3xl justify-center items-center">
          <div className="prose dark:prose-invert lg:prose-lg mx-auto my-8">
            <div className="py-4">
              <Tags tags={props.pageResult.post.tags} />
            </div>
            <ReactMarkdown>{props.pageResult.markdown}</ReactMarkdown>
          </div>
          <ShareBar slug={props.pageResult.post.slug} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

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
  const paths = posts.map((post: Post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}