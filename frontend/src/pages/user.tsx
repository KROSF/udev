import React, { useCallback } from 'react'
import { Flex, Button, Icon, Link, useToast } from '@chakra-ui/core'
import Gravatar from '../components/Gravatar'
import { Github, Twitter } from '@zeit-ui/react-icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks'
import { User, RootPost, deletePost } from '../services/api'
import moment from 'moment'
import Loading from '../components/Loading'
import Card from '../components/Card'
import { useAuth } from '../services/auth'
import { routes } from '../router/routes'

const UserPosts = ({ id, canEdit }: { id: number; canEdit: boolean }) => {
  const { response, loading, reFetch } = useApi<RootPost>({
    url: `users/${id}/posts`,
    trigger: '' + id,
    forceDispatchEffect: () => !!id,
  })
  const toast = useToast()

  const handleDelete = useCallback(
    (id: string | number) => () => {
      deletePost(id)
        .then(() => {
          toast({
            title: 'Post sucessfully deleted.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
          })
          reFetch()
        })
        .catch(() => {
          toast({
            title: 'An error occurred.',
            description: 'Unable to delete post.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
          })
        })
    },
    [toast, reFetch],
  )

  if (loading) {
    return <Loading />
  }

  return (
    response && (
      <Flex marginTop="1.5rem">
        <Flex flex={1} justifyContent="flex-end" paddingRight="1.5rem" />
        <Flex flex={2} flexDirection="column">
          {response.data.data.map((post, index) => {
            return (
              <Card
                first={false}
                post={post}
                key={post.title + index}
                canDelete={canEdit}
                onDelete={handleDelete(post.id)}
              />
            )
          })}
        </Flex>
        <Flex flex={1} paddingLeft="1.5rem" />
      </Flex>
    )
  )
}

const UserProfile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { response, loading } = useApi<User>({
    url: `users/${username}`,
    trigger: username,
    forceDispatchEffect: () => !!username,
  })

  const canEdit = !!(
    user &&
    response &&
    user.username === response.data.username
  )

  if (loading) {
    return <Loading />
  }

  return (
    response && (
      <>
        <Flex borderWidth="1px" rounded="lg" marginX="32px" paddingY="3rem">
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Gravatar
              email={response.data.email}
              imgSize={240}
              width="200px"
              height="200px"
              borderWidth="5px"
            />
          </Flex>
          <Flex flex={2} flexDirection="column">
            <Flex as="h1" fontSize="6xl" fontWeight="bold">
              {response.data.name}
            </Flex>
            {canEdit && (
              <Flex>
                <Button
                  variantColor="teal"
                  onClick={() => navigate(routes.settings)}
                >
                  EDIT PROFILE
                </Button>
              </Flex>
            )}
            <Flex
              as="span"
              color="gray.500"
              fontWeight="bold"
              letterSpacing="normal"
              fontSize="xl"
              fontStyle="italic"
              marginTop={5}
            >
              {response.data?.bio ? response.data.bio : '404 bio not found'}
            </Flex>
            <Flex marginTop={5}>
              <Flex>
                {response.data.github_username && (
                  <Link
                    href={`https://github.com/${response.data.github_username}`}
                    marginRight={2}
                    isExternal
                  >
                    <Icon
                      as={Github}
                      color="gray.500"
                      width="36px"
                      height="36px"
                    />
                  </Link>
                )}
                {response.data.twitter_username && (
                  <Link
                    href={`https://twitter.com/${response.data.twitter_username}`}
                    marginRight={2}
                  >
                    <Icon
                      as={Twitter}
                      color="gray.500"
                      width="36px"
                      height="36px"
                    />
                  </Link>
                )}
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
              {response.data?.location && (
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
                    {response.data.location}
                  </Flex>
                </Flex>
              )}
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
                  {moment(response.data.created_at).format('LL')}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <UserPosts id={response.data.id} canEdit={canEdit} />
      </>
    )
  )
}

export default UserProfile
