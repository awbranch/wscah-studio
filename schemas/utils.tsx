import {
  BlockDecoratorDefinition,
  BlockListDefinition,
  BlockStyleDefinition,
  defineField,
  Image,
  PortableTextBlock,
} from "sanity";
import { PiHighlighterFill } from "react-icons/pi";
import { colorPalettes, highlightColors } from "./globals";
import { getExtension } from "@sanity/asset-utils";
import { IconType } from "react-icons";

type CreateImageFieldConfig = {
  name: string;
  title: string;
  group?: string;
  caption?: boolean;
  required?: boolean;
};

export function createImageField({
  name,
  title,
  group,
  caption,
  required,
}: CreateImageFieldConfig) {
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
    validation: required ? (rule: any) => rule.required().assetRequired() : undefined,
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

export type CreateRichTextBlockConfig = {
  all?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  large?: boolean;
  small?: boolean;
  xsmall?: boolean;
  blockquote?: boolean;
  lists?: boolean;
  decorators?: boolean;
  links?: boolean;
};

export function createRichTextBlock(config: CreateRichTextBlockConfig = {}) {
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

  if (config.all || config.h3) {
    styles.push({ title: "Heading 3", value: "h3" });
  }

  if (config.all || config.large) {
    styles.push({
      title: "Large",
      value: "large",
      component: ({ children }) => <span style={{ fontSize: "1.125rem" }}>{children}</span>,
    });
  }

  if (config.all || config.small) {
    styles.push({
      title: "Small",
      value: "small",
      component: ({ children }) => <span style={{ fontSize: "0.875rem" }}>{children}</span>,
    });
  }

  if (config.all || config.xsmall) {
    styles.push({
      title: "Extra Small",
      value: "xsmall",
      component: ({ children }) => <span style={{ fontSize: "0.75rem" }}>{children}</span>,
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

  if (config.all || config.links) {
    annotations.push({
      name: "link",
      type: "object",
      title: "Link",
      rows: 4,
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

export function createTitleTextBlock() {
  return {
    type: "block",
    styles: [],
    lists: [],
    marks: {
      decorators: highlightColors.map((h) => ({
        title: h.title,
        value: "highlight-" + h.value,
        icon: PiHighlighterFill({ color: h.background }),
        component: ({ children }: any) => (
          <span style={{ backgroundColor: h.background, color: h.color }}>{children}</span>
        ),
      })),
      annotations: [],
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

type CreatePaletteFieldConfig = {
  name: string;
  title: string;
  group?: string;
  description?: string;
  required?: boolean;
};
export function createPaletteField({
  name,
  title,
  group,
  description,
  required = true,
}: CreatePaletteFieldConfig) {
  return defineField({
    name,
    title,
    group,
    type: "string",
    description: description,
    options: {
      list: colorPalettes.map((c) => ({ title: c.title, value: c.value })),
      layout: "dropdown",
    },
    validation: required ? (rule: any) => rule.required() : undefined,
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

export function createNoteField(icon: IconType, description: string) {
  return defineField({
    title: "Tip",
    description,
    name: "tip",
    type: "note",
    options: {
      icon: icon,
      tone: "caution",
    },
  });
}


export function getMediaCard(document: any, cardKey: string) {
  for (let block of document?.blocks) {
    for (let component of block?.components) {
      if (component._type === "mediaCardSet") {
        for (let card of component?.cards) {
          if (card._key === cardKey) {
            return component;
          }
        }
      }
    }
  }
  return null;
}
