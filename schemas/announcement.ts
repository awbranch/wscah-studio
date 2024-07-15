import { defineField, defineType, defineArrayMember } from "sanity";
import { createNoteField } from "./utils";
import { BsMegaphoneFill as icon } from "react-icons/bs";

export default defineType({
  name: "announcement",
  title: "Announcement",
  type: "object",
  icon,
  fields: [
    createNoteField(
      icon,
      "An announcement is a prominent component that that can be used to draw attention to important information.",
    ),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      initialValue: "orange",
      options: {
        list: [
          { title: "Orange with white text", value: "orange" },
          { title: "Green with white text", value: "green" },
          { title: "Blue with white text", value: "blue" },
        ],
        layout: "dropdown",
      },
      validation: (rule: any) => rule.required(),
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
      type: "text",
      description: "The main heading for the hero section.",
      validation: (rule: any) => rule.required(),
      rows: 4,
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      description: "Optional text below the title.",
      rows: 4,
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "array",
      of: [defineArrayMember({ type: "button" })],
      validation: (rule) => rule.max(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Announcement",
        subtitle: title,
        media: icon,
      };
    },
  },
});
