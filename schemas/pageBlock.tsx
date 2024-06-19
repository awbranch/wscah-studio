import { defineArrayMember, defineField, defineType } from "sanity";
import BlockPreview from "../components/BlockPreview";
import components from "./components";
import { createPaletteField } from "../utils/utils";
import { colorPalettes } from "../utils/globals";

export default defineType({
  name: "pageBlock",
  title: "Block",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "slug",
      description: "Id of this block in the page.",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "hidden",
      title: "Hidden",
      type: "boolean",
      description:
        "You can hide a block rather than deleting if if you want to not show it temporarily",
      initialValue: false,
      validation: (rule: any) => rule.required(),
    }),
    createPaletteField("palette", "Palette"),
    defineField({
      name: "components",
      title: "Components",
      type: "array",
      of: components.map((c) => defineArrayMember({ type: c.name })),
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
        title: `#${id?.current}`,
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
