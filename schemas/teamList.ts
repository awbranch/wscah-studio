import { defineField, defineType } from "sanity";
import { FaPeopleGroup as icon } from "react-icons/fa6";

export default defineType({
  name: "teamList",
  title: "Team List",
  type: "object",
  icon: icon,
  fields: [
    defineField({
      name: "team",
      title: "Team",
      type: "reference",
      to: [{ type: "team" }],
      options: {
        disableNew: true,
      },
    }),
  ],
  preview: {
    select: { team: "team.name" },
    prepare({ team }) {
      return {
        title: "Team List",
        subtitle: team,
        media: icon,
      };
    },
  },
});
