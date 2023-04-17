import RSS, { FeedOptions } from 'rss';
import fs from 'fs';
import { Post } from './notion';
import path from 'path';

export default async function generateRssFeed(baseUrl: string, posts: Post[]) {
  const feedOptions: FeedOptions = {
    title: 'On This Day in History  RSS Feed',
    description: 'RSS Feed for All Day in History Posts',
    site_url: baseUrl,
    feed_url: `${baseUrl}/rss.xml`
  };

  const feed = new RSS(feedOptions);
  posts.map((post: Post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${post.slug}`,
      date: post.date
    })
  })

  const fullPath = path.join(process.cwd(), 'public', 'rss.xml')
  if (fs.existsSync(fullPath)) {
    await fs.promises.unlink(fullPath);
  }

  fs.writeFileSync(fullPath, feed.xml({indent: true}));
}