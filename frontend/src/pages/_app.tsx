import {
  ColorModeProvider,
  CSSReset,
  ThemeProvider,
  Flex,
} from '@chakra-ui/core'
import React from 'react'
import theme from '../theme'
import { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../services/auth'

const Layout: React.FC = ({ children }) => (
  <Flex flexDirection="column" flex={1}>
    <NavBar />
    {children}
  </Flex>
)

const App = ({ Component }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            min-height: 100vh;
          }
        `}</style>
        <AuthProvider>
          <Layout>
            <Component />
          </Layout>
        </AuthProvider>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
