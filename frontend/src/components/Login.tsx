import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Alert,
  AlertIcon,
} from '@chakra-ui/core'
import { UseDisclosureReturn } from '@chakra-ui/core/dist/useDisclosure'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { login } from '../services/api'
import { useAuth } from '../services/auth'

const schema = object().shape({
  email: string().email().required(),
  password: string().required(),
})

type FormValues = {
  email: string
  password: string
  server?: string
}

const Login: React.FC<Omit<UseDisclosureReturn, 'onOpen'>> = ({
  isOpen,
  onClose,
}) => {
  const { handleSubmit, errors, register, formState, setError } = useForm<
    FormValues
  >({
    validationSchema: schema,
  })
  const { setAccessToken } = useAuth()

  const onSubmit = useCallback(
    async ({ server: _, ...credentials }: FormValues) => {
      try {
        const { accessToken } = await login(credentials)
        setAccessToken(accessToken)
      } catch (error) {
        setError(
          'server',
          'server: ' + error.response.status,
          error.response.data.messages.error,
        )
      }
    },
    [setAccessToken],
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent rounded="lg">
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          {errors.server && (
            <Alert status="error" borderWidth="1px" rounded="lg" marginY={3}>
              <AlertIcon />
              {errors.server.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input name="email" placeholder="email" ref={register} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input name="password" placeholder="password" ref={register} />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <Link>Forgot Password</Link>
            </FormControl>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default Login
