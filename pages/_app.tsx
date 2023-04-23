import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src='https://news.google.com/swg/js/v1/swg-basic.js'
        async={true}
        type='application/javascript'/>
      <Script id='google-news'>
        {`(self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
            basicSubscriptions.init({
              type: "NewsArticle",
              isAccessibleForFree: true,
              isPartOfType: ["Product"],
              isPartOfProductId: "CAow7pLOCw:openaccess",
              autoPromptType: "contribution_large",
              clientOptions: { theme: "light", lang: "en" },
            });
          });`
        }
      </Script>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
