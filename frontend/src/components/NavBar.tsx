import { Avatar, Button, Flex, Icon, Input } from '@chakra-ui/core'
import React from 'react'

const NavBar: React.FC<{ onAvatarClick: () => void }> = ({ onAvatarClick }) => {
  return (
    <Flex
      bg="dev"
      w="100%"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Flex alignItems="center">
          <Icon
            name="dev"
            bg="black"
            color="white"
            width="88px"
            height="20px"
          />

          <Input
            placeholder="Search..."
            bg="devSearchBox"
            color="white"
            marginLeft={5}
            width="400px"
          />
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          bg="tealPri"
          color="black"
          _hover={{ bg: 'devteal' }}
          marginRight={5}
        >
          Write a Post
        </Button>
        <Icon name="connect" color="white" size="24px" marginRight={5} />
        <Icon name="notification" color="white" size="24px" marginRight={5} />
        <Avatar
          src="https://bit.ly/broken-link"
          size="sm"
          marginRight={5}
          onClick={onAvatarClick}
        />
      </Flex>
    </Flex>
  )
}

export default NavBar
