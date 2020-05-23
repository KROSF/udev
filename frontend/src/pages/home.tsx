import { Flex } from '@chakra-ui/core'
import React from 'react'
import Card from '../components/Card'
import { RootPost } from '../services/api'
import { useApi } from '../hooks'
import Loading from '../components/Loading'
import NotFound from '../components/NotFound'

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
    return <NotFound />
  }

  return (
    <Flex>
      <Flex flex={1} justifyContent="flex-end" paddingRight="1.5rem" />
      <Flex flex={2} flexDirection="column">
        {response.data.data.map((post, index) => {
          return (
            <Card first={index === 0} post={post} key={post.title + index} />
          )
        })}
      </Flex>
      <Flex flex={1} paddingLeft="1.5rem" />
    </Flex>
  )
}

export default Home
