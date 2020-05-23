/** @jsx jsx */
import {
  InputGroup,
  Input,
  InputRightElement,
  InputProps,
  IconButton,
} from '@chakra-ui/core'
import { EyeOff, Eye } from '@zeit-ui/react-icons'
import { forwardRef, useState } from 'react'
import { jsx, css } from '@emotion/core'

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        {...props}
        pr="2.5rem"
        type={show ? 'text' : 'password'}
        ref={ref}
      />
      <InputRightElement width="2.5srem">
        <IconButton
          bg="transparent"
          css={css`
            border: none;
            &:hover {
              background: transparent;
            }
          `}
          aria-label={show ? 'Hide' : 'Show'}
          icon={show ? EyeOff : Eye}
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>
  )
})

export default PasswordInput
