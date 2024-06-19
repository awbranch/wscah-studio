import { defineField, defineType } from "sanity";
import { FaRegHandPointer as icon } from "react-icons/fa";

export default defineType({
  name: "button",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Orange Solid", value: "orange-solid" },
          { title: "White Solid", value: "white-solid" },
          { title: "White Text", value: "white-text" },
          { title: "Blue Text", value: "blue-text" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "orange-solid",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Optionally you can add a chevron icon to the button.",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Chevron Left", value: "left" },
          { title: "Chevron Right", value: "right" },
          { title: "Chevron Down", value: "down" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),

    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "The displayed text of the button.",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "The page or URL to navigate to when clicking on the button.",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: {
      label: "label",
      link: "href",
      style: "style",
    },
    prepare({ label, link, style }) {
      return {
        title: `${label || ""} - (${style || ""})`,
        subtitle: link,
        icon: icon,
      };
    },
  },
});
