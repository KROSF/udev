import { Flex, IconButton, Input, Textarea } from '@chakra-ui/core'
import React from 'react'

export interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
  return (
    <Flex flexDirection="column" padding="2rem" justifyContent="space-between">
      <form>
        <Flex>
          <Input placeholder="Title" />
        </Flex>
        <Flex>
          <Input
            placeholder="4 tags max, comma separated, no spaces or special characters"
            marginRight={5}
          />
          <IconButton icon="attachment" aria-label="images icon" />
        </Flex>
        <Flex>
          <Textarea placeholder="Body Markdown" />
        </Flex>
      </form>
    </Flex>
  )
}

export default NewPost
