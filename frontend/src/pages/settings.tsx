import React, { useCallback } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Heading,
  Link,
  Textarea,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import { useAuth } from '../services/auth'
import { UpdateUserPayoad, updateUser } from '../services/api'
import { object, string } from 'yup'
import { routes } from '../router/routes'

const schema = object().shape({
  name: string().required().trim(),
  username: string().required().trim(),
  github_username: string().trim(),
  twitter_username: string().trim(),
  location: string().trim(),
})

const Settings = () => {
  const { user, setUser } = useAuth()
  const user_id = user!.id

  const { errors, register, setError, handleSubmit } = useForm<
    UpdateUserPayoad
  >({
    validationSchema: schema,
    defaultValues: {
      name: user?.name,
      username: user?.username,
      github_username: user?.github_username,
      twitter_username: user?.twitter_username,
    },
  })

  const onSubmit = useCallback(
    (data: UpdateUserPayoad) => {
      updateUser(user_id, data)
        .then((res) => {
          setUser(res)
        })
        .catch((err) => {
          Object.entries<string>(err.response.data.messages.errors).forEach(
            ([key, value]) => {
              setError(key as any, 'server: ' + key, value)
            },
          )
        })
    },
    [setUser, setError, user_id],
  )

  return (
    <Flex>
      <Flex flex={1} paddingRight="1.5rem" />
      <Flex
        as="form"
        flexDirection="column"
        onSubmit={handleSubmit(onSubmit)}
        flex={2}
      >
        <Flex>
          <Heading as="h1">
            Settings for{' '}
            <Link href={routes.user(user?.username)} marginRight={2}>
              @{user?.username}
            </Link>
          </Heading>
        </Flex>
        <FormControl isInvalid={!!errors.name} marginBottom={5}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input name="name" placeholder="name" ref={register} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.username} marginBottom={5}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input name="username" placeholder="username" ref={register} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.bio} marginBottom={5}>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Textarea
            name="bio"
            placeholder="A short bio..."
            ref={register}
            resize="unset"
            height="120px"
          />
          <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.location} marginBottom={5}>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input name="location" placeholder="location" ref={register} />
          <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.github_username} marginBottom={5}>
          <FormLabel htmlFor="github_username">GitHub Username</FormLabel>
          <Input
            name="github_username"
            placeholder="github username"
            ref={register}
          />
          <FormErrorMessage>{errors.github_username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.twitter_username} marginBottom={5}>
          <FormLabel htmlFor="twitter_username">Twitter Username</FormLabel>
          <Input
            name="twitter_username"
            placeholder="twitter username"
            ref={register}
          />
          <FormErrorMessage>
            {errors.twitter_username?.message}
          </FormErrorMessage>
        </FormControl>
        <Flex>
          <Button
            variantColor="teal"
            variant="solid"
            rounded="full"
            type="submit"
          >
            SAVE
          </Button>
        </Flex>
      </Flex>
      <Flex flex={1} paddingLeft="1.5rem" />
    </Flex>
  )
}

export default Settings
