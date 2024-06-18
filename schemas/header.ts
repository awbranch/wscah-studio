import {defineArrayMember, defineField, defineType} from 'sanity'
import {createRichTextBlock, validateVectorImageType} from './utils'

import {FaWindowMaximize as icon} from 'react-icons/fa'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon,
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'showAlert',
      title: 'Show Alert',
      type: 'boolean',
    }),
    defineField({
      name: 'alertMessage',
      title: 'Alert Message',
      type: 'array',
      of: [defineArrayMember(createRichTextBlock(['decorators', 'links']))],
      hidden: ({document}) => !document?.showAlert,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (rule: any) => rule.required().assetRequired().custom(validateVectorImageType),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternate Text',
          type: 'string',
          validation: (rule: any) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'menuButtons',
      title: 'Menu Buttons',
      type: 'array',
      of: [defineArrayMember({type: 'menuButton'})],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
      }
    },
  },
})
