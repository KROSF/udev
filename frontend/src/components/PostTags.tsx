import React from 'react'
import { Tag } from '../services/api'
import { Flex, Tag as ChakraTag, FlexProps } from '@chakra-ui/core'
import { routes } from '../router/routes'
import { Link } from 'react-router-dom'

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
        <Link to={routes.tag(tag.name)}>
          <ChakraTag
            key={tag.id}
            variantColor={randomColor()}
            size="sm"
            marginRight={2}
          >
            #{tag.name}
          </ChakraTag>
        </Link>
      ))}
    </Flex>
  )
}

export default PostTags
