import { defineField, defineType, defineArrayMember } from "sanity";
import { createNoteField, getFirstBlockText, createPaletteField } from "./utils";
import { BsGrid3X3Gap } from "react-icons/bs";

export default defineType({
  name: "mediaCardSet",
  title: "Media Card Set",
  type: "object",
  icon: BsGrid3X3Gap,
  fields: [
    createNoteField(
      BsGrid3X3Gap,
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
        defineArrayMember({ type: "titleCard" }),
        defineArrayMember({ type: "dataCard" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", cards: "cards" },
    prepare({ title, cards }) {
      return {
        title: "Media Card Set",
        subtitle: `Containing ${cards?.length} cards`,
        media: BsGrid3X3Gap,
      };
    },
  },
});
