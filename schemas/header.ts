import { defineArrayMember, defineField, defineType } from "sanity";
import { createRichTextBlock, validateVectorImageType } from "./utils";
import { FaWindowMaximize as icon } from "react-icons/fa";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon,
  options: {
    singleton: true,
  },
  fieldsets: [{ name: "alert", title: "Alert" }],
  fields: [
    defineField({
      name: "showAlert",
      title: "Show",
      type: "boolean",
      fieldset: "alert",
    }),
    defineField({
      name: "alertMessage",
      title: "Message",
      type: "array",
      of: [defineArrayMember(createRichTextBlock({ decorators: true, links: true }))],
      hidden: ({ document }) => !document?.showAlert,
      fieldset: "alert",
    }),
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
      name: "menuButtons",
      title: "Menu Buttons",
      type: "array",
      of: [defineArrayMember({ type: "menuButton" })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Header",
      };
    },
  },
});
