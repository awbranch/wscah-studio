import { defineArrayMember, defineField, defineType } from "sanity";
import { FaPeopleGroup as icon } from "react-icons/fa6";

export default defineType({
  name: "team",
  title: "Teams",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      of: [defineArrayMember({ type: "teamMember" })],
    }),
  ],
  preview: {
    select: {
      name: "name",
      members: "members",
    },
    prepare({ name, members }) {
      return {
        title: name,
        subtitle: members && members.length ? `${members.length} members` : "No members",
        media: icon,
      };
    },
  },
});
