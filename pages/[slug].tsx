import { getAll, getSinglePost, PageResult, Post } from "@component/lib/notion";
import ReactMarkdown from 'react-markdown';
import { Tags } from "@component/components/tags";
import Footer from "@component/components/footer";
import { ShareBar } from "@component/components/share";
import { Main } from "next/document";
import Head from "next/head";

interface PostResultProps {
  pageResult: PageResult,
}

export default function PostResult(props: PostResultProps) {
  return (
    <>
      <Head>
        <title>{props.pageResult.post.title}</title>
        <meta name="keywords" content={props.pageResult.post.tags.join(', ')}/>
        <meta name="description" content={`On This Day in History: ${props.pageResult.post.title}`}/>
      </Head>
      <div className="w-screen bg-white dark:bg-black">
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
    </>
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