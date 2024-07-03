import { defineArrayMember, defineField, defineType } from "sanity";
import { createPaletteField, createRichTextBlock, validateVectorImageType } from "./utils";
import { FaWindowMaximize as icon } from "react-icons/fa";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon,
  options: {
    singleton: true,
  },
  fieldsets: [{ name: "alert", title: "Alert" }],
  fields: [
    defineField({
      name: "showAlert",
      title: "Show",
      type: "boolean",
      fieldset: "alert",
    }),
    defineField({
      name: "alertPalette",
      title: "Palette",
      type: "string",
      options: {
        list: [
          { title: "Dark Blue", value: "dark-blue" },
          { title: "Blue", value: "blue" },
          { title: "Orange", value: "orange" },
        ],
        layout: "dropdown",
      },
      hidden: ({ document }) => !document?.showAlert,
      initialValue: "dark-blue",
      fieldset: "alert",
      validation: (Rule) =>
        Rule.custom((alertPalette, context) =>
          context?.document?.showAlert && alertPalette === undefined ? "Palette is required" : true,
        ),
    }),
    defineField({
      name: "alertMessage",
      title: "Message",
      type: "array",
      of: [defineArrayMember(createRichTextBlock({ decorators: true, links: true }))],
      hidden: ({ document }) => !document?.showAlert,
      fieldset: "alert",
      validation: (Rule) =>
        Rule.custom((alertMessage, context) =>
          context?.document?.showAlert && alertMessage === undefined ? "Message is required" : true,
        ),
    }),
    defineField({
      name: "menus",
      title: "Menus",
      type: "array",
      of: [defineArrayMember({ type: "menu" })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Header",
      };
    },
  },
});
