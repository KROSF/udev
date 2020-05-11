/** @jsx jsx */
import { Box, Flex, Icon, theme, useColorMode } from '@chakra-ui/core'
import { css, jsx } from '@emotion/core'
import React, { useCallback, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

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
}) => (
  <Flex
    css={css`
      &:hover {
        background: ${theme.colors.gray[100]};
      }
    `}
    as="a"
    height="50px"
    alignItems="center"
    padding="0.5rem"
    rounded="lg"
    bg="white"
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

const Dropdown: React.FC<{ showModal: () => void }> = ({ showModal }) => {
  const dropdownRef = useRef(null)
  const [height, setHeight] = useState<number | null>(null)
  const { colorMode, toggleColorMode } = useColorMode()

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
      background="white"
      rounded="lg"
      height={height}
    >
      <CSSTransition in unmountOnExit timeout={500} onEnter={onEnter}>
        <Box width="100%">
          <DropdownItem>
            <Flex flexDirection="column">
              <Flex>Rodrigo Sanabria</Flex>
              <Flex>@krosf</Flex>
            </Flex>
          </DropdownItem>
          <DropdownItem onClick={showModal}>Log In</DropdownItem>
          <DropdownItem
            iconLeft={
              <Icon name={colorMode === 'light' ? 'moon' : 'sun'} focusable />
            }
            onClick={toggleColorMode}
          >
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </DropdownItem>
          <DropdownItem>Sign Out</DropdownItem>
        </Box>
      </CSSTransition>
    </Box>
  )
}

export default Dropdown
