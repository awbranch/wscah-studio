import { defineField, defineType, defineArrayMember } from "sanity";
import { PiDotsThreeOutline as icon } from "react-icons/pi";
import { createNoteField } from "./utils";
import { alignment } from "./globals";

export default defineType({
  name: "buttonRow",
  title: "Button Row",
  type: "object",
  icon,
  description: "A row of buttons",
  fields: [
    createNoteField(
      icon,
      "Add one or more buttons in a row where each button has a link to another page. " +
        "This is useful when you want to direct a user to navigate to some other " +
        "page in the site or on some other site.",
    ),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: alignment,
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "left",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "button" })],
    }),
  ],
  preview: {
    select: { buttons: "buttons" },
    prepare({ buttons }) {
      return {
        title: "Button Row",
        subtitle: buttons?.length && `${buttons.length} Buttons`,
        media: icon,
      };
    },
  },
});
