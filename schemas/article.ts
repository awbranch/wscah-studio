import { defineField, defineType } from "sanity";
import {
  createImageField,
  createRichTextBlock,
  getFirstBlockText,
  createNoteField,
} from "./utils.js";
import { FaAlignLeft as icon } from "react-icons/fa";

export default defineType({
  name: "article",
  title: "Article",
  type: "object",
  icon,
  fields: [
    createNoteField(
      icon,
      "A component can contain rich text such as headers, paragraphs, hyperlinks, bulleted lists and images.",
    ),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [
        createRichTextBlock({ all: true }),
        createImageField({ name: "image", title: "Image", caption: true }),
        { type: "buttonRow" },
      ],
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      description:
        "Text can flow across multiple columns like a newspaper. When selecting values larger than 1 (the default) the text will be displayed in columns only on wider screens.",
      options: {
        list: [
          { title: "1 column", value: 1 },
          { title: "2 columns", value: 2 },
          { title: "3 columns", value: 3 },
          { title: "4 columns", value: 4 },
        ],
        layout: "dropdown",
      },
      initialValue: 1,
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: { text: "text" },
    prepare({ text }) {
      return {
        title: "Article",
        subtitle: getFirstBlockText(text),
      };
    },
  },
});
