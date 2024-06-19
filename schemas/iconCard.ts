import { defineField, defineType } from "sanity";
import { createNoteField, validateVectorImageType } from "./utils";
import { BsFileEarmarkEasel } from "react-icons/bs";


export default defineType({
  name: "iconCard",
  title: "Icon Card",
  type: "object",
  icon: BsFileEarmarkEasel,
  fields: [
    createNoteField(
      BsFileEarmarkEasel,
      "A portrait shaped card that can displays an icon, text, and a button. These are typically used in a grid.",
    ),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      validation: (rule: any) => rule.required().assetRequired().custom(validateVectorImageType),
      fields: [
        defineField({
          name: "alt",
          title: "Alternate Text",
          type: "string",
          validation: (rule: any) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "button",
    }),
    defineField({
      name: "href",
      title: "Card Link",
      type: "string",
      description: "Optionally you can set a link for the entire card.",
    }),
  ],
  preview: {
    select: { title: "title", icon: "icon" },
    prepare({ title, icon }) {
      return {
        title: "Icon Card",
        subtitle: title,
        media: icon,
      };
    },
  },
});
