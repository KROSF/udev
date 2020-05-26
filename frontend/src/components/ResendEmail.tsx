import React, { useCallback, useState } from 'react'
import { Box, Link as ChakraLink } from '@chakra-ui/core'
import { useLocation } from 'react-router-dom'
import { resendVerificationCode } from '../services/api'

const ResendEmail = () => {
  const [status, setStatus] = useState<'initial' | 'sending' | 'sent'>(
    'initial',
  )
  const location = useLocation()
  const email = new URLSearchParams(location.search).get('email') || ''

  const onClick = useCallback(async () => {
    if (email) {
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
