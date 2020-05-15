import React, { useCallback, useEffect } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Link as ChakraLink,
  Box,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import Link from 'next/link'
import { validateEmail } from '../../services/api'
import ResendEmail from '../../components/ResendEmail'

const schema = object().shape({
  code: string().required(),
})

const Validate = () => {
  const router = useRouter()
  const { code } = router.query

  const {
    handleSubmit,
    errors,
    register,
    formState,
    setValue,
    setError,
  } = useForm({
    validationSchema: schema,
  })

  useEffect(() => {
    setValue('code', code)
  }, [code])

  const onSubmit = useCallback(async ({ code }: Record<'code', string>) => {
    try {
      await validateEmail({ code })
      router.push('/login')
    } catch (error) {
      setError(
        'code',
        'server: ' + error.response.status,
        error.response.data.messages.error,
      )
    }
  }, [])

  return (
    <Flex justifyContent="center" height="100%" marginTop={20}>
      <Flex width="320px" flexDirection="column" alignItems="center">
        <Flex as="h3" letterSpacing="normal" fontSize="5xl">
          Signup
        </Flex>
        <Flex as="h5" letterSpacing="normal" fontSize="xl" marginBottom={5}>
          Check your email inbox
        </Flex>
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          flexDirection="column"
          width="100%"
        >
          <FormControl isInvalid={!!errors.code} marginBottom={5}>
            <FormLabel htmlFor="code">Email Verification Code</FormLabel>
            <Input name="code" placeholder="code" ref={register} />
            <FormErrorMessage>
              {errors.code && errors.code.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            variantColor="teal"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Confirm
          </Button>
          <ResendEmail />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Validate
