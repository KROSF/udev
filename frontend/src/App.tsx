import { CSSReset, ThemeProvider, useDisclosure } from '@chakra-ui/core'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import NavBar from './components/NavBar'
import NewPost from './components/NewPost'
import theme from './theme'

const App = () => {
  const { onOpen, ...login } = useDisclosure(false)
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router>
        <NavBar onAvatarClick={onOpen} />
        <Routes>
          <Route path="/new" element={<NewPost />} />
        </Routes>
      </Router>
      <Login {...login} />
    </ThemeProvider>
  )
}

export default App
