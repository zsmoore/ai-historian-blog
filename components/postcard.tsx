import { Post } from "@component/lib/notion";
import { Tags } from "./tags";
import Image from 'next/image'

interface PostCardProps {
  post: Post;
}

const PostCard = (props: PostCardProps) => {
  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm transition hover:shadow-xl dark:hover:shadow-blue-900 dark:hover:shadow-lg sm:p-6 my-8 flex mb-4"
    >
      { props.post.cover
          ? (<div className="sm:w-1/3 relative">
              <Image className="object-scale-down"
              src={props.post.cover}
              alt="Cover Image"
              fill={true} />
            </div>)
          : <></>
        }
      <div className={`rounded-[10px] p-4 sm:p-6 ${props.post.cover ? "sm:w-2/3" : ""}`}>
        <time className="block text-xs text-gray-500">
          {props.post.date}
        </time>

        <h3 className="mt-0.5 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-200">
          {props.post.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {props.post.description}
        </p>

        <Tags tags={props.post.tags} />

      </div>
    </div>
  );
}

export default PostCard;