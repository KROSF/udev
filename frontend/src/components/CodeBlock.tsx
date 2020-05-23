import React, { useRef, useEffect } from 'react'
import hljs from 'highlight.js'
import { Box } from '@chakra-ui/core'

export interface CodeBlockProps {
  value: string
  language?: string
}

const CodeBlock = ({ language = '', value }: CodeBlockProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    hljs.highlightBlock(ref.current as hljs.Node)
  }, [])

  return (
    <Box as="pre" marginBottom="1rem">
      <Box
        as="code"
        ref={ref}
        className={`language-${language}`}
        rounded="sm"
        padding="1.5rem"
      >
        {value}
      </Box>
    </Box>
  )
}

export default CodeBlock
