import React from 'react'
import Markdown from 'react-markdown/with-html'
import toc from 'remark-toc'
import ChakraUIRenderer from './ChakraMarkdown'
import { Flex } from '@chakra-ui/core'

export interface MarkdownRenderProps {
  source: string
}

const MarkdownRender = ({ source }: MarkdownRenderProps) => {
  return (
    <Flex flexDirection="column">
      <Markdown
        source={source}
        escapeHtml={false}
        renderers={ChakraUIRenderer()}
        plugins={[toc]}
      />
    </Flex>
  )
}

export default MarkdownRender
