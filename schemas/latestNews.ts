import { defineField, defineType } from "sanity";
import { createNoteField } from "./utils";

import { FaBell as icon } from "react-icons/fa6";

export default defineType({
  name: "latestNews",
  title: "Latest News",
  type: "object",
  icon,
  fields: [
    createNoteField(icon, "Displays the most recent news stories in a Media Card Set."),
    defineField({
      name: "count",
      title: "Count",
      type: "number",
      description: "The number of stories to display.",
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: { count: "count" },
    prepare({ count }) {
      return {
        title: "Latest News",
        subtitle: `${count} stories`,
        media: icon,
      };
    },
  },
});
