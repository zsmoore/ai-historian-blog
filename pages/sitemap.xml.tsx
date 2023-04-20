import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAll, Post } from "@component/lib/notion"
import { generateSiteMap } from "@component/lib/sitemap";

export default function SiteMap() {

}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const data: Post[] = await getAll();
  const host = context.req.headers.host!!;
  const sitemap = generateSiteMap(data, host);
  context.res.setHeader('Content-Type', 'text/xml');
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  context.res.write(sitemap);
  context.res.end();
  return {
    props: {}
  };
}
