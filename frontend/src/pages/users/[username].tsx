import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Button, Icon } from '@chakra-ui/core'
import Gravatar from '../../components/Gravatar'
import { Github, Twitter } from '@zeit-ui/react-icons'

const User = () => {
  const router = useRouter()
  const { username } = router.query
  return (
    <Flex borderWidth="1px" rounded="lg" marginX="32px" paddingY="3rem">
      <Flex flex={1} alignItems="center" justifyContent="center">
        <Gravatar
          email="rodrigosanabria22@gmail.com"
          imgSize={240}
          width="200px"
          height="200px"
          borderWidth="5px"
        />
      </Flex>
      <Flex flex={2} flexDirection="column">
        <Flex as="h1" fontSize="6xl" fontWeight="bold">
          Rodrigo Sanabria
        </Flex>
        <Flex>
          <Button>EDIT PROFILE</Button>
        </Flex>
        <Flex
          as="span"
          color="gray.500"
          fontWeight="bold"
          letterSpacing="normal"
          fontSize="xl"
          fontStyle="italic"
          marginTop={5}
        >
          404 bio not found
        </Flex>
        <Flex marginTop={5}>
          <Flex>
            <Icon
              as={Github}
              marginRight={2}
              width="36px"
              height="36px"
              color="gray"
            />
            <Icon
              as={Twitter}
              marginRight={2}
              width="36px"
              height="36px"
              color="gray"
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex flex={1} alignItems="center">
        <Flex
          flexDirection="column"
          borderLeftWidth={4}
          paddingLeft={3}
          paddingY={3}
          alignSelf="center"
        >
          <Flex flexDirection="column" marginBottom={6}>
            <Flex
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="normal"
              fontSize="lg"
            >
              location
            </Flex>
            <Flex letterSpacing="normal" fontSize="xl">
              Spain
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <Flex
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="normal"
              fontSize="lg"
            >
              joined
            </Flex>
            <Flex letterSpacing="normal" fontSize="xl">
              Feb 20, 2019
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default User
