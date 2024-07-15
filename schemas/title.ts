import { defineField, defineType } from "sanity";
import { createTitleTextBlock, createNoteField, getFirstBlockText } from "./utils";
import { alignment } from "./globals";
import { FaAlignJustify as icon } from "react-icons/fa6";

export default defineType({
  name: "title",
  title: "Title",
  type: "object",
  icon: icon,
  fields: [
    createNoteField(
      icon,
      "The Title component is a simple component with a large heading and optional eyebrow and text. It is used to display a title over another component.",
    ),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: alignment,
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "center",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "maxWidth",
      title: "Max Width",
      description:
        "The optional maximum width the titles. Narrower widths help avoid long line lengths. If not set it will use the max width of the page.",
      type: "string",
      options: {
        list: [
          { title: "Large", value: "lg" },
          { title: "Medium", value: "md" },
          { title: "Small", value: "sm" },
          { title: "Extra Small", value: "xs" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
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
      description: "The main title.",
      of: [createTitleTextBlock()],
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "titleSize",
      title: "Title Size",
      description:
        "The size of the text in the title. Longer titles may benefit from smaller sizes.",
      type: "string",
      options: {
        list: [
          { title: "Large", value: "lg" },
          { title: "Medium", value: "md" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "lg",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      description: "Optional text below the title.",
    }),
  ],
  preview: {
    select: { title: "title", image: "image" },
    prepare({ title, image }) {
      return {
        title: "Title",
        subtitle: getFirstBlockText(title),
        media: image,
      };
    },
  },
});
