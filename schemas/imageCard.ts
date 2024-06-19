import { defineField, defineType } from "sanity";
import { createNoteField, createPaletteField, createImageField } from "./utils";
import { BsFileEarmarkImage } from "react-icons/bs";

export default defineType({
  name: "imageCard",
  title: "Image Card",
  type: "object",
  icon: BsFileEarmarkImage,
  fields: [
    createNoteField(
      BsFileEarmarkImage,
      "A portrait shaped card that can displays an image, text, and a button. These are typically used in a grid.",
    ),
    createImageField({ name: "image", title: "Image", required: true }),
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
      name: "button",
      title: "Button",
      type: "button",
    }),
    defineField({
      name: "href",
      title: "Card Link",
      type: "string",
      description: "Optionally you can set a link for the entire card.",
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
