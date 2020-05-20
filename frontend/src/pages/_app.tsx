import {
  ColorModeProvider,
  CSSReset,
  ThemeProvider,
  Flex,
} from '@chakra-ui/core'
import React, { useEffect } from 'react'
import theme from '../theme'
import { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { refreshToken } from '../services/api'
import 'highlight.js/styles/monokai.css'

const Layout: React.FC = ({ children }) => (
  <Flex flexDirection="column" flex={1}>
    <NavBar />
    {children}
  </Flex>
)

const App = ({ Component }: AppProps) => {
  useEffect(() => {
    refreshToken()
  }, [])
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
        <Layout>
          <Component />
        </Layout>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
