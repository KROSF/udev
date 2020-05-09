import { Button, Flex, Icon, IconButton, Input } from '@chakra-ui/core'
import React from 'react'
import Gravatar from './Gravatar'

const ConnectIcon = () => <Icon name="connect" size="24px" />

const NotificationIcon = () => <Icon name="notification" size="24px" />

const NavBar: React.FC<{ onAvatarClick: () => void }> = ({ onAvatarClick }) => {
  return (
    <Flex
      w="100%"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Flex alignItems="center">
          <Icon name="dev" width="88px" height="20px" />

          <Input placeholder="Search..." marginLeft={5} width="400px" />
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Button marginRight={5} variantColor="teal">
          Write a Post
        </Button>
        <IconButton
          icon={ConnectIcon}
          aria-label="connect icon"
          variant="ghost"
          marginRight={5}
        />
        <IconButton
          icon={NotificationIcon}
          aria-label="notification icon"
          variant="ghost"
          marginRight={5}
        />
        <Gravatar
          email="rodrigosanabria22@gmail.com"
          size="sm"
          marginRight={5}
          onClick={onAvatarClick}
        />
      </Flex>
    </Flex>
  )
}

export default NavBar
