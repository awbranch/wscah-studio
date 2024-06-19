import { defineField, defineType } from "sanity";
import { FaLink as icon } from "react-icons/fa";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      href: "href",
    },
    prepare({ name, href }) {
      return {
        title: name,
        subtitle: href,
        icon: icon,
      };
    },
  },
});
