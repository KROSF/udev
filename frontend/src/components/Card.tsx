import { Box, Flex, Image, Link } from '@chakra-ui/core'
import React from 'react'
import Gravatar from './Gravatar'
import NextLink from 'next/link'

export interface CardProps {
  image?: {
    src: string
    alt: string
  }
  title: string
  author: {
    email: string
    name: string
  }
  tags: string[]
  likes: number
  comments: number
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  author,
  tags,
  likes,
  comments,
}) => {
  return (
    <Box borderWidth="1px" rounded="lg" width="100%" marginBottom={3}>
      {image && <Image src={image.src} alt={image.alt} maxHeight="275px" />}
      <Box p={6} borderTopWidth={image && '1px'}>
        <Box
          as="h3"
          color="gray"
          fontWeight="bold"
          letterSpacing="normal"
          fontSize="3xl"
        >
          {title}
        </Box>
        <Flex flexDirection="row">
          <Flex marginRight={1}>
            <Gravatar email={author.email} />
          </Flex>
          <Flex flexDirection="column">
            <Flex>
              {tags.map((tag) => (
                <NextLink href={`/tags/${tag}`} key={tag}>
                  <Link as="a" marginRight={1}>
                    #{tag}
                  </Link>
                </NextLink>
              ))}
            </Flex>
            <Flex>
              <Link color="gray.500">{author.name}</Link>
            </Flex>
          </Flex>
        </Flex>
        <Flex marginTop={3}>
          <Flex as={Link} marginRight={2}>
            <Image
              src="/images/reactions-stack.png"
              alt="heart"
              width="24px"
              height="18px"
            />
            <Box as="span" marginLeft={1} fontSize="base" color="gray.500">
              {likes}
            </Box>
          </Flex>
          <Flex as={Link}>
            <Image
              src="/images/comments-bubble.png"
              alt="chat"
              width="28px"
              height="19px"
            />
            <Box as="span" marginLeft={1} fontSize="base" color="gray.500">
              {comments}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Card
