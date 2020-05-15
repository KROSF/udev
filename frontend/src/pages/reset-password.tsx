import React from 'react'
import { Flex, Button } from '@chakra-ui/core'
import { useRouter } from 'next/router'

const ResetPassword = () => {
  const router = useRouter()
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
        <Flex as="span" width="100%">
          Check your email for a link to reset your password. If it doesn&#39;t
          appear within a few minutes, check your spam folder.
        </Flex>
        <Button
          mt={4}
          variantColor="teal"
          width="100%"
          onClick={() => router.push('/login')}
        >
          Return to log in
        </Button>
      </Flex>
    </Flex>
  )
}

export default ResetPassword
