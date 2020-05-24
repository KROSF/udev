import React from 'react'
import { Flex, Button, Icon } from '@chakra-ui/core'
import Gravatar from '../components/Gravatar'
import { Github, Twitter } from '@zeit-ui/react-icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks'
import { User, RootPost } from '../services/api'
import moment from 'moment'
import Loading from '../components/Loading'
import Card from '../components/Card'
import { useAuth } from '../services/auth'
import { routes } from '../router/routes'

const UserPosts = ({ id }: { id: number }) => {
  const { response, loading } = useApi<RootPost>({
    url: `users/${id}/posts`,
    trigger: '' + id,
    forceDispatchEffect: () => !!id,
  })

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
              <Card first={index === 0} post={post} key={post.title + index} />
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
            {user && user.username === response.data.username && (
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
                  {moment(response.data.created_at).format('LL')}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <UserPosts id={response.data.id} />
      </>
    )
  )
}

export default UserProfile
