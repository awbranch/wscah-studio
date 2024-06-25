import { defineArrayMember, defineField, defineType } from "sanity";
import BlockPreview from "../components/BlockPreview";
import { createPaletteField, createNoteField } from "./utils";
import { colorPalettes, blockWidths, verticalSpacing } from "./globals";
import { LuRectangleHorizontal } from "react-icons/lu";

export default defineType({
  name: "pageBlock",
  title: "Block",
  type: "object",
  fieldsets: [
    {
      name: "advanced",
      title: "Advanced Options",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    createNoteField(
      LuRectangleHorizontal,
      "A block is a large section on a webpage that can have a background color and one or more components. " +
        "Blocks can be directly linked to by adding a hashmark and block id to the end of the url. " +
        "For example clicking on the url https://mysite.org/about#team will take the user to the block with the id 'team' on the about page.",
    ),
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "Id of this block in the page.",
      validation: (rule: any) =>
        rule.required().custom((id: string, context: any) => {
          if (!/^[a-z\-]+$/.test(id)) {
            return `Ids must be lowercase letters and hyphens. [${id}]`;
          }
          return true;
        }),
    }),
    createPaletteField({ name: "palette", title: "Palette" }),
    defineField({
      name: "components",
      title: "Components",
      type: "array",
      of: [
        defineArrayMember({ type: "richText" }),
        defineArrayMember({ type: "callToAction" }),
        defineArrayMember({ type: "mediaCardSet" }),
        defineArrayMember({ type: "announcement" }),
        defineArrayMember({ type: "hero" }),
        defineArrayMember({ type: "iframe" }),
        defineArrayMember({ type: "latestNews" }),
      ],
    }),
    defineField({
      name: "hidden",
      title: "Hidden",
      type: "boolean",
      description:
        "You can hide a block rather than deleting if if you want to not show it temporarily",
      initialValue: false,
      validation: (rule: any) => rule.required(),
      fieldset: "advanced",
    }),
    defineField({
      name: "maxWidth",
      title: "Max Width",
      description:
        "The optional maximum width of this block. If not set it will stretch to fill the page. " +
        "Narrower widths are ideal for text heavy blocks to avoid long line lengths.",
      type: "string",
      options: {
        list: blockWidths,
        layout: "dropdown",
      },
      fieldset: "advanced",
    }),
    defineField({
      name: "spacing",
      title: "Component Spacing",
      description:
        "The optional spacing between components in this block. If not set it will use the default spacing.",
      type: "string",
      options: {
        list: verticalSpacing,
        layout: "dropdown",
      },
      fieldset: "advanced",
    }),
  ],
  preview: {
    select: {
      id: "id",
      hidden: "hidden",
      palette: "palette",
      components: "components",
    },
    prepare({ id, hidden, palette, components }) {
      return {
        title: id,
        subtitle: hidden ? "hidden" : `${components?.length || "0"} components`,
        media: (
          <BlockPreview
            color={
              hidden
                ? "white"
                : palette && colorPalettes.find((p) => p.value === palette)?.background
            }
            dashed={hidden}
          />
        ),
      };
    },
  },
});
