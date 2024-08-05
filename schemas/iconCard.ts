import { defineField, defineType } from "sanity";
import { createNoteField, validateVectorImageType, findMediaCard } from "./utils";
import { BsFileMedical as icon } from "react-icons/bs";

export default defineType({
  name: "iconCard",
  title: "Icon Card",
  type: "object",
  icon,
  fields: [
    createNoteField(
      icon,
      "A portrait shaped card that displays an icon, text, and a button. These are typically used in a grid.",
    ),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      description: "Use a square SVG icon.",
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
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "string",
      description: "The label for the button.",
      hidden: ({ document, parent }: any) => {
        const mediaCard = findMediaCard(document, parent._key);
        return !(mediaCard?.clickArea === "button" || mediaCard?.clickArea === "hybrid");
      },
      validation: (rule: any) =>
        rule.custom((buttonLabel: string, { document, parent }: any) => {
          const mediaCard = findMediaCard(document, parent._key);
          if (
            (mediaCard?.clickArea === "button" || mediaCard?.clickArea === "hybrid") &&
            !buttonLabel
          ) {
            return "A button label is required.";
          }
          return true;
        }),
    }),
    defineField({
      name: "href",
      title: "Button or Card Link",
      type: "string",
      description: "The link for the button or card",
      hidden: ({ document, parent }) => {
        const mediaCard = findMediaCard(document, parent._key);
        return mediaCard?.clickArea === "none";
      },
      validation: (rule: any) =>
        rule.custom((href: string, { document, parent }: any) => {
          const mediaCard = findMediaCard(document, parent._key);
          if (!(mediaCard?.clickArea === "none") && !href) {
            return "A link is required.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: "title", icon: "icon" },
    prepare({ title, icon }) {
      return {
        title: "Icon Card",
        subtitle: title,
        media: icon,
      };
    },
  },
});
