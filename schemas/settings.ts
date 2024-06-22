import { defineArrayMember, defineField, defineType } from "sanity";
import { validateRasterImageTypes } from "./utils.jsx";
import { FaGear as icon } from "react-icons/fa6";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon,
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      description:
        "The sets the website name displayed in the browser's title bar or tab, used in search engine results, and shown when shared on social media.",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Search Engine Description",
      type: "text",
      description:
        "This description is not displayed to the user. This is the default summary of any page in the website if one is not set at the page level. It is used for search engines to help index the page.",
    }),
    defineField({
      name: "socialImage",
      title: "Default Social Media Preview Image",
      type: "image",
      description:
        "When links to the website are shared on social media this preview image will be shown. The proper size for these images changes over time. Please check online for the proper dimensions.",
      validation: (rule: any) => rule.required().assetRequired().custom(validateRasterImageTypes),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "redirects",
      title: "Redirects",
      type: "array",
      of: [defineArrayMember({ type: "redirect" })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
