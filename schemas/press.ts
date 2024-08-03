import { defineField, defineType } from "sanity";
import { FaNewspaper as icon } from "react-icons/fa6";

export default defineType({
  name: "press",
  title: "Press",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      validation: (rule: any) => rule.required(),
      description: "The source of the news story",
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      options: {
        dateFormat: "MM/DD/YYYY",
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (rule: any) => rule.required().uri({ allowRelative: false }),
    }),
  ],
  preview: {
    select: {
      source: "source",
      logo: "logo",
      title: "title",
      date: "date",
    },
    prepare({ source, logo, title, date }) {
      const parts = date?.split("-");
      let subtitle = date ? `${parts[1]}/${parts[2]}/${parts[0]}` : "date not set";

      return {
        title: source,
        subtitle,
        media: logo || icon,
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
