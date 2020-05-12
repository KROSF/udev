import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  useDisclosure,
} from '@chakra-ui/core'
import React, { useState } from 'react'
import Dropdown from './Dropdown'
import Gravatar from './Gravatar'
import Login from './Login'
import Link from 'next/link'

const ConnectIcon = () => <Icon name="connect" size="24px" />

const NotificationIcon = () => <Icon name="notification" size="24px" />

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const disclosure = useDisclosure(false)
  return (
    <>
      <Flex
        w="100%"
        px={5}
        py={4}
        justifyContent="space-between"
        alignItems="center"
        borderBottomWidth="1px"
        marginBottom="1.5rem"
      >
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Flex alignItems="center">
            <Link href="/">
              <svg width="65" height="35" fill="currentColor">
                <path d="M6.79 28.90L6.79 28.90Q4.63 28.90 3.43 28.10Q2.23 27.31 1.78 25.85Q1.32 24.38 1.32 22.34L1.32 22.34L1.32 9.19L4.78 9.19L4.78 22.75Q4.78 23.66 4.90 24.47Q5.02 25.27 5.46 25.76Q5.90 26.26 6.79 26.26L6.79 26.26Q7.73 26.26 8.15 25.76Q8.57 25.27 8.70 24.47Q8.83 23.66 8.83 22.75L8.83 22.75L8.83 9.19L12.26 9.19L12.26 22.34Q12.26 24.38 11.81 25.85Q11.35 27.31 10.16 28.10Q8.98 28.90 6.79 28.90ZM19.78 28.63L15.05 28.63L15.05 9.19L19.63 9.19Q22.01 9.19 23.34 9.84Q24.67 10.49 25.24 11.83Q25.80 13.18 25.80 15.24L25.80 15.24L25.80 22.34Q25.80 24.46 25.24 25.86Q24.67 27.26 23.36 27.95Q22.06 28.63 19.78 28.63L19.78 28.63ZM18.60 11.71L18.60 26.16L19.68 26.16Q20.90 26.16 21.43 25.73Q21.96 25.30 22.08 24.47Q22.20 23.64 22.20 22.44L22.20 22.44L22.20 15.00Q22.20 13.82 22.03 13.10Q21.86 12.38 21.34 12.05Q20.81 11.71 19.63 11.71L19.63 11.71L18.60 11.71ZM36.62 28.63L28.42 28.63L28.42 9.19L36.58 9.19L36.58 11.69L31.97 11.69L31.97 17.28L35.59 17.28L35.59 19.75L31.97 19.75L31.97 26.18L36.62 26.18L36.62 28.63ZM45.17 28.63L41.66 28.63L37.75 9.19L40.90 9.19L43.46 22.94L45.86 9.19L49.08 9.19L45.17 28.63Z" />
              </svg>
            </Link>
            <Input placeholder="Search..." marginLeft={5} width="400px" />
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Link href="/new">
            <Button marginRight={5} variantColor="teal">
              Write a Post
            </Button>
          </Link>
          <IconButton
            icon={ConnectIcon}
            aria-label="connect icon"
            variant="ghost"
            rounded="full"
            marginRight={5}
          />
          <IconButton
            icon={NotificationIcon}
            aria-label="notification icon"
            variant="ghost"
            rounded="full"
            marginRight={5}
          />
          <Flex>
            <Gravatar
              email="rodrigosanabria22@gmail.com"
              size="sm"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <Dropdown
                showModal={disclosure.onOpen}
                onOutsideClick={() => setOpen(false)}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
      <Login {...disclosure} />
    </>
  )
}

export default NavBar
