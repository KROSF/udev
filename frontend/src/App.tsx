import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import React from 'react'
import NavBar from './components/NavBar'
import theme from './theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <NavBar />
  </ThemeProvider>
)

export default App
