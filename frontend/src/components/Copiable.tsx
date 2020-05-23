import React from 'react'
import { useClipboard, IconButton, useToast, Flex } from '@chakra-ui/core'
import { Copy } from '@zeit-ui/react-icons'

const Copiable = ({ text }: { text: string }) => {
  const { onCopy } = useClipboard(text)
  const toast = useToast()
  return (
    <Flex
      width="100%"
      rounded="lg"
      borderWidth="1px"
      paddingX="10px"
      paddingY="8px"
      justifyContent="space-between"
      alignItems="center"
      marginBottom="5px"
    >
      <Flex
        as="p"
        flexGrow={2}
        overflowX="scroll"
        maxWidth="450px"
        whiteSpace="nowrap"
      >
        {text}
      </Flex>

      <IconButton
        marginLeft={2}
        aria-label="copy-icon"
        icon={Copy}
        onClick={() => {
          onCopy && onCopy()
          toast({
            description: 'Copied to clipboard!',
            position: 'bottom-right',
            duration: 500,
          })
        }}
      />
    </Flex>
  )
}

export default Copiable
