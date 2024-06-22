import { defineField, defineType } from "sanity";
import { FaMapPin as icon } from "react-icons/fa6";

export default defineType({
  name: "address",
  title: "Address",
  type: "object",
  icon,
  fields: [
    defineField({
      name: "street",
      title: "Street",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "zip",
      title: "Zip",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
  ],
});
