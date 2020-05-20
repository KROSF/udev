import React, { PropsWithChildren, ReactType } from 'react'
import {
  Text,
  Code,
  Divider,
  Link,
  List,
  Checkbox,
  ListItem,
  Heading,
  Image,
} from '@chakra-ui/core'
import CodeBlock from './CodeBlock'

export const defaults: Record<string, ReactType> = {
  paragraph: ({ children }: PropsWithChildren<{}>) => {
    return <Text mb={2}>{children}</Text>
  },
  emphasis: ({ children }: PropsWithChildren<{}>) => {
    return <Text as="em">{children}</Text>
  },
  blockquote: ({ children }: PropsWithChildren<{}>) => {
    return <Code p={2}>{children}</Code>
  },
  code: CodeBlock,
  delete: ({ children }: PropsWithChildren<{}>) => {
    return <Text as="del">{children}</Text>
  },
  thematicBreak: Divider,
  link: Link,
  img: Image,
  linkReference: Link,
  imageReference: Image,
  text: ({ children }: PropsWithChildren<{}>) => {
    return <Text as="span">{children}</Text>
  },
  list: ({
    children,
    start,
    depth,
    ordered,
  }: PropsWithChildren<{
    start?: number | null
    ordered?: boolean
    depth?: number
  }>) => {
    const attrs = {} as { start: string }
    if (start !== null && start !== 1 && start !== undefined) {
      attrs.start = start.toString()
    }
    let styleType = 'disc'
    if (ordered) styleType = 'decimal'
    if (depth === 1) styleType = 'circle'
    return (
      <List
        spacing={24}
        as={ordered ? 'ol' : 'ul'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </List>
    )
  },
  listItem: ({
    children,
    checked,
  }: PropsWithChildren<{ checked?: boolean | null }>) => {
    let checkbox = null
    if (checked !== null && checked !== undefined) {
      checkbox = (
        <Checkbox isChecked={checked} isReadOnly>
          {children}
        </Checkbox>
      )
    }
    return (
      <ListItem listStyleType={checked !== null ? 'none' : 'inherit'}>
        {checkbox || children}
      </ListItem>
    )
  },
  definition: () => null,
  heading: ({ children, level }: PropsWithChildren<{ level: number }>) => {
    const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'] as const
    return (
      <Heading my={4} as={`h${level}` as any} size={sizes[level - 1]}>
        {children}
      </Heading>
    )
  },
  inlineCode: ({ children }: PropsWithChildren<{}>) => {
    return <Code>{children}</Code>
  },
}

const ChakraUIRenderer = (theme = defaults) => {
  return {
    ...theme,
  }
}

export default ChakraUIRenderer
