import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsletter",
  title: "Newsletter",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Button Label",
      type: "string",
      description: "The label for the button.",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Button Link",
      type: "string",
      description: "The link for the button or card",
      validation: (rule: any) => rule.required(),
    }),
  ],
});
