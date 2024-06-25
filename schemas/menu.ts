import { defineArrayMember, defineField, defineType } from "sanity";
import { IoText as textIcon } from "react-icons/io5";
import { RiRectangleFill as btnIcon } from "react-icons/ri";

export default defineType({
  name: "menu",
  title: "Menu",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      initialValue: "text",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Button", value: "button" },
        ],
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
        list: [
          { title: "Go to Link", value: "link" },
          { title: "Display Menu", value: "menu" },
        ],
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
      variant: "variant",
      name: "name",
      action: "action",
      href: "href",
      items: "items",
    },
    prepare({ variant, name, action, href, items }) {
      return {
        title: name,
        subtitle:
          action === "link"
            ? "Go to Link: " + href
            : "Display menu with " + items.length + " items",
        media: variant === "text" ? textIcon : btnIcon,
      };
    },
  },
});
