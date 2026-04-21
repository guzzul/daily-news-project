import Image from "next/image";

import { RenderMarkdown } from "./render-markdown";
import { ContentBlock } from "@/lib/schemas/article.schema";

export function ArticleContent({
  content,
  excerpt,
  isPreview = false,
}: {
  content: ContentBlock[];
  excerpt?: string;
  isPreview?: boolean;
}) {
  return (
    <article
      className="
          prose prose-slate lg:prose-xl max-w-none
          dark:prose-invert
          prose-headings:font-bold prose-headings:tracking-tight
          prose-p:leading-relaxed space-y-4
          "
    >
      {!isPreview ? (
        content.map((block, i) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={i}>
                  <RenderMarkdown text={block.text} />
                </p>
              );
            case "heading":
              return block.level === 2 ? (
                <h2
                  key={i}
                  className="text-3xl font-bold tracking-tight border-b pb-2"
                >
                  {block.text}
                </h2>
              ) : (
                <h3 key={i} className="text-2xl font-semibold tracking-tight">
                  {block.text}
                </h3>
              );
            case "blockquote":
              return (
                <blockquote
                  key={i}
                  className="pl-6 italic border-l-4 border-gray-300"
                >
                  {<RenderMarkdown text={block.text} />}
                </blockquote>
              );
            case "unordered-list":
              return (
                <ul key={i} className="list-disc pl-6 ">
                  {block.items.map((item, j) => (
                    <li key={j}>{<RenderMarkdown text={item} />}</li>
                  ))}
                </ul>
              );

            case "ordered-list":
              return (
                <ol key={i} className="list-decimal pl-6">
                  {block.items.map((item, j) => (
                    <li key={j}>{<RenderMarkdown text={item} />}</li>
                  ))}
                </ol>
              );
            case "image":
              return block.src ? (
                <figure key={i} className="my-8">
                  <Image
                    src={block.src?.trim() || ""}
                    alt={block.alt}
                    className="rounded-lg border shadow-sm w-full"
                  />
                  {block.caption && (
                    <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              ) : null;

            default:
              return null;
          }
        })
      ) : (
        <p><RenderMarkdown text={excerpt || ""} />  </p>
      )}
    </article>
  );
}
