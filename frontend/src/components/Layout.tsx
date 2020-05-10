import { Flex, useDisclosure } from '@chakra-ui/core'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import NavBar from './NavBar'
import NewPost from './NewPost'

const Layout = () => {
  const { onOpen, ...login } = useDisclosure(false)
  return (
    <Flex flexDirection="column" flex={1}>
      <Router>
        <NavBar onAvatarClick={onOpen} />
        <Routes>
          <Route path="/new" element={<NewPost />} />
        </Routes>
      </Router>
      <Login {...login} />
    </Flex>
  )
}

export default Layout
