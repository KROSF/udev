import {
  Button,
  Flex,
  IconButton,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/core'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { newPost } from '../services/api'
import ImagesForm from '../components/ImagesForm'

type FormValues = {
  title: string
  tags: string
  body: string
}

const schema = object().shape({
  title: string().required(),
  tags: string().required(),
  body: string().required(),
})

const NewPost = () => {
  const { handleSubmit, errors, register } = useForm<FormValues>({
    validationSchema: schema,
  })

  const { isOpen, onClose, onOpen } = useDisclosure(false)

  const onSubmit = useCallback(async (data: FormValues) => {
    try {
      await newPost(data)
    } catch (error) {}
  }, [])

  return (
    <Flex
      as="form"
      flexDirection="column"
      flexGrow={100}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        flex="1 0 auto"
        flexDirection="column"
        alignSelf="center"
        width="100%"
      >
        <Flex
          maxWidth="860px"
          width="100%"
          alignSelf="center"
          flexDirection="column"
          borderWidth="1px"
          rounded="lg"
          padding="20px"
        >
          {isOpen ? (
            <ImagesForm onClose={onClose} height="calc(95vh - 265px)" />
          ) : (
            <>
              <FormControl isInvalid={!!errors.title} marginBottom="15px">
                <Input name="title" placeholder="Title" ref={register} />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <Flex marginBottom="15px">
                <FormControl
                  isInvalid={!!errors.tags}
                  marginRight={1}
                  width="100%"
                >
                  <Input
                    name="tags"
                    placeholder="4 tags max, comma separated, no spaces or special characters"
                    ref={register}
                  />
                  <FormErrorMessage>
                    {errors.tags && errors.tags.message}
                  </FormErrorMessage>
                </FormControl>
                <IconButton
                  icon="attachment"
                  aria-label="icon button"
                  variant="ghost"
                  onClick={onOpen}
                />
              </Flex>
              <FormControl isInvalid={!!errors.body}>
                <Textarea
                  name="body"
                  ref={register}
                  placeholder="Body Markdown"
                  height="calc(85vh - 280px)"
                  resize="unset"
                />
                <FormErrorMessage>
                  {errors.body && errors.body.message}
                </FormErrorMessage>
              </FormControl>
            </>
          )}
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
          type="submit"
        >
          PUBLISH
        </Button>
      </Flex>
    </Flex>
  )
}

export default NewPost
