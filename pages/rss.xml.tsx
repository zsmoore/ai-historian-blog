import { getAll, Post } from "@component/lib/notion"
import generateRssFeed from "@component/lib/rss";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import RSS from "rss";

export default function RSSPage() {

}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const data: Post[] = await getAll();
  const rss: RSS = generateRssFeed(context.req.headers.host!!, data);
  context.res.setHeader('Content-type', 'text/xml');
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  context.res.write(rss.xml({indent: true}));
  context.res.end();
  return {
    props: { },
  }
}