import React from 'react'
import MarkdownRender from '../components/MarkdownRender'
import { useParams } from 'react-router-dom'
import { Post } from '../services/api'
import { useApi } from '../hooks'
import { Flex, Heading, Image } from '@chakra-ui/core'
import Loading from '../components/Loading'
import AuthorCard from '../components/AuthorCard'
import PostTags from '../components/PostTags'
import Author from '../components/Author'
import NotFound from '../components/NotFound'
import Discussion from '../components/Discussion'

const getPostId = (post?: string) =>
  post ? post.substring(post.lastIndexOf('-') + 1) : ''

const PostByID = () => {
  const { post } = useParams()
  const { response, loading, error } = useApi<Post>({
    url: `/posts/${getPostId(post)}`,
    trigger: post,
    forceDispatchEffect: () => !!post,
  })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <NotFound />
  }

  return response ? (
    <Flex>
      <Flex flex={1} justifyContent="flex-end" paddingX="1.5rem"></Flex>
      <Flex
        flex={2}
        flexDirection="column"
        overflow="scroll"
        marginBottom="5rem"
      >
        <Flex flexDirection="column" borderWidth="1px">
          <Image src="/images/q19vviykh0oi1s5tkbqe.png" />
          <Flex overflow="scroll" flexDirection="column" padding="1.5rem">
            <Heading
              as="h1"
              fontSize="5xl"
              fontWeight="bold"
              marginBottom="1rem"
            >
              {response.data.title}
            </Heading>
            <Author
              user={response.data.user}
              date={response.data.published_at}
            />
            <PostTags tags={response.data.tags} marginY="1.5rem" />
            <MarkdownRender source={response.data.body} marginBottom="1.5rem" />
            <Discussion post_id={response.data.id} />
          </Flex>
        </Flex>
      </Flex>
      <Flex flex={1} paddingX="1.5rem">
        <AuthorCard user={response.data.user} width="100%" />
      </Flex>
    </Flex>
  ) : (
    <></>
  )
}

export default PostByID
