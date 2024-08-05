import { defineArrayMember, defineField, defineType, ValidationContext } from "sanity";
import { components } from "./components";
import { GoSquareFill as icon } from "react-icons/go";
import { findComponent } from "./utils";

export default defineType({
  name: "tabBarItem",
  title: "Tab",
  type: "object",
  icon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      validation: (rule) =>
        rule.required().custom<string>((id, context: ValidationContext) => {
          if (id && !/^[a-zA-Z0-9-]*$/.test(id)) {
            return "ID must contain only letters, numbers, and dashes";
          }

          const document: any = context.document;
          const parent: any = context.parent;
          const tabBar = findComponent(document, "tabBar", (c) =>
            c?.tabs.some((tab: any) => tab._key === parent._key),
          );

          if (tabBar && tabBar.tabs.some((tab: any) => tab.id === id && tab._key !== parent._key)) {
            return "ID must be unique in the tab bar";
          }

          return true;
        }),
    }),
    defineField({
      name: "components",
      title: "Components",
      type: "array",
      of: components
        .filter((c: any) => c.name !== "tabBar") // Don't allow nested tab bars
        .map((c) => defineArrayMember({ type: c.name })),
    }),
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare({ name }) {
      return {
        title: name,
        media: icon,
      };
    },
  },
});
