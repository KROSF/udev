import { Box, Flex, Image, Link } from '@chakra-ui/core'
import React from 'react'
import Gravatar from './Gravatar'

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
                <Link as="a" marginRight={1} key={tag}>
                  #{tag}
                </Link>
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
              src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/reactions-stack-ee166e138ca182a567f74c986b6f810f670f4d199aca9c550cc7e6f49f34bd33.png"
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
              src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/comments-bubble-9958d41b969a1620c614347d5ad3f270ab49582c1d9f82b617a6b4156d05dda0.png"
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
