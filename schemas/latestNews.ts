import { defineField, defineType } from "sanity";
import { createRichTextBlock, createNoteField, getFirstBlockText } from "./utils";

import { FaBell as icon } from "react-icons/fa6";

export default defineType({
  name: "latestNews",
  title: "Latest News",
  type: "object",
  icon,
  fields: [
    createNoteField(icon, "Displays the most recent news stories in a Media Card Set."),
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
      description: "An optional title for the latest news.",
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
      name: "count",
      title: "Count",
      type: "number",
      description: "The number of stories to display.",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", count: "count" },
    prepare({ title, count }) {
      return {
        title: `Latest News (${count} stories)`,
        subtitle: getFirstBlockText(title),
        media: icon,
      };
    },
  },
});
