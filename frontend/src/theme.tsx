import { theme } from '@chakra-ui/core'
import React from 'react'

const devTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    dev: '#1a2634',
    devSearchBox: '#2E3A48',
    dev2: {
      gray: '#1a2634',
      body: '#0d1219',
      text: '#f9fafa',
      link: '#dde0e2',
      teal: '#1CB3A6',
      tealPri: '#26d9ca',
      hoverTags: '#868EE7',
      searchBox: '#2E3A48',
    },
  },
  icons: {
    ...theme.icons,
    connect: {
      viewBox: '0 0 24 24',
      path: (
        <g fill="currentColor">
          <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10H2l2.929-2.929A9.969 9.969 0 012 12zm4.828 8H12a8 8 0 10-8-8c0 2.152.851 4.165 2.343 5.657l1.414 1.414-.929.929zM8 13h8a4 4 0 11-8 0z" />
        </g>
      ),
    },
  },
}

export default devTheme
