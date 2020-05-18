import React, { useCallback } from 'react'
import { object, string, ref } from 'yup'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import { signUp } from '../services/api'
import { useRouter } from 'next/router'
import PasswordInput from '../components/PasswordInput'

type FormValues = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

const schema = object().shape({
  email: string().email().required(),
  username: string().required(),
  name: string().required(),
  password: string().required(),
  confirmPassword: string().oneOf([ref('password'), null]),
})

const Login = () => {
  const router = useRouter()
  const { handleSubmit, errors, register, formState, setError } = useForm<
    FormValues
  >({
    validationSchema: schema,
  })

  const onSubmit = useCallback(
    async ({ confirmPassword: _, ...data }: FormValues) => {
      try {
        await signUp(data)
        router.push('/validate', { query: { email: data.email } })
      } catch (error) {
        Object.entries<string>(error.response.data.messages.errors).forEach(
          ([key, value]) => {
            setError(key as any, 'server: ' + key, value)
          },
        )
      }
    },
    [],
  )

  return (
    <Flex justifyContent="center" height="100%" marginTop={20}>
      <Flex width="320px" flexDirection="column">
        <Flex
          borderWidth="1px"
          alignItems="center"
          padding="20px"
          rounded="lg"
          flexDirection="column"
        >
          <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            flexDirection="column"
            width="100%"
          >
            <FormControl isInvalid={!!errors.email} marginBottom={5}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input name="email" placeholder="email" ref={register} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
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
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password} marginBottom={5}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <PasswordInput
                name="password"
                placeholder="password"
                ref={register}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword} marginBottom={5}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <PasswordInput
                name="confirmPassword"
                placeholder="confirmPassword"
                ref={register}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Sign Up
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login
