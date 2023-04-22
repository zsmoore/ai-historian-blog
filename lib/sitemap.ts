import { Post } from "./notion"

export const generateSiteMap = (posts: Post[], host: string): string  => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      <url>
        <loc>https://${host}</loc>
      </url>
      ${posts
        .map((post: Post) => {
          return `
        <url>
          <loc>https://${host}/${post.slug}</loc>
          <lastmod>${post.date}</lastmod>
          ${shouldIncludeNews(post.date) ? 
          `
          <news:news>
            <news:publication>
              <news:name>${process.env.NEXT_PUBLIC_WEBSITE_TITLE?.replaceAll(/"/g, '')}</news:name>
              <news:language>en</news:language>
            </news:publication>
            <news:publication_date>${post.date}</news:publication_date>
            <news:title>${post.title}</news:title>
          </news:news>
          `
          : ''
        }
        </url>
        `;
        })
        .join('')}
    </urlset>
  `;
}

const shouldIncludeNews = (dateString: string): boolean => {
  const dateObj = new Date(Date.parse(dateString));
  const current = new Date();
  const diffInDays = Math.ceil((current.getTime() - dateObj.getTime()) / (1000 * 3600 * 24));
  return diffInDays <= 2;
}