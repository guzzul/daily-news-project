import MarkdownAsync from "react-markdown";
import remarkGfm from "remark-gfm";

export function RenderMarkdown({ text }: { text: string }) {
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