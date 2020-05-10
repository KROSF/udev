import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import React from 'react'
import Layout from './components/Layout'
import theme from './theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Layout />
    </ThemeProvider>
  )
}

export default App
