import { defineField, defineType } from "sanity";
import { createTitleTextBlock, createNoteField, getFirstBlockText } from "./utils";
import { alignment } from "./globals";
import { FaAlignJustify as icon } from "react-icons/fa6";

export default defineType({
  name: "title",
  title: "Title",
  type: "object",
  icon: icon,
  fieldsets: [
    {
      name: "advanced",
      title: "Advanced Options",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    createNoteField(
      icon,
      "The Title component is a simple component with a large heading and optional eyebrow and text. It is used to display a title over another component.",
    ),
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
      name: "text",
      title: "Text",
      type: "text",
      description: "Optional text below the title.",
    }),
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
      fieldset: "advanced",
    }),
    defineField({
      name: "maxWidth",
      title: "Max Width",
      description:
        "The optional maximum width the titles. Narrower widths help avoid long line lenghts. If not set it will use the max width of the page.",
      type: "string",
      options: {
        list: [
          { title: "Large", value: "lg" },
          { title: "Medium", value: "md" },
          { title: "Small", value: "sm" },
          { title: "Extra Small", value: "xs" },
        ],
        layout: "dropdown",
      },
      fieldset: "advanced",
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
