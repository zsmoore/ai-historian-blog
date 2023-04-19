interface ShareBarProps {
  slug: string;
}

const ShareBar = (props: ShareBarProps) => {
  return (
    <div className="max-w-full flex flex-row justify-end my-8">
      <a
        className="inline-flex items-center gap-2 rounded-full border border-sky-600 px-8 py-3 text-sky-600 hover:bg-sky-600 hover:text-white focus:outline-none focus:ring active:bg-sky-600 transition hover:shadow-xl hover:scale-110"
        href={'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent('https://ai-historian-blog.vercel.app/' + props.slug)}
        target="_blank"
        rel="noreferrer"
      >
        Share on
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"
          />
        </svg>
      </a>
    </div>
  );
}

export {
  ShareBar,
  type ShareBarProps,
}