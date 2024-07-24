import { defineField, defineType } from "sanity";
import { TbFileTypeHtml as icon } from "react-icons/tb";

export default defineType({
  name: "embeddedHtml",
  title: "Embedded HTML",
  type: "object",
  description: "A box that contains embedded html such as an iFrame or JavaScript.",
  icon,
  fields: [
    defineField({
      name: "html",
      title: "HTML Code",
      type: "text",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Embedded HTML",
        media: icon,
      };
    },
  },
});
