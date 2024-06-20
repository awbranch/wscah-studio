import { defineField, defineType, defineArrayMember } from "sanity";
import { createRichTextBlock, createNoteField, getFirstBlockText } from "./utils";
import { GiSpiderMask } from "react-icons/gi";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: GiSpiderMask,
  fields: [
    createNoteField(
      GiSpiderMask,
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
      type: "text",
      description: "An optional secondary heading for the hero section.",
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
      type: "array",
      of: [defineArrayMember({ type: "button" })],
      validation: (rule) => rule.max(1),
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
    select: { title: "title", image: "image" },
    prepare({ title, image }) {
      return {
        title: "Hero",
        subtitle: getFirstBlockText(title),
        media: image,
      };
    },
  },
});
