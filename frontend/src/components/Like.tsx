import React, { useState, useCallback } from 'react'
import { Button, Image, Box } from '@chakra-ui/core'
import { likePost } from '../services/api'

const Like = ({ likes, postId }: { likes: any[]; postId: string | number }) => {
  const [likesNumber, setLikesNumber] = useState(likes.length)
  const onLike = useCallback(() => {
    likePost(postId).then((res) => {
      setLikesNumber(res.likes)
    })
  }, [setLikesNumber])

  return (
    <Button onClick={onLike}>
      <Image
        src="/images/heart-likes.png"
        width="32px"
        height="32px"
        marginRight="1rem"
      />
      <Box as="span">{likesNumber}</Box>
    </Button>
  )
}

export default Like
