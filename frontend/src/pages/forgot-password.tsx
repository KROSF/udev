import React, { useCallback } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { forgotPassword } from '../services/api'
import { useRouter } from 'next/router'

const schema = object().shape({
  email: string().email().required(),
})

const ForgotPassword = () => {
  const router = useRouter()
  const { handleSubmit, errors, register, formState, setError } = useForm<{
    email: string
  }>({
    validationSchema: schema,
  })

  const onSubmit = useCallback(async (data: Record<'email', string>) => {
    try {
      await forgotPassword(data)
      router.push('/reset-password')
    } catch (error) {
      setError(
        'email',
        'server: ' + error.response.status,
        error.response.data.messages.error,
      )
    }
  }, [])

  return (
    <Flex justifyContent="center" height="100%" marginTop={20}>
      <Flex
        width="320px"
        flexDirection="column"
        alignItems="center"
        rounded="lg"
        borderWidth="1px"
        padding="20px"
      >
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          flexDirection="column"
          width="100%"
        >
          <FormControl isInvalid={!!errors.email} marginBottom={2}>
            <FormLabel htmlFor="email" marginBottom={2}>
              Enter your user account&#39;s verified email address and we will
              send you a password reset link.
            </FormLabel>
            <Input
              name="email"
              placeholder="Enter your email address"
              ref={register}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            variantColor="teal"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Send password reset email
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ForgotPassword
