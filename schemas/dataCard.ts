import { defineField, defineType, defineArrayMember } from "sanity";
import { createNoteField } from "./utils";
import { BsFileSpreadsheet } from "react-icons/bs";

export default defineType({
  name: "dataCard",
  title: "Data Card",
  type: "object",
  icon: BsFileSpreadsheet,
  fields: [
    createNoteField(
      BsFileSpreadsheet,
      "A portrait shaped card that displays an data, text, and a button. These are typically used in a grid.",
    ),
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
      name: "units",
      title: "Display Units",
      type: "string",
      options: {
        list: [
          { title: "Percentage (%)", value: "%" },
          { title: "Number", value: "N" },
          { title: "Thousands (K)", value: "K" },
          { title: "Millions (M)", value: "M" },
          { title: "Billions (B)", value: "B" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "data",
      title: "Data",
      type: "array",
      of: [defineArrayMember({ type: "dataPoint" })],
    }),
  ],
  preview: {
    select: { title: "title", icon: "icon" },
    prepare({ title, icon }) {
      return {
        title: "Data Card",
        subtitle: title,
        media: icon,
      };
    },
  },
});
