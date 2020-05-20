import React from 'react'
import { Flex, Spinner } from '@chakra-ui/core'

const Loading = () => {
  return (
    <Flex justifyContent="center" alignItems="center" flexGrow={100}>
      <Spinner
        size="xl"
        color="teal.500"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
      />
    </Flex>
  )
}

export default Loading
