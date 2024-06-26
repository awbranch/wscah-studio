import { defineType } from "sanity";
import { createImageField } from "./utils";
import { IoIosImages as icon } from "react-icons/io";

export default defineType({
  name: "carouselImage",
  title: "Carousel Image",
  type: "object",
  icon,
  description: "An image that appears in a carousel.",
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
