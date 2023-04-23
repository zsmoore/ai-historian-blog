import { Post } from "@component/lib/notion";
import Script from "next/script";

export interface ArticleProps {
  post : Post
}

const Article = (props: ArticleProps) => {
  return (
    <>
      <Script type="application/ld+json" id="article-markup">
        {`
        {
          "@context": "https://schema.org,
          "@type": "NewsArticle",
          "headline": "${props.post.title}",
          ${props.post.cover ? `"image": ["${props.post.cover}],` : ""}
          "datePublished": "${props.post.date}",
          "dateModified": "${props.post.date}",
          "author": [{
            "@type": "Person",
            "name": "AI - Bot",
            "url": "https://github.com/zsmoore/ai-historian-blog"
          }]
        }
        `}
      </Script>
    </>
  )
}

export default Article;