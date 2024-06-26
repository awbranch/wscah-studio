import { defineField, defineType } from "sanity";
import { createRichTextBlock, getFirstBlockText } from "./utils";
import { PiFrameCornersFill as icon } from "react-icons/pi";

export default defineType({
  name: "iframe",
  title: "Iframe",
  type: "object",
  description: "A box that contains an iframe.",
  icon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "An optional eyebrow heading that appears above the title.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      description: "An optional title for the iFrame.",
      of: [createRichTextBlock({ highlighters: true })],
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      description: "Optional text below the title.",
      rows: 3,
    }),
    defineField({
      name: "code",
      title: "Embed Code",
      type: "text",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Iframe",
        subtitle: title ? getFirstBlockText(title) : undefined,
        media: icon,
      };
    },
  },
});
