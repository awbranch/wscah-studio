import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaLink, FaMinus} from 'react-icons/fa'
import header from './header'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: FaLink,
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'boolean',
      validation: (rule: any) => rule.required(),
      initialValue: false,
      description: 'Use headers to group menu items together. Headers are not clickable.',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      validation: (rule: any) =>
        rule.custom((href: any, {parent}: any) => {
          if (!href && !parent?.header) {
            return 'Required if header is unchecked'
          }
          return true
        }),
      hidden: ({parent}) => parent?.header,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      href: 'href',
      header: 'header',
    },
    prepare({name, href, header}) {
      return {
        title: name,
        subtitle: href,
        media: header ? FaMinus : FaLink,
      }
    },
  },
})
