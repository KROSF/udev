import React from 'react'
import { Flex, Button, Box, BoxProps } from '@chakra-ui/core'
import Gravatar from './Gravatar'
import { User } from '../services/api'
import moment from 'moment'

const AuthorCard: React.FC<BoxProps & { user: User }> = ({
  user,
  ...props
}: {
  user: User
}) => {
  return (
    <Box {...props}>
      <Flex flexDirection="column" borderWidth="1px" padding="1.5rem">
        <Flex marginBottom={3}>
          <Flex marginRight={2}>
            <Gravatar email={user.email} />
          </Flex>
          <Flex flexDirection="column">
            <Flex as="span">{user.name}</Flex>
            <Flex as="span">@{user.username}</Flex>
          </Flex>
        </Flex>
        {user.status && (
          <Flex as="p" marginBottom={3}>
            {user.status}
          </Flex>
        )}
        <Flex justifyContent="center">
          <Button leftIcon="add">FOLLOW</Button>
        </Flex>
        <Flex
          as="span"
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="normal"
        >
          joined
        </Flex>
        <Flex as="span">{moment(user.created_at).format('LL')}</Flex>
      </Flex>
    </Box>
  )
}

export default AuthorCard
