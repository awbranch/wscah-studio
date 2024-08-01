import { defineField, defineType, defineArrayMember } from "sanity";
import {
  createPaletteField,
  createTitleTextBlock,
  getFirstBlockText,
  createImageField,
} from "./utils";
import { TbAlignBoxLeftTop as icon } from "react-icons/tb";

export default defineType({
  name: "pageHeader",
  title: "Page Header",
  type: "object",
  icon: icon,
  fields: [
    createPaletteField({ name: "palette", title: "Palette", required: false }),
    defineField({
      name: "breadcrumbs",
      title: "Breadcrumbs",
      type: "boolean",
      description: "Optionally display a breadcrumb across the top.",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      description: "Optional title for the page header.",
      of: [createTitleTextBlock()],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional secondary heading for the page header.",
      rows: 5,
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "button" })],
    }),
    createImageField({ name: "image", title: "Image", required: false }),
    defineField({
      name: "wallpaper",
      title: "Wallpaper",
      type: "boolean",
      description: "Optionally display the confetti wallpaper behind the header.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Page Header",
        subtitle: getFirstBlockText(title),
        media: icon,
      };
    },
  },
});
