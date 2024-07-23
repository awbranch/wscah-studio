import { defineField, defineType } from 'sanity';
import { FaShareSquare as icon } from 'react-icons/fa';
import { FaLightbulb } from 'react-icons/fa6';

export default defineType({
  name: 'componentSetReference',
  title: 'Component Set Reference',
  type: 'object',
  icon,
  description: 'A reference to a shared component set.',
  fields: [
    defineField({
      title: 'Tip',
      description:
        'A Component Set Reference allows you to add a reusable Component Set to this page. ' +
        'Component Sets are a top-level group of components that can be reused across the site.',
      name: 'myCustomNote',
      type: 'note',
      options: {
        icon: FaLightbulb,
        tone: 'caution',
      },
    }),
    defineField({
      name: 'componentSet',
      title: 'Sharable Component Set',
      type: 'reference',
      to: [{ type: 'componentSet' }],
      validation: (rule: any) => rule.required(),
      options: {
        disableNew: true,
      },
    }),
  ],
  preview: {
    select: { name: 'componentSet.name' },
    prepare({ name }) {
      return {
        title: `Component Set Reference`,
        subtitle: name,
        media: icon,
      };
    },
  },
});
