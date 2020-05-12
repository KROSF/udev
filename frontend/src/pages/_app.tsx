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
