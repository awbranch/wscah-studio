import { defineField, defineType, defineArrayMember } from "sanity";
import { createNoteField, createPaletteField } from "./utils";
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
      description:
        "The color palette applied to each card. If not set the cards will not have separate background color from the cotaining block.",
      required: false,
    }),

    defineField({
      name: "clickArea",
      title: "Click Area",
      type: "string",
      description: "Defines where the user can click on the card.",
      options: {
        list: [
          {
            title: "Card Only: Entire card is clickable. No button shown.",
            value: "card",
          },
          { title: "Button Only: Button shown and is clickable.", value: "button" },
          {
            title: "Button or Card - Entire card is clickable. Button shown and clickable.",
            value: "hybrid",
          },
          { title: "None - Card isn't clickable. No button shown.", value: "none" },
        ],
        layout: "dropdown",
      },
      initialValue: "button",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "buttonVariant",
      title: "Button Variant",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Solid", value: "solid" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "text",
      hidden: ({ parent }) => !(parent?.clickArea === "button" || parent?.clickArea === "hybrid"),
      validation: (rule: any) =>
        rule.custom((buttonVariant: string, { parent }: any) => {
          if (
            (parent?.clickArea === "button" || parent?.clickArea === "hybrid") &&
            !buttonVariant
          ) {
            return "A button variant is required.";
          }
          return true;
        }),
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
