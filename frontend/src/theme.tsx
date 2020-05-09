import { theme } from '@chakra-ui/core'
import React from 'react'

const devTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    dev: '#1a2634',
    devSearchBox: '#2E3A48',
    tealPri: '#26d9ca',
    devteal: '#1CB3A6',
    devhover: '#0d1219',
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
    notification: {
      viewBox: '0 0 24 24',
      path: (
        <g fill="currentColor">
          <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z" />
        </g>
      ),
    },
    dev: {
      viewBox: '0 0 132 65',
      path: (
        <g fill="currentColor">
          <path d="M0 33v32h11.3c12.5 0 17.7-1.6 21.5-6.5 3.8-4.8 4.4-9 4-28-.3-16.8-.5-18.2-2.7-21.8C30.3 2.5 26.1 1 12 1H0v32zm23.1-19.1c2.3 1.9 2.4 2.3 2.4 18.5 0 15.7-.1 16.7-2.2 18.8-1.7 1.6-3.5 2.2-7 2.2l-4.8.1-.3-20.8L11 12h4.9c3.3 0 5.6.6 7.2 1.9zm23-10.3c-2 2.6-2.1 3.9-2.1 29.6v26.9l2.5 2.4c2.3 2.4 2.9 2.5 16 2.5H76V54.1l-10.2-.3-10.3-.3v-15l6.3-.3 6.2-.3V27H55V12h21V1H62.1c-13.9 0-14 0-16 2.6zM87 15.2c2.1 7.9 5.5 20.8 7.6 28.8 3.2 12.3 4.3 15 7 17.7 1.9 2 4.2 3.3 5.7 3.3 3.1 0 7.1-3.1 8.5-6.7 1-2.6 15.2-55.6 15.2-56.8 0-.3-2.8-.5-6.2-.3l-6.3.3-5.6 21.5c-3.5 13.6-5.8 20.8-6.2 19.5C105.9 40 96 1.9 96 1.4c0-.2-2.9-.4-6.4-.4h-6.4L87 15.2z" />
        </g>
      ),
    },
  },
}

export default devTheme
