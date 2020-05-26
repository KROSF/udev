import React from 'react'
import { useParams } from 'react-router-dom'
import { Flex, Button } from '@chakra-ui/core'
import { RootPost } from '../services/api'
import { useApi } from '../hooks'
import Loading from '../components/Loading'
import Card from '../components/Card'

const Tag = () => {
  const { tag } = useParams()

  const { response, loading, error } = useApi<RootPost>({
    url: `/tags/${tag}/posts`,
    trigger: tag,
    forceDispatchEffect: () => !!tag,
  })

  return (
    <Flex flexDirection="column" width="100%">
      <Flex
        borderWidth="2px"
        rounded="lg"
        paddingY="1.5rem"
        alignItems="center"
        justifyContent="center"
        marginX="32px"
      >
        <Flex as="h1" letterSpacing="normal" fontSize="6xl" marginRight={4}>
          {tag}
        </Flex>
        <Button leftIcon="add">FOLLOW</Button>
      </Flex>
      {loading && (
        <Flex marginTop="1.5rem">
          <Loading />
        </Flex>
      )}
      {response !== null && (
        <Flex marginTop="1.5rem">
          <Flex flex={1} justifyContent="flex-end" paddingRight="1.5rem"></Flex>
          <Flex flex={2} flexDirection="column">
            {response.data.data.map((post, index) => {
              return <Card first={false} post={post} key={post.title + index} />
            })}
          </Flex>
          <Flex flex={1} paddingLeft="1.5rem"></Flex>
        </Flex>
      )}
      {error && <Flex>Error...</Flex>}
    </Flex>
  )
}

export default Tag
