import React from 'react'
import Markdown from 'react-markdown/with-html'
import toc from 'remark-toc'
import ChakraUIRenderer from './ChakraMarkdown'
import { Flex, FlexProps } from '@chakra-ui/core'

export interface MarkdownRenderProps extends FlexProps {
  source: string
}

const MarkdownRender: React.FC<MarkdownRenderProps> = ({
  source,
  ...props
}: MarkdownRenderProps) => {
  return (
    <Flex flexDirection="column" {...props}>
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
