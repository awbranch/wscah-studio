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
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({ type: "imageCard" }),
        defineArrayMember({ type: "iconCard" }),
        defineArrayMember({ type: "dataCard" }),
        defineArrayMember({ type: "titleCard" }),
      ],
    }),
  ],
  preview: {
    select: { cards: "cards" },
    prepare({ cards }) {
      return {
        title: "Media Card Set",
        subtitle: `Containing ${cards?.length} cards`,
        media: icon,
      };
    },
  },
});
