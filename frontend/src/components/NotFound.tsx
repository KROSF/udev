import React from 'react'
import { Flex, Image } from '@chakra-ui/core'

const NotFound = () => {
  return (
    <Flex justifyContent="center" alignItems="center" flexGrow={100}>
      <Image
        src="https://i.imgur.com/Vyyjycv.gif"
        alt="404 not found image as TV static"
      />
    </Flex>
  )
}

export default NotFound
