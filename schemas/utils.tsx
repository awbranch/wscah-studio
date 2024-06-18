import {
  BlockDecoratorDefinition,
  BlockListDefinition,
  BlockStyleDefinition,
  defineField,
  Image,
  PortableTextBlock,
} from 'sanity';
import { MdFormatColorText } from 'react-icons/md';

import { colorPalettes } from './globals';
import { getExtension } from '@sanity/asset-utils';

export function createImageField(
  name: string,
  title: string,
  group?: string,
  caption?: boolean,
) {
  const field = defineField({
    name,
    title,
    group,
    type: 'image',
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternate Text',
        type: 'string',
        description:
          'Descriptive text for visually impaired users using screen readers.',
        validation: (rule: any) => rule.required(),
      }),
    ],
    validation: (rule: any) => rule.required().assetRequired(),
  });

  if (caption && field.fields) {
    field.fields.push(
      defineField({
        name: 'caption',
        title: 'Caption',
        description: 'Optional text to appear below the image.',
        type: 'string',
      }),
    );
  }

  return field;
}

export type CRTLevel =
  | 'all'
  | 'h1'
  | 'h2'
  | 'subtitle'
  | 'small'
  | 'blockquote'
  | 'lists'
  | 'decorators'
  | 'links';

export function createRichTextBlock(levels: Array<CRTLevel> = ['all']) {
  const styles: BlockStyleDefinition[] = [];
  const lists: BlockListDefinition[] = [];
  const decorators: BlockDecoratorDefinition[] = [];
  const annotations = [];

  if (levels.includes('all') || levels.includes('h1')) {
    styles.push({ title: 'Heading 1', value: 'h1' });
  }

  if (levels.includes('all') || levels.includes('h2')) {
    styles.push({ title: 'Heading 2', value: 'h2' });
  }

  if (levels.includes('all') || levels.includes('subtitle')) {
    styles.push({
      title: 'Subtitle',
      value: 'subtitle',
      component: ({ children }) => (
        <span style={{ fontSize: '1.2rem', opacity: '0.8' }}>{children}</span>
      ),
    });
  }

  if (levels.includes('all') || levels.includes('small')) {
    styles.push({
      title: 'Small',
      value: 'small',
      component: ({ children }) => (
        <span style={{ fontSize: '0.8rem' }}>{children}</span>
      ),
    });
  }

  if (levels.includes('all') || levels.includes('blockquote')) {
    styles.push({ title: 'Quote', value: 'blockquote' });
  }

  if (levels.includes('all') || levels.includes('lists')) {
    lists.push(
      ...[
        { title: 'Bulleted List', value: 'bullet' },
        { title: 'Numbered List', value: 'number' },
      ],
    );
  }

  if (levels.includes('all') || levels.includes('decorators')) {
    decorators.push(
      ...[
        { title: 'Bold', value: 'strong' },
        { title: 'Italic', value: 'em' },
        {
          title: 'Accent Color',
          value: 'accent',
          icon: MdFormatColorText,
          component: ({ children }: any) => (
            <span style={{ color: '#db2777' }}>{children}</span>
          ),
        },
      ],
    );
  }

  if (levels.includes('all') || levels.includes('links')) {
    annotations.push({
      name: 'link',
      type: 'object',
      title: 'Link',
      fields: [
        {
          name: 'href',
          type: 'url',
          validation: (rule: any) =>
            rule.uri({
              allowRelative: true,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        },
      ],
    });
  }

  return {
    type: 'block',
    styles,
    lists,
    marks: {
      decorators: decorators,
      annotations: annotations,
    },
  };
}

export function getFirstBlockText(portableText: PortableTextBlock[]): string {
  const block = (portableText || []).find((block) => block._type === 'block');
  return (block?.children as any)
    ?.filter((child: any) => child?._type === 'span')
    ?.map((span: any) => span?.text)
    ?.join('');
}

export function createPaletteField(
  name: string,
  title: string,
  group?: string,
) {
  return defineField({
    name,
    title,
    group,
    type: 'string',
    options: {
      list: colorPalettes.map((c) => ({ title: c.title, value: c.value })),
      layout: 'dropdown',
    },
    validation: (rule: any) => rule.required(),
  });
}

export function validateVectorImageType(value: Image) {
  if (!value || !value.asset) {
    return true;
  }

  const filetype = getExtension(value.asset._ref);
  if (filetype !== 'svg') {
    return 'Image must be an SVG';
  }

  return true;
}

export const validRasterImageTypes = ['jpg', 'jpeg', 'png', 'gif'];

export function validateRasterImageTypes(value: Image) {
  if (!value || !value.asset) {
    return true;
  }

  const fileType = getExtension(value.asset._ref);
  if (!validRasterImageTypes.includes(fileType)) {
    return 'Image must be one of ' + validRasterImageTypes.join(', ');
  }
  return true;
}
