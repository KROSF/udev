/** @jsx jsx */
import { Flex, Icon, Link } from '@chakra-ui/core'
import Gravatar from './Gravatar'
import moment from 'moment'
import { User } from '../services/api'
import { Github, Twitter } from '@zeit-ui/react-icons'
import { css, jsx } from '@emotion/core'
import { routes } from '../router/routes'

const Author = ({ user, date }: { user: User; date?: string }) => {
  return (
    <Flex alignItems="center">
      <Link
        href={routes.user(user.username)}
        alignItems="center"
        isTruncated={false}
        display="flex"
        css={css`
          &:hover {
            text-decoration: none;
          }
        `}
      >
        <Gravatar email={user.email} size="sm" marginRight={2} />
        <Flex as="span" marginRight={2} color="gray.500" fontWeight="semibold">
          {user.name}
        </Flex>
      </Link>
      {user.twitter_username && (
        <Link href="https://github.com/krosf" marginRight={2} isExternal>
          <Icon as={Github} color="gray.500" />
        </Link>
      )}
      {user.github_username && (
        <Link href="" marginRight={2}>
          <Icon as={Twitter} color="gray.500" />
        </Link>
      )}
      {date && (
        <Flex as="span" color="gray.500" fontWeight="semibold">
          {moment(date).format('LL')}
        </Flex>
      )}
    </Flex>
  )
}

export default Author
