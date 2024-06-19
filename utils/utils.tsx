import {
  BlockDecoratorDefinition,
  BlockListDefinition,
  BlockStyleDefinition,
  defineField,
  Image,
  PortableTextBlock,
} from "sanity";
import { PiHighlighterFill } from "react-icons/pi";
import { FaLightbulb } from "react-icons/fa6";
import { colorPalettes, highlightColors } from "./globals";
import { getExtension } from "@sanity/asset-utils";

export function createImageField(name: string, title: string, group?: string, caption?: boolean) {
  const field = defineField({
    name,
    title,
    group,
    type: "image",
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: "alt",
        title: "Alternate Text",
        type: "string",
        description: "Descriptive text for visually impaired users using screen readers.",
        validation: (rule: any) => rule.required(),
      }),
    ],
    validation: (rule: any) => rule.required().assetRequired(),
  });

  if (caption && field.fields) {
    field.fields.push(
      defineField({
        name: "caption",
        title: "Caption",
        description: "Optional text to appear below the image.",
        type: "string",
      }),
    );
  }

  return field;
}

export type TextConfig = {
  all?: boolean;
  h1?: boolean;
  h2?: boolean;
  subtitle?: boolean;
  small?: boolean;
  blockquote?: boolean;
  lists?: boolean;
  decorators?: boolean;
  highlighters?: boolean;
  links?: boolean;
};
export function createRichTextBlock(config: TextConfig = {}) {
  const styles: BlockStyleDefinition[] = [];
  const lists: BlockListDefinition[] = [];
  const decorators: BlockDecoratorDefinition[] = [];
  const annotations = [];

  if (config.all || config.h1) {
    styles.push({ title: "Heading 1", value: "h1" });
  }

  if (config.all || config.h2) {
    styles.push({ title: "Heading 2", value: "h2" });
  }

  if (config.all || config.subtitle) {
    styles.push({
      title: "Subtitle",
      value: "subtitle",
      component: ({ children }) => (
        <span style={{ fontSize: "1.2rem", opacity: "0.8" }}>{children}</span>
      ),
    });
  }

  if (config.all || config.small) {
    styles.push({
      title: "Small",
      value: "small",
      component: ({ children }) => <span style={{ fontSize: "0.8rem" }}>{children}</span>,
    });
  }

  if (config.all || config.blockquote) {
    styles.push({ title: "Quote", value: "blockquote" });
  }

  if (config.all || config.lists) {
    lists.push(
      ...[
        { title: "Bulleted List", value: "bullet" },
        { title: "Numbered List", value: "number" },
      ],
    );
  }

  if (config.all || config.decorators) {
    decorators.push(
      ...[
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
      ],
    );
  }

  if (config.all || config.highlighters) {
    decorators.push(
      ...highlightColors.map((h) => ({
        title: h.title,
        value: "highlight-" + h.value,
        icon: PiHighlighterFill({ color: h.background }),
        component: ({ children }: any) => (
          <span style={{ backgroundColor: h.background, color: h.color }}>{children}</span>
        ),
      })),
    );
  }

  if (config.all || config.links) {
    annotations.push({
      name: "link",
      type: "object",
      title: "Link",
      fields: [
        {
          name: "href",
          type: "url",
          validation: (rule: any) =>
            rule.uri({
              allowRelative: true,
              scheme: ["http", "https", "mailto", "tel"],
            }),
        },
      ],
    });
  }

  return {
    type: "block",
    styles,
    lists,
    marks: {
      decorators: decorators,
      annotations: annotations,
    },
  };
}

export function getFirstBlockText(portableText: PortableTextBlock[]): string {
  const block = (portableText || []).find((block) => block._type === "block");
  return (block?.children as any)
    ?.filter((child: any) => child?._type === "span")
    ?.map((span: any) => span?.text)
    ?.join("");
}

export function createPaletteField(name: string, title: string, group?: string) {
  return defineField({
    name,
    title,
    group,
    type: "string",
    options: {
      list: colorPalettes.map((c) => ({ title: c.title, value: c.value })),
      layout: "dropdown",
    },
    validation: (rule: any) => rule.required(),
  });
}

export function validateVectorImageType(value: Image) {
  if (!value || !value.asset) {
    return true;
  }

  const filetype = getExtension(value.asset._ref);
  if (filetype !== "svg") {
    return "Image must be an SVG";
  }

  return true;
}

export const validRasterImageTypes = ["jpg", "jpeg", "png", "gif"];

export function validateRasterImageTypes(value: Image) {
  if (!value || !value.asset) {
    return true;
  }

  const fileType = getExtension(value.asset._ref);
  if (!validRasterImageTypes.includes(fileType)) {
    return "Image must be one of " + validRasterImageTypes.join(", ");
  }
  return true;
}

export function createNoteField(description: string) {
  return defineField({
    title: "Tip",
    description,
    name: "tip",
    type: "note",
    options: {
      icon: FaLightbulb,
      tone: "caution",
    },
  });
}
