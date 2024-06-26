import { defineField, defineType, defineArrayMember } from "sanity";
import {
  createNoteField,
  createTitleTextBlock,
  getFirstBlockText,
  createPaletteField,
} from "./utils";
import { BsGrid3X3GapFill as icon } from "react-icons/bs";

export default defineType({
  name: "mediaCardSet",
  title: "Media Card Set",
  type: "object",
  icon: icon,
  fields: [
    createNoteField(
      icon,
      "A set of portrait shaped cards that can contain a mix of images, icons, data, and text displayed in a grid.",
    ),
    createPaletteField({
      name: "palette",
      title: "Card Palette",
      description: "The color palette applied to each card.",
    }),
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
      description: "An optional title for the media cards.",
      of: [createTitleTextBlock()],
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      description: "Optional text below the title.",
      rows: 3,
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({ type: "imageCard" }),
        defineArrayMember({ type: "iconCard" }),
        defineArrayMember({ type: "dataCard" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", cards: "cards" },
    prepare({ title, cards }) {
      return {
        title: `Media Card Set (${cards?.length} cards)`,
        subtitle: title ? getFirstBlockText(title) : undefined,
        media: icon,
      };
    },
  },
});
