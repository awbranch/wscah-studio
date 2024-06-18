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
  groups: [
    {
      name: 'alert',
      title: 'Alert',
    },
    {
      name: 'navigation',
      title: 'Navigation',
    },
  ],
  fields: [
    defineField({
      name: 'showAlert',
      title: 'Show Alert',
      type: 'boolean',
      group: 'alert',
    }),
    defineField({
      name: 'alertMessage',
      title: 'Alert Message',
      type: 'array',
      of: [defineArrayMember(createRichTextBlock(['decorators', 'links']))],
      hidden: ({document}) => !document?.showAlert,
      group: 'alert',
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
      group: 'navigation',
    }),
    defineField({
      name: 'menuButtons',
      title: 'Menu Buttons',
      type: 'array',
      of: [defineArrayMember({type: 'menuButton'})],
      group: 'navigation',
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
