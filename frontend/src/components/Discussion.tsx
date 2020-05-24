import React, { useState } from 'react'
import { Heading, Flex, Button, IconButton, Collapse } from '@chakra-ui/core'
import DiscussionForm from './DiscussionForm'
import { useApi } from '../hooks'
import { RootDiscussions, Discussion as DiscussionType } from '../services/api'
import Loading from './Loading'
import Author from './Author'
import MarkdownRender from './MarkdownRender'
import { useAuth } from '../services/auth'

const DiscussionItem: React.FC<{
  discussion: DiscussionType
  post_id: string | number
  level?: number
  onDiscussion: () => void
}> = ({ discussion, post_id, level = 1, onDiscussion }) => {
  const [reply, setReply] = useState(false)
  const [show, setShow] = useState(true)
  const { isUserLoggedIn } = useAuth()
  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection="column"
        borderWidth="1px"
        padding="1rem"
        marginBottom="1rem"
      >
        <Author user={discussion.user} date={discussion.created_at} />
        <MarkdownRender source={discussion.content} marginTop="0.5rem" />
        <Flex flexDirection="column" marginTop="1rem" marginBottom="0.5rem">
          {reply ? (
            <DiscussionForm
              post_id={post_id}
              onDiscussion={onDiscussion}
              discussion_id={discussion.id}
            />
          ) : (
            <Flex
              justifyContent="flex-end"
              display={level < 4 ? 'flex' : 'none'}
            >
              <Button
                rounded="full"
                size="xs"
                onClick={() => setReply(true)}
                isDisabled={!isUserLoggedIn}
              >
                REPLY
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex marginLeft={level >= 1 ? '1.5rem' : undefined}>
        <Flex flexDirection="column" width="100%">
          {discussion.children.length > 0 && (
            <Flex marginBottom="1rem">
              <IconButton
                icon={show ? 'chevron-up' : 'chevron-down'}
                aria-label="collapse"
                onClick={() => setShow((toggle) => !toggle)}
              />
            </Flex>
          )}
          <Collapse isOpen={show}>
            {discussion.children.map((child) => (
              <DiscussionItem
                key={child.id}
                discussion={child}
                post_id={post_id}
                level={level + 1}
                onDiscussion={onDiscussion}
              />
            ))}
          </Collapse>
        </Flex>
      </Flex>
    </Flex>
  )
}

const Discussion: React.FC<{ post_id: string | number }> = ({ post_id }) => {
  const { response, loading, reFetch } = useApi<RootDiscussions>({
    url: `posts/${post_id}/discussions`,
    trigger: { post_id },
    forceDispatchEffect: () => !!post_id,
  })
  return (
    <Flex flexDirection="column">
      <Heading as="h3" fontSize="xl" fontWeight="bold" marginBottom="1rem">
        Discussion
      </Heading>
      <DiscussionForm post_id={post_id} onDiscussion={reFetch} />
      {loading && <Loading />}
      {response && (
        <Flex flexDirection="column" marginTop="1rem">
          {response.data.data.map((discussion) => (
            <DiscussionItem
              discussion={discussion}
              post_id={post_id}
              onDiscussion={reFetch}
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export default Discussion
