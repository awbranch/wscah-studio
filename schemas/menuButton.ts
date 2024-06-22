import { defineArrayMember, defineField, defineType } from "sanity";
import { IoText as textIcon } from "react-icons/io5";
import { RiRectangleFill as btnIcon } from "react-icons/ri";

const styleList = [
  { title: "Text Button", value: "text" },
  { title: "Rounded Button", value: "rounded" },
];

const actionList = [
  { title: "Go to Link", value: "link" },
  { title: "Display Menu", value: "menu" },
];

export default defineType({
  name: "menuButton",
  title: "Menu Button",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      initialValue: "text",
      options: {
        list: styleList,
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "action",
      title: "Action",
      type: "string",
      initialValue: "link",
      options: {
        list: actionList,
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      hidden: ({ parent }) => !(parent?.action === "link"),
      validation: (rule: any) =>
        rule.custom((href: any, { parent }: any) => {
          if (!href && parent.action === "link") {
            return 'Required when Action is "Go to Link"';
          }
          return true;
        }),
    }),
    defineField({
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [defineArrayMember({ type: "menuItem" })],
      hidden: ({ parent }) => !(parent?.action === "menu"),
    }),
  ],
  preview: {
    select: {
      style: "style",
      name: "name",
      href: "href",
      action: "action",
    },
    prepare({ style, name, href, action }) {
      return {
        title: style === "text" ? "Text Button" : "Rounded Button",
        subtitle: name,
        media: style === "text" ? textIcon : btnIcon,
      };
    },
  },
});
