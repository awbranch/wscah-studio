import { defineField, defineType } from "sanity";
import { createTitleTextBlock, createNoteField, getFirstBlockText } from "./utils";
import { BsFileText as icon } from "react-icons/bs";

export default defineType({
  name: "titleCard",
  title: "Title Card",
  type: "object",
  icon,
  fields: [
    createNoteField(
      icon,
      "A portrait shaped card containing text that can be used as the title in a media card set that only has an odd number of cards.",
    ),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "An optional eyebrow header over the title.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      description: "The main title for the card. Can contain highlighted text.",
      of: [createTitleTextBlock()],
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      description: "Optional additional text for the card.",
      rows: 4,
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Title Card",
        subtitle: getFirstBlockText(title),
        media: icon,
      };
    },
  },
});
