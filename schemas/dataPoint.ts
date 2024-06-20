import { defineField, defineType } from "sanity";
import { FaHashtag } from "react-icons/fa6";

export default defineType({
  name: "dataPoint",
  title: "Data Point",
  type: "object",
  icon: FaHashtag,
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule: any) => rule.required().min(1000).max(3000),
    }),
    defineField({
      name: "value",
      title: "Vaue",
      type: "number",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: { year: "year", value: "value" },
    prepare({ year, value }) {
      return {
        title: `${year}: ${value.toLocaleString()}`,
        media: FaHashtag,
      };
    },
  },
});
