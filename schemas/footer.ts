import { defineArrayMember, defineField, defineType } from "sanity";
import { validateVectorImageType } from "./utils";

import { FaWindowMinimize as icon } from "react-icons/fa";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon,
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "newsletter",
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      description: "The name of the organization that the website is for.",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Addresses",
      type: "array",
      of: [defineArrayMember({ type: "address" })],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "fax",
      title: "Fax",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "array",
      of: [{ type: "social" }],
    }),
    defineField({
      name: "siteMap",
      title: "Site Map",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
      };
    },
  },
});
