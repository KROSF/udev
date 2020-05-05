import { theme } from '@chakra-ui/core'

const devTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    dev: '#1a2634',
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
}

export default devTheme
