import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Button } from '@chakra-ui/core'

const Tag = () => {
  const router = useRouter()
  const { tag } = router.query

  return (
    <Flex>
      <Flex
        borderWidth="2px"
        rounded="lg"
        marginX="32px"
        paddingY="1.5rem"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Flex as="h1" letterSpacing="normal" fontSize="6xl" marginRight={4}>
          {tag}
        </Flex>
        <Button leftIcon="add">FOLLOW</Button>
      </Flex>
    </Flex>
  )
}

export default Tag
