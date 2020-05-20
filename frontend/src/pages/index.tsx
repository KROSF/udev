import { Flex } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { posts, Post } from '../services/api'

const Home = () => {
  const [data, setData] = useState<Post[]>([])

  useEffect(() => {
    ;(async () => {
      const res = await posts()
      setData(res)
    })()
  }, [])

  return (
    <Flex>
      <Flex flex={1} justifyContent="flex-end" paddingRight="1.5rem">
        Hola
      </Flex>
      <Flex flex={1} flexDirection="column">
        {data.map((post, index) => {
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
