import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'
import React from 'react'
import Layout from './components/Layout'
import theme from './theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Layout />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
