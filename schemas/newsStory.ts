import { defineArrayMember, defineField, defineType } from "sanity";
import { FaNewspaper as icon } from "react-icons/fa6";
import { createImageField, createRichTextBlock } from "./utils";
import { components } from "./components";

export default defineType({
  name: "newsStory",
  title: "News Story",
  type: "document",
  icon,
  fields: [
    defineField({
      title: "Categories",
      name: "categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "newsCategory" }],
          options: {
            disableNew: true,
          },
        }),
      ],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "MM/DD/YYYY",
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule: any) => rule.required(),
      options: {
        source: (doc: any): any => {
          if (
            doc.title &&
            typeof doc.title === "string" &&
            doc.date &&
            typeof doc.date === "string"
          ) {
            return doc.date + "-" + doc.title.toLowerCase().replace(/\s+/g, "-");
          }
        },
      },
    }),
    defineField({
      name: "hidden",
      title: "Hidden",
      type: "boolean",
      description:
        "You can hide a news story rather than deleting if if you want to not show it temporarily",
      initialValue: false,
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      description: "A short summary that appears with the preview image on the news summary page.",
      validation: (rule: any) => rule.required(),
    }),
    createImageField({ name: "previewImage", title: "Preview Image", required: true }),

    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [
        createRichTextBlock({ all: true }),
        createImageField({ name: "image", title: "Image", caption: true }),
        { type: "buttonRow" },
      ],
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Additional Blocks",
      description:
        "Additional blocks to append to the bottom of the article and additional components.",
      type: "array",
      of: [{ type: "pageBlock" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      hidden: "hidden",
    },
    prepare({ title, date, hidden }) {
      const parts = date?.split("-");
      let subtitle = date ? `${parts[1]}/${parts[2]}/${parts[0]}` : "date not set";
      if (hidden) {
        subtitle += " - hidden";
      }

      return {
        title,
        subtitle,
        media: icon,
      };
    },
  },
  orderings: [
    {
      title: "Date",
      name: "date",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
