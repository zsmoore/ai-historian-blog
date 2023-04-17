import{ Client } from '@notionhq/client';
import {NotionToMarkdown} from 'notion-to-md';


const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({notionClient: notion});

export interface Post {
  id: string,
  title: string,
  tags: string[],
  description: string,
  date: string,
  slug: string
};

const getPageMetaData = (post: any): Post => {
  const getTags = (tags: any): string[] => {
    const allTags = tags.map((tag: any): string => {
      return tag.name;
    });

    return allTags;
  }

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
  }
}

export const getAll = async (): Promise<Post[]> => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID!!,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      }
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      }
    ]
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  })
}

export interface PageResult{
  post: Post,
  markdown: string,
}

export const getSinglePost = async(slug: string): Promise<PageResult> => {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID!!,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    post: metadata,
    markdown: mdString
  };
}