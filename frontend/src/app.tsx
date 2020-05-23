import {
  ColorModeProvider,
  CSSReset,
  ThemeProvider,
  Flex,
} from '@chakra-ui/core'
import React from 'react'
import theme from './theme'
import NavBar from './components/NavBar'
import RoutesComponent from './router/routes'
import 'highlight.js/styles/monokai.css'
import { Router } from 'react-router-dom'
import { history } from './router/history'
import { AuthProvider } from './services/auth'

const Layout: React.FC = ({ children }) => (
  <Flex flexDirection="column" flex={1}>
    <NavBar />
    {children}
  </Flex>
)

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <Router history={history}>
          <AuthProvider>
            <CSSReset />
            <Layout>
              <RoutesComponent />
            </Layout>
          </AuthProvider>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
