import MarkdownRender from '../components/MarkdownRender'
import { useRouter } from 'next/router'
import { Post } from '../services/api'
import { useApi } from '../hooks'
import { Flex, Heading, Image, Box } from '@chakra-ui/core'
import Loading from '../components/Loading'
import AuthorCard from '../components/AuthorCard'
import PostTags from '../components/PostTags'
import Author from '../components/Author'

const getPostId = (post?: string | string[]) =>
  post && typeof post === 'string'
    ? post.substring(post.lastIndexOf('-') + 1)
    : ''

const PostByID = () => {
  const router = useRouter()
  const postId = getPostId(router.query.post)
  const { response, loading, error } = useApi<Post>({
    url: `/posts/${postId}`,
    trigger: postId,
    forceDispatchEffect: () => !!postId,
  })

  if (loading) {
    return <Loading />
  }

  if (error || response === null) {
    return <Flex>Error...</Flex>
  }

  return (
    <Flex>
      <Flex flex={1} justifyContent="flex-end" paddingX="1.5rem"></Flex>
      <Flex flex={2} flexDirection="column" overflow="scroll">
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
            <MarkdownRender source={response.data.body} />
          </Flex>
        </Flex>
      </Flex>
      <Flex flex={1} paddingX="1.5rem">
        <AuthorCard user={response.data.user} width="100%" />
      </Flex>
    </Flex>
  )
}

export default PostByID
