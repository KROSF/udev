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
} from '@chakra-ui/core'
import { UseDisclosureReturn } from '@chakra-ui/core/dist/useDisclosure'
import React from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'

const schema = object().shape({
  email: string().email().required(),
  password: string().required(),
})

const Login: React.FC<Omit<UseDisclosureReturn, 'onOpen'>> = ({
  isOpen,
  onClose,
}) => {
  const { handleSubmit, errors, register, formState } = useForm({
    validationSchema: schema,
  })

  function onSubmit(values: Record<string, any>) {
    console.log(values)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input name="email" placeholder="email" ref={register} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
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
              Submit
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default Login
