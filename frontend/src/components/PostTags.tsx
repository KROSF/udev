import React from 'react'
import { Tag } from '../services/api'
import { Flex, Tag as ChakraTag, FlexProps, Link } from '@chakra-ui/core'

const colors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
] as const

const randomColor = () => colors[Math.floor(Math.random() * colors.length)]

const PostTags: React.FC<FlexProps & { tags: Tag[] }> = ({
  tags,
  ...props
}) => {
  return (
    <Flex {...props}>
      {tags.map((tag) => (
        <Link href={`/tags/${tag.name}`} marginRight={2}>
          <ChakraTag key={tag.id} variantColor={randomColor()} size="sm">
            #{tag.name}
          </ChakraTag>
        </Link>
      ))}
    </Flex>
  )
}

export default PostTags
