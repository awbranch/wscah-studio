import { defineField, defineType, defineArrayMember } from "sanity";
import {
  createImageField,
  createRichTextBlock,
  createNoteField,
  getFirstBlockText,
} from "../utils/utils";
import { FaCircleExclamation } from "react-icons/fa6";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: FaCircleExclamation,
  description: "Displays a large image and text that typically appears at the top of a webpage.",
  fields: [
    createNoteField(
      "The Hero is a large component that typically sits at the top of the page. It has very large text and a set " +
        "of images and a button. Typically it would be at the top of the homepage and other landing pages",
    ),
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      description: "The main heading for the hero section.",
      of: [createRichTextBlock({ highlighters: true })],
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "array",
      description: "An optional secondary heading for the hero section.",
      of: [createRichTextBlock()],
    }),
    defineField({
      name: "images",
      title: "Fan Images",
      description: "The list of images to display in the image fan.",
      type: "array",
      of: [defineArrayMember({ type: "carouselImage" })],
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "button",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      description: "Optional text that appears below the button can can contain links.",
      of: [createRichTextBlock({ links: true })],
    }),
  ],
  preview: {
    select: { text: "text", image: "image" },
    prepare({ text, image }) {
      return {
        title: "Hero",
        subtitle: getFirstBlockText(text),
        media: image,
      };
    },
  },
});
