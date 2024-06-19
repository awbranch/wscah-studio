import { defineArrayMember, defineField, defineType } from "sanity";
import { createRichTextBlock, validateVectorImageType } from "../utils/utils";

import { FaWindowMinimize } from "react-icons/fa";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: FaWindowMinimize,
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
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
