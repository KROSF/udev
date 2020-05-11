import { Button, Flex, IconButton, Input, Textarea } from '@chakra-ui/core'
import React from 'react'

export interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
  return (
    <Flex as="form" flexDirection="column" flexGrow={100}>
      <Flex
        flex="1 0 auto"
        flexDirection="column"
        alignSelf="center"
        width="100%"
      >
        <Flex
          maxWidth="860px"
          height="calc(95% - 40px)"
          width="100%"
          alignSelf="center"
          flexDirection="column"
          borderWidth="1px"
          rounded="lg"
          padding="20px"
        >
          <Flex as={Input} placeholder="Title" marginBottom="15px" />
          <Flex marginBottom="15px">
            <Input
              placeholder="4 tags max, comma separated, no spaces or special characters"
              marginRight={1}
            />
            <IconButton
              icon="attachment"
              aria-label="icon button"
              variant="ghost"
            />
          </Flex>
          <Flex
            as={Textarea}
            placeholder="Body Markdown"
            minHeight="calc(85vh - 280px)"
          />
        </Flex>
      </Flex>
      <Flex
        width="100vw"
        justifyContent="center"
        height="96px"
        alignItems="center"
        flexShrink={0}
        borderTopWidth="1px"
      >
        <Button marginRight={5} rounded="full">
          PREVIEW
        </Button>
        <Button marginRight={5} rounded="full">
          SAVE DRAFT
        </Button>
        <Button
          variantColor="teal"
          variant="solid"
          rightIcon="arrow-forward"
          rounded="full"
        >
          PUBLISH
        </Button>
      </Flex>
    </Flex>
  )
}

export default NewPost
