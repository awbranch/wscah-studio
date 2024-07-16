import { defineField, defineType } from 'sanity';
import { FaTag as icon } from 'react-icons/fa6';

export default defineType({
  name: 'newsCategory',
  title: 'News Category',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      value: 'value',
    },
    prepare({ label, value }) {
      return {
        title: label,
        subtitle: value,
        media: icon,
      };
    },
  },
});
