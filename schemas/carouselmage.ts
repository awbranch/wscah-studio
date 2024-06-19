import { defineType } from "sanity";
import { createImageField } from "../utils/utils";
import { IoIosImages } from "react-icons/io";

export default defineType({
  name: "carouselImage",
  title: "Carousel Image",
  type: "object",
  icon: IoIosImages,
  description: "An image that appears in a carousel.",
  fields: [createImageField("image", "Image")],
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
