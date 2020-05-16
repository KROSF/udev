import { Flex } from '@chakra-ui/core'
import React from 'react'
import Card from '../components/Card'

const Home = () => {
  return (
    <Flex>
      <Flex flex={1} justifyContent="flex-end" paddingRight="1.5rem">
        Hola
      </Flex>
      <Flex flex={1} flexDirection="column">
        <Card
          image={{
            src: '/images/q19vviykh0oi1s5tkbqe.png',
            alt: 'deno',
          }}
          title="Deno is here!"
          author={{
            email: 'rodrigosanabria22@gmail.com',
            name: 'Rodrigo Sanabria',
          }}
          tags={['javascript', 'node', 'deno']}
          likes={0}
          comments={0}
        />
        <Card
          title="Deno is here!"
          author={{
            email: 'ruben.mondom@gmail.com',
            name: 'Ruben Montero',
          }}
          tags={['wordpress', 'php', 'drupal']}
          likes={0}
          comments={0}
        />
        <Card
          title="Deno is here!"
          author={{
            email: 'frpericacho@gmail.com',
            name: 'Felix Rodriguez',
          }}
          tags={['cpp', 'java', 'maven']}
          likes={0}
          comments={0}
        />
      </Flex>
      <Flex flex={1} paddingLeft="1.5rem">
        Hola
      </Flex>
    </Flex>
  )
}

export default Home
