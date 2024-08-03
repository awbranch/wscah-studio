import { defineField, defineType } from "sanity";
import { TbHierarchy as icon } from "react-icons/tb";

export default defineType({
  name: "newsCategory",
  title: "News Categories",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: {
      label: "label",
    },
    prepare({ label }) {
      return {
        title: label,
        media: icon,
      };
    },
  },
});
