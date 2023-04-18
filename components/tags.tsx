interface TagsProps {
  tags: string[];
}

const Tags = (props: TagsProps) => {
  return (
    <div className="mt-4 flex flex-wrap gap-1">
      {props.tags.map((tag: string, index: number) => {
        return (
          <span className="whitespace-nowrap rounded-full bg-blue-100 dark:bg-blue-800 px-2.5 py-0.5 text-xs text-blue-600 dark:text-blue-200" key={index}>
            {tag}
          </span>
        )
      })}
    </div>
  );
};

export {
  Tags,
  type TagsProps,
}