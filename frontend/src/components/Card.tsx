/** @jsx jsx */
import { Box, Flex, Image, Link } from '@chakra-ui/core'
import React from 'react'
import Gravatar from './Gravatar'
import { Link as RLink } from 'react-router-dom'
import { Post } from '../services/api'
import { css, jsx } from '@emotion/core'
import { routes } from '../router/routes'

export interface CardProps {
  post: Post
  first: boolean
}

const Card: React.FC<CardProps> = ({
  post: { url, title, tags, user, likes, comments, cover_url },
  first,
}) => {
  return (
    <Box borderWidth="1px" rounded="lg" width="100%" marginBottom={3}>
      {first && cover_url && <Image src={cover_url} alt="cover" />}
      <Box p={6} borderTopWidth={first ? '1px' : undefined}>
        <Link
          href={url}
          css={css`
            &:hover {
              text-decoration: none;
            }
          `}
        >
          <Box
            as="h3"
            color="gray"
            fontWeight="bold"
            letterSpacing="normal"
            fontSize="3xl"
          >
            {title}
          </Box>
        </Link>
        <Flex flexDirection="row">
          <Link marginRight={1} href={routes.user(user.username)}>
            <Gravatar email={user.email} />
          </Link>
          <Flex flexDirection="column">
            <Flex>
              {tags.map((tag) => (
                <RLink to={routes.tag(tag.name)} key={tag.id + tag.name}>
                  <Link as="a" marginRight={1}>
                    #{tag.name}
                  </Link>
                </RLink>
              ))}
            </Flex>
            <Flex>
              <RLink to={routes.user(user.username)}>
                <Link color="gray.500">{user.name}</Link>
              </RLink>
            </Flex>
          </Flex>
        </Flex>
        <Flex marginTop={3}>
          <Link display="flex" marginRight={2} href={url}>
            <Image
              src="/images/reactions-stack.png"
              alt="heart"
              width="24px"
              height="18px"
            />
            <Box as="span" marginLeft={1} fontSize="base" color="gray.500">
              {likes.length}
            </Box>
          </Link>
          <Link href={url} display="flex">
            <Image
              src="/images/comments-bubble.png"
              alt="chat"
              width="28px"
              height="19px"
            />
            <Box as="span" marginLeft={1} fontSize="base" color="gray.500">
              {comments}
            </Box>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default Card
