import { defineArrayMember, defineField, defineType } from "sanity";
import { FaFile as icon } from "react-icons/fa";
import { createNoteField } from "./utils";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon,
  fieldsets: [
    {
      name: "header",
      title: "Page Header",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "advanced",
      title: "Advanced Options",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    createNoteField(
      icon,
      "Each page of the site has a unique path that is separated by slashes and contains one or more blocks.",
    ),
    defineField({
      name: "path",
      title: "Path",
      type: "string",
      description: "The relative path to this page, it should be unique and start with a slash.",
      validation: (rule: any) =>
        rule.required().custom((path: string, context: any) => {
          if (!/^\/[a-z-]*(?:\/[a-z-]+)*$/.test(path)) {
            return "Paths must start with a forward slash and contain one or more path segments containing lower case letters or dashes, separated by forward slashes.";
          }

          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2023-06-17" });

          const id = document._id.replace(/^drafts\./, "");
          const params = {
            draft: `drafts.${id}`,
            published: id,
            path,
          };
          const query = `*[_type == "page" && !(_id in [$draft, $published]) && path == $path]`;
          return client.fetch(query, params).then((result: []) => {
            return result.length === 0 ? true : "Paths must be unique";
          });
        }),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The page title to be shown in the browser tab and used for SEO.",
    }),
    defineField({
      name: "showHeader",
      title: "Show Header",
      type: "boolean",
      description: "Display a header at the top of the page.",
    }),
    defineField({
      name: "header",
      title: "Page Header",
      type: "pageHeader",
      description:
        "A header displayed at the top of the page that introduces the rest of the page content.",
      hidden: ({ document }) => !document?.showHeader,
    }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [defineArrayMember({ type: "pageBlock" })],
    }),
    defineField({
      title: "Max Width",
      name: "maxWidth",
      type: "string",
      description:
        "The optional maximum width of this page. " +
        "Narrower widths are ideal for text heavy pages to avoid long line lengths.",
      options: {
        list: [
          { title: "Large", value: "lg" },
          { title: "Medium", value: "md" },
          { title: "Small", value: "sm" },
          { title: "Extra Small", value: "xs" },
        ],
        layout: "dropdown",
      },
      fieldset: "advanced",
    }),
    defineField({
      name: "metaDescription",
      title: "Search Engine Description",
      type: "text",
      description:
        "This description is not displayed to the user. Instead this is a concise summary of the pages for search engines to help index the page.",
      rows: 5,
      fieldset: "advanced",
    }),
  ],
  preview: {
    select: { path: "path", title: "title" },
    prepare({ path, title }) {
      return {
        title: path,
        subtitle: title,
        media: icon,
      };
    },
  },
  orderings: [
    {
      title: "Path",
      name: "path",
      by: [{ field: "path", direction: "asc" }],
    },
  ],
});
