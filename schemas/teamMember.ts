import { defineField, defineType } from "sanity";
import { FaPerson as icon } from "react-icons/fa6";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "object",
  icon: icon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
  ],
  preview: {
    select: { name: "name", role: "role", image: "image" },
    prepare({ name, role, image }) {
      return {
        title: name,
        subtitle: role,
        media: image || icon,
      };
    },
  },
});
