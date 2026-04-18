import { z } from "zod";

/**
 * Content blocks
 */
const ParagraphBlock = z.object({
  type: z.literal("paragraph"),
  text: z.string(),
});

const HeadingBlock = z.object({
  type: z.literal("heading"),
  level: z.number(),
  text: z.string(),
});

const UnorderedListBlock = z.object({
  type: z.literal("unordered-list"),
  items: z.array(z.string()),
});

const OrderedListBlock = z.object({
  type: z.literal("ordered-list"),
  items: z.array(z.string()),
});

const ImageBlock = z.object({
  type: z.literal("image"),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const BlockquoteBlock = z.object({
  type: z.literal("blockquote"),
  text: z.string(),
});

/**
 * Union of all content types
 */
export const ContentBlockSchema = z.discriminatedUnion("type", [
  ParagraphBlock,
  HeadingBlock,
  UnorderedListBlock,
  OrderedListBlock,
  ImageBlock,
  BlockquoteBlock,
]);

export type ContentBlock = z.infer<typeof ContentBlockSchema>;
