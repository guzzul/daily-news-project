import Image from "next/image";

import MarkdownAsync from "react-markdown";
import remarkGfm from "remark-gfm";
import { ContentBlock } from "@/lib/schemas/article.schema";

function renderMarkdown({ text }: { text: string }) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      unwrapDisallowed
      allowedElements={[
        "a",
        "strong",
        "em",
        "code",
        "ul",
        "ol",
        "li",
        "blockquote",
        "h1",
        "h2",
        "h3",
      ]}
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {children}
          </a>
        ),
      }}
    >
      {text}
    </MarkdownAsync>
  );
}

export default function ArticleContent({
  content,
}: {
  content: ContentBlock[];
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
      {content.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{renderMarkdown({ text: block.text })}</p>;
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
                {renderMarkdown({ text: block.text })}
              </blockquote>
            );
          case "unordered-list":
            return (
              <ul key={i} className="list-disc pl-6 ">
                {block.items.map((item, j) => (
                  <li key={j}>{renderMarkdown({ text: item })}</li>
                ))}
              </ul>
            );

          case "ordered-list":
            return (
              <ol key={i} className="list-decimal pl-6">
                {block.items.map((item, j) => (
                  <li key={j}>{renderMarkdown({ text: item })}</li>
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
      })}
    </article>
  );
}
