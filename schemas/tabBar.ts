import { defineField, defineType, defineArrayMember } from "sanity";
import { PiTabsFill as icon } from "react-icons/pi";
import { createNoteField } from "./utils";

export default defineType({
  name: "tabBar",
  title: "Tab Bar",
  type: "object",
  icon,
  description: "A row of tabs",
  fields: [
    createNoteField(icon, "Add one or more tabs each of which can display a set of components."),
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "A unique id for the tab bar. Be sure this id is unique on the page.",
      validation: (rule) =>
        rule.required().custom<string>((id, context) => {
          if (id && !/^[a-zA-Z0-9-]*$/.test(id)) {
            return "ID must contain only letters, numbers, and dashes";
          }

          return true;
        }),
    }),
    defineField({
      name: "tabs",
      title: "Tabs",
      type: "array",
      of: [defineArrayMember({ type: "tabBarItem" })],
    }),
  ],
  preview: {
    select: { tabs: "tabs" },
    prepare({ tabs }) {
      return {
        title: "Tab Bar",
        subtitle: tabs?.length && `${tabs.length} Tabs`,
        media: icon,
      };
    },
  },
});
