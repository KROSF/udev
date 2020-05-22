/** @jsx jsx */
import { Box, Flex, Icon, theme, useColorMode } from '@chakra-ui/core'
import { css, jsx } from '@emotion/core'
import React, { useCallback, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useOutsideClick } from '../hooks'
import { LocalStorageService } from '../services/LocalStorageService'
import { useRouter } from 'next/router'
import { logOut } from '../services/api'

interface DropdownItemProps {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: () => void
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  iconLeft,
  iconRight,
  onClick,
}) => {
  const { colorMode } = useColorMode()
  return (
    <Flex
      css={css`
        &:hover {
          background: ${colorMode === 'light'
            ? theme.colors.gray[100]
            : theme.colors.whiteAlpha[100]};
        }
      `}
      height="50px"
      alignItems="center"
      padding="0.5rem"
      rounded="lg"
      borderWidth="1px"
      marginTop={2}
      transition="background 500ms"
      cursor="pointer"
      onClick={onClick}
    >
      <Box as="span" marginRight="0.5rem">
        {iconLeft}
      </Box>
      {children}
      <Box as="span" marginLeft="auto">
        {iconRight}
      </Box>
    </Flex>
  )
}

const Dropdown: React.FC<{
  onOutsideClick: () => void
}> = ({ onOutsideClick }) => {
  const dropdownRef = useRef(null)
  const [height, setHeight] = useState<number | null>(null)
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  useOutsideClick(dropdownRef, onOutsideClick)
  const colorModeStyles = {
    light: {
      bg: 'white',
      shadow: '0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)',
    },
    dark: {
      bg: 'gray.700',
      shadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
    },
  }

  const onEnter = useCallback((node: HTMLElement) => {
    const height = node.offsetHeight
    setHeight(height)
  }, [])

  return (
    <Box
      ref={dropdownRef}
      position="absolute"
      top="60px"
      width="200px"
      transform="translateX(-85%)"
      borderWidth="1px"
      padding="0.5rem"
      paddingTop="0"
      overflow="hidden"
      transition="height 500ms ease"
      rounded="lg"
      height={height}
      zIndex={2}
      {...colorModeStyles[colorMode]}
    >
      <CSSTransition in unmountOnExit timeout={500} onEnter={onEnter}>
        <Box width="100%">
          {LocalStorageService.isUserLoggedIn && (
            <DropdownItem>
              <Flex flexDirection="column">
                <Flex>Rodrigo Sanabria</Flex>
                <Flex>@krosf</Flex>
              </Flex>
            </DropdownItem>
          )}
          <DropdownItem
            iconLeft={
              <Icon name={colorMode === 'light' ? 'moon' : 'sun'} focusable />
            }
            onClick={toggleColorMode}
          >
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </DropdownItem>
          {LocalStorageService.isUserLoggedIn ? (
            <DropdownItem
              onClick={async () => {
                await logOut()
                router.push('/')
              }}
            >
              Sign Out
            </DropdownItem>
          ) : (
            <DropdownItem onClick={() => router.push('/login')}>
              Log In
            </DropdownItem>
          )}
        </Box>
      </CSSTransition>
    </Box>
  )
}

export default Dropdown
