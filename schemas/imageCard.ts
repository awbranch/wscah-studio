import { defineField, defineType } from "sanity";
import { createNoteField, createImageField, getMediaCard } from "./utils";
import { BsFileRichtext as icon } from "react-icons/bs";

export default defineType({
  name: "imageCard",
  title: "Image Card",
  type: "object",
  icon,
  fields: [
    createNoteField(
      icon,
      "A portrait shaped card that can displays an image, text, and a button. These are typically used in a grid.",
    ),
    createImageField({ name: "image", title: "Image", required: true }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "An optional eyebrow heading that appears above the title.",
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
        const mediaCard = getMediaCard(document, parent._key);
        return !(mediaCard?.clickArea === "button" || mediaCard?.clickArea === "hybrid");
      },
      validation: (rule: any) =>
        rule.custom((buttonLabel: string, { document, parent }: any) => {
          const mediaCard = getMediaCard(document, parent._key);
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
        const mediaCard = getMediaCard(document, parent._key);
        return mediaCard?.clickArea === "none";
      },
      validation: (rule: any) =>
        rule.custom((href: string, { document, parent }: any) => {
          const mediaCard = getMediaCard(document, parent._key);
          if (!(mediaCard?.clickArea === "none") && !href) {
            return "A link is required.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: "title", image: "image" },
    prepare({ title, image }) {
      return {
        title: "Image Card",
        subtitle: title,
        media: image,
      };
    },
  },
});
