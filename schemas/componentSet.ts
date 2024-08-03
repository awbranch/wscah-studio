import { defineArrayMember, defineField, defineType } from "sanity";
import { FaCubes as icon, FaLightbulb } from "react-icons/fa6";
import { components } from "./components";

export default defineType({
  name: "componentSet",
  title: "Component Sets",
  description: "A set of components that is sharable",
  type: "document",
  icon,
  fields: [
    defineField({
      title: "Tip",
      description:
        "A Component Set is a collection of one or more components that can be shared throughout the site. " +
        "Useful when you want the same set of components on several pages.",
      name: "myCustomNote",
      type: "note",
      options: {
        icon: FaLightbulb,
        tone: "caution",
      },
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "components",
      title: "Components",
      type: "array",
      of: components
        .filter((c) => c.name !== "componentSetReference")
        .map((c) => defineArrayMember({ type: c.name })),
    }),
  ],
  preview: {
    select: { name: "name", components: "components" },
    prepare({ name, components }) {
      return {
        title: name,
        subtitle: components?.length && `${components?.length} Components`,
        media: icon,
      };
    },
  },
  orderings: [
    {
      title: "Name",
      name: "name",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
