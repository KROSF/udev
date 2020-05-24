import React, { useCallback, useState } from 'react'
import { object, string } from 'yup'
import {
  Flex,
  FormControl,
  Textarea,
  FormErrorMessage,
  Button,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import { addDiscussion } from '../services/api'
import MarkdownRender from './MarkdownRender'
import { useAuth } from '../services/auth'

const schema = object().shape({
  content: string().required(),
})

const DiscussionForm: React.FC<{
  post_id: string | number
  onDiscussion: () => void
  discussion_id?: string | number
}> = ({ post_id, onDiscussion, discussion_id = null }) => {
  const [preview, setPreview] = useState(false)
  const { isUserLoggedIn } = useAuth()
  const { handleSubmit, errors, register, getValues, reset } = useForm<{
    content: string
  }>({
    validationSchema: schema,
  })

  const onSubmit = useCallback(
    async ({ content }: { content: string }) => {
      try {
        await addDiscussion({ id: post_id, content, discussion_id })
        reset()
        onDiscussion()
      } catch (error) {}
    },
    [post_id, discussion_id, onDiscussion, reset],
  )

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      flexDirection="column"
      width="100%"
    >
      <MarkdownRender
        source={getValues().content}
        borderWidth="1px"
        padding="0.5rem"
        minHeight="10rem"
        rounded="lg"
        display={preview ? undefined : 'none'}
      />
      <Flex display={preview ? 'none' : undefined}>
        <FormControl isInvalid={!!errors.content} width="100%">
          <Textarea
            name="content"
            ref={register}
            placeholder="Add to the discussion"
            minHeight="10rem"
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex justifyContent="flex-end" marginTop="1.5rem">
        <Button
          marginRight={5}
          rounded="full"
          size="xs"
          onClick={() => setPreview(!preview)}
        >
          {preview ? 'MARKDOWN' : 'PREVIEW'}
        </Button>
        <Button
          variantColor="teal"
          variant="solid"
          rounded="full"
          type="submit"
          size="xs"
          isDisabled={!isUserLoggedIn}
        >
          SUBMIT
        </Button>
      </Flex>
    </Flex>
  )
}

export default DiscussionForm
