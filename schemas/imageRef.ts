import { defineType } from "sanity";
import { createImageField } from "./utils";
import { IoIosImages as icon } from "react-icons/io";

export default defineType({
  name: "imageRef",
  title: "Image ",
  type: "object",
  icon,
  fields: [createImageField({ name: "image", title: "Image", required: true })],
  preview: {
    select: { image: "image" },
    prepare({ image }) {
      return {
        title: image.alt,
        media: image,
      };
    },
  },
});
