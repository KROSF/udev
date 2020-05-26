import React, { useState } from 'react'
import { Flex, Heading, Button, CloseButton, FlexProps } from '@chakra-ui/core'
import DropZone from './DropZone'
import { UseDisclosureReturn } from '@chakra-ui/core/dist/useDisclosure'
import { sendFiles } from '../services/api'
import Copiable from './Copiable'

const MAX_SIZE_25MB = 26_214_400

const ImagesForm: React.FC<
  Pick<UseDisclosureReturn, 'onClose'> &
    FlexProps & { setValue: (data: object) => void }
> = ({ onClose, setValue, ...props }) => {
  const [bodyFiles, setBodyFiles] = useState<string[]>([])
  return (
    <Flex flexDirection="column" alignItems="center" {...props}>
      <Flex alignSelf="flex-start">
        <CloseButton onClick={onClose} />
      </Flex>
      <Flex flexDirection="column" alignItems="center" margin="40px">
        <Heading as="h3" fontWeight="bolder" color="teal.500" marginBottom={5}>
          Cover Image
        </Heading>
        <DropZone
          sendFiles
          hasThumbnail
          marginBottom={5}
          width="100%"
          onSendFiles={async (files) => {
            const [cover] = await sendFiles(files)
            setValue({ cover_url: cover })
          }}
          dropZoneOptions={{
            accept: 'image/*',
            maxSize: MAX_SIZE_25MB,
            multiple: false,
          }}
        />
        <Heading as="h3" fontWeight="bolder" color="teal.500" marginBottom={5}>
          Body Images
        </Heading>
        {bodyFiles.length > 0 ? (
          <Flex
            flexDirection="column"
            width="100%"
            maxHeight="calc(63px*4)"
            overflowY="scroll"
            paddingBottom="1rem"
          >
            {bodyFiles.map((file) => (
              <Copiable text={`![](${file})`} />
            ))}
          </Flex>
        ) : (
          <DropZone
            sendFiles
            onSendFiles={async (files) => {
              try {
                const res = await sendFiles(files)
                setBodyFiles(res)
              } catch {}
            }}
            marginBottom={5}
            width="100%"
            dropZoneOptions={{ accept: 'image/*', maxSize: MAX_SIZE_25MB }}
          />
        )}
        <Button variantColor="teal" onClick={onClose}>
          Done
        </Button>
      </Flex>
    </Flex>
  )
}

export default ImagesForm
