import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { object, string, ref } from 'yup'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  FormHelperText,
  Alert,
  AlertIcon,
} from '@chakra-ui/core'
import { resetPassword } from '../../services/api'
import { useRouter } from 'next/router'
import PasswordInput from '../../components/PasswordInput'

type FormValues = {
  password: string
  confirmPassword: string
  server?: string
}

const schema = object().shape({
  password: string().required().min(8),
  confirmPassword: string().oneOf([ref('password'), null]),
})

const ResetPassword = () => {
  const router = useRouter()
  const { code } = router.query
  const { handleSubmit, errors, register, formState, setError } = useForm<
    FormValues
  >({
    validationSchema: schema,
  })

  const onSubmit = useCallback(
    async ({ password }: FormValues) => {
      try {
        if (code && typeof code === 'string') {
          await resetPassword({ code, password })
          router.push('/login')
        }
      } catch (error) {
        setError(
          'server',
          'server: ' + error.response.status,
          error.response.data.messages.error,
        )
      }
    },
    [code],
  )

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
        {errors.server && (
          <Alert status="error" borderWidth="1px" rounded="lg" marginY={3}>
            <AlertIcon />
            {errors.server.message}
          </Alert>
        )}
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          flexDirection="column"
          width="100%"
        >
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
            <FormHelperText>
              Make sure it&#39;s at least 15 characters OR at least 8 characters
              including a number and a lowercase letter.
            </FormHelperText>
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
            Chage Password
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ResetPassword
