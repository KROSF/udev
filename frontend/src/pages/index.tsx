import { Flex } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { posts, Post, RootPost } from '../services/api'
import { useApi } from '../hooks'
import Loading from '../components/Loading'

const Home = () => {
  const { response, loading, error } = useApi<RootPost>({
    url: '/posts',
    trigger: '',
    forceDispatchEffect: () => true,
  })

  if (loading) {
    return <Loading />
  }

  if (error || response === null) {
    return <Flex>Error...</Flex>
  }

  return (
    <Flex>
      <Flex flex={1} justifyContent="flex-end" paddingRight="1.5rem">
        Hola
      </Flex>
      <Flex flex={1} flexDirection="column">
        {response.data.data.map((post, index) => {
          return (
            <Card
              key={post.title + index}
              image={
                index === 0
                  ? { src: '/images/q19vviykh0oi1s5tkbqe.png', alt: 'deno' }
                  : undefined
              }
              title={post.title}
              author={{ email: post.user.email, name: post.user.name }}
              tags={post.tags.map((tag) => tag.name)}
              likes={+post.likes}
              comments={+post.comments}
            />
          )
        })}
      </Flex>
      <Flex flex={1} paddingLeft="1.5rem">
        Hola
      </Flex>
    </Flex>
  )
}

export default Home
