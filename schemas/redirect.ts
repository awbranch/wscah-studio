import { defineField, defineType } from "sanity";
import { FaArrowRight as icon } from "react-icons/fa6";

export default defineType({
  name: "redirect",
  title: "Redirect",
  type: "object",
  icon,
  description: "If you move a page, you can redirect people from the old to new route.",
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: { source: "source", destination: "destination" },
    prepare({ source, destination }) {
      return {
        title: `${source} to: ${destination}`,
        media: icon,
      };
    },
  },
});
