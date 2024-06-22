import { defineField, defineType, defineArrayMember } from "sanity";
import { createRichTextBlock, createNoteField, getFirstBlockText, createImageField } from "./utils";
import { FaAddressCard as icon } from "react-icons/fa";

export default defineType({
  name: "callToAction",
  title: "Call to Action",
  type: "object",
  icon,
  fields: [
    createNoteField(
      icon,
      "A Call to Action (CTA) is a component with an image on one side with a large heading, a subtitle, and button on the other. It typically asks the user to perform some action.",
    ),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: {
        list: [
          { title: "Image on the Left", value: "left" },
          { title: "Image on the Right", value: "right" },
        ],
        layout: "dropdown",
      },
      initialValue: "left",
      validation: (rule: any) => rule.required(),
    }),

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
      type: "array",
      description: "The title of the Call to Action.",
      of: [createRichTextBlock({ highlighters: true })],
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      description: "Optional text below the title.",
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "array",
      of: [defineArrayMember({ type: "button" })],
      validation: (rule) => rule.max(1),
    }),
  ],
  preview: {
    select: { title: "title", image: "image" },
    prepare({ title, image }) {
      return {
        title: "Call to Action",
        subtitle: getFirstBlockText(title),
        media: image,
      };
    },
  },
});
