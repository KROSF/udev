import React, { useCallback, useState } from 'react'
import { Box, Link as ChakraLink } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { resendVerificationCode } from '../services/api'

const ResendEmail = () => {
  const [status, setStatus] = useState<'initial' | 'sending' | 'sent'>(
    'initial',
  )
  const router = useRouter()
  const { email } = router.query

  const onClick = useCallback(async () => {
    if (email && typeof email == 'string') {
      setStatus('sending')
      await resendVerificationCode({ email })
      setStatus('sent')
    }
  }, [email])

  return (
    <Box as="span" marginTop={5}>
      {status === 'initial' && (
        <>
          Didn&#39;t receive anything?{' '}
          <ChakraLink color="teal.500" onClick={onClick} as="span">
            Resend email
          </ChakraLink>
          .
        </>
      )}
      {status === 'sending' && <>Resending email...</>}
      {status === 'sent' && <>Email resent. Check again!</>}
    </Box>
  )
}

export default ResendEmail
