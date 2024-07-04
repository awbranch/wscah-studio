import { defineField, defineType, defineArrayMember } from "sanity";
import {
  createRichTextBlock,
  createTitleTextBlock,
  createNoteField,
  getFirstBlockText,
} from "./utils";
import { GiStrong as icon } from "react-icons/gi";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: icon,
  fields: [
    createNoteField(
      icon,
      "The Hero is a large component that typically sits at the top of the page. It has very large text and a set " +
        "of images and a button. Typically it would be at the top of the homepage and other landing pages",
    ),
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      description: "The main heading for the hero section.",
      of: [createTitleTextBlock()],
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      description: "An optional secondary heading for the hero section.",
      rows: 3,
    }),
    defineField({
      name: "display",
      title: "Image Display",
      type: "string",
      initialValue: "fan",
      options: {
        list: [
          { title: "Fan Images", value: "fan" },
          { title: "Single Image", value: "single" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      description:
        'The list of images to display. If "Image Display" set to "Fan Images" then the first 4 images will be displayed in a fan layout. If "Image Display" set to "Single Image" then only the first image will be displayed.',
      type: "array",
      of: [defineArrayMember({ type: "imageRef" })],
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
