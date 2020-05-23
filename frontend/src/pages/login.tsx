import React, { useCallback } from 'react'
import { object, string } from 'yup'
import {
  Flex,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Link as ChakraLink,
  Button,
  Box,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import { login } from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import { routes } from '../router/routes'
import { useAuth } from '../services/auth'

type FormValues = {
  email: string
  password: string
  server?: string
}

const schema = object().shape({
  email: string().email().required(),
  password: string().required(),
})

const Login = () => {
  const navigate = useNavigate()
  const { login: setTokens } = useAuth()
  const { handleSubmit, errors, register, formState, setError } = useForm<
    FormValues
  >({
    validationSchema: schema,
  })

  const onSubmit = useCallback(
    async ({ server: _, ...credentials }: FormValues) => {
      try {
        const tokens = await login(credentials)
        setTokens(tokens)
        navigate(routes.home)
      } catch (error) {
        setError(
          'server',
          'server: ' + error.response.status,
          error.response.data.messages.error,
        )
      }
    },
    [navigate, setError, setTokens],
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
            <FormControl isInvalid={!!errors.email} marginBottom={5}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input name="email" placeholder="email" ref={register} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
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
            <FormControl>
              <Link to={routes.forgotPassword}>
                <ChakraLink color="teal.500">Forgot Password</ChakraLink>
              </Link>
            </FormControl>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Sign In
            </Button>
          </Flex>
        </Flex>
        <Flex
          borderWidth="1px"
          justifyContent="center"
          padding="20px"
          rounded="lg"
          marginTop="16px"
        >
          <Box as="p">
            New to udev?{' '}
            <Link to={routes.register}>
              <ChakraLink color="teal.500">Crete an account</ChakraLink>
            </Link>
            .
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login
