import { CSSReset, ThemeProvider, useDisclosure } from '@chakra-ui/core'
import React from 'react'
import Login from './components/Login'
import NavBar from './components/NavBar'
import theme from './theme'

const App = () => {
  const { onOpen, ...login } = useDisclosure(false)
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <NavBar onAvatarClick={onOpen} />
      <Login {...login} />
    </ThemeProvider>
  )
}

export default App
