import RSS, { FeedOptions } from 'rss';
import { Post } from './notion';

export default function generateRssFeed(baseUrl: string, posts: Post[]): RSS {
  const feedOptions: FeedOptions = {
    title: `${process.env.NEXT_PUBLIC_WEBSITE_TITLE?.replaceAll(/"/g, '')} RSS Feed`,
    description: `RSS Feed for All '${process.env.NEXT_PUBLIC_WEBSITE_TITLE?.replaceAll(/"/g, '')}' Posts`,
    site_url: `https://${baseUrl}`,
    feed_url: `https://${baseUrl}/rss.xml`
  };

  const feed = new RSS(feedOptions);
  posts.map((post: Post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://${baseUrl}/${post.slug}`,
      date: post.date
    })
  })
  return feed;
}