import { defineField, defineType, defineArrayMember } from "sanity";
import { createRichTextBlock, createNoteField, getFirstBlockText } from "./utils";
import { BsMegaphone } from "react-icons/bs";

export default defineType({
  name: "announcement",
  title: "Announcement",
  type: "object",
  icon: BsMegaphone,
  fields: [
    createNoteField(
      BsMegaphone,
      "An announcement is a prominent component that that can be used to draw attention to important information.",
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
      type: "text",
      description: "The main heading for the hero section.",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      description: "Optional text below the title.",
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
        subtitle: getFirstBlockText(title),
        media: BsMegaphone,
      };
    },
  },
});
