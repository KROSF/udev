import React from 'react'
import { Flex, Heading, Button, CloseButton, FlexProps } from '@chakra-ui/core'
import UploadImage from './UploadImage'
import { UseDisclosureReturn } from '@chakra-ui/core/dist/useDisclosure'

const MAX_SIZE_25MB = 26_214_400

const ImagesForm: React.FC<
  Pick<UseDisclosureReturn, 'onClose'> & FlexProps
> = ({ onClose, ...props }) => {
  return (
    <Flex flexDirection="column" alignItems="center" {...props}>
      <Flex alignSelf="flex-start">
        <CloseButton onClick={onClose} />
      </Flex>
      <Flex flexDirection="column" alignItems="center" margin="40px">
        <Heading as="h3" fontWeight="bolder" color="teal.500" marginBottom={5}>
          Cover Image
        </Heading>
        <UploadImage
          marginBottom={5}
          width="100%"
          dropZoneOptions={{
            accept: 'image/*',
            maxSize: MAX_SIZE_25MB,
            multiple: false,
          }}
        />
        <Heading as="h3" fontWeight="bolder" color="teal.500" marginBottom={5}>
          Body Images
        </Heading>
        <UploadImage
          marginBottom={5}
          width="100%"
          dropZoneOptions={{ accept: 'image/*', maxSize: MAX_SIZE_25MB }}
        />
        <Button variantColor="teal" onClick={onClose}>
          Done
        </Button>
      </Flex>
    </Flex>
  )
}

export default ImagesForm
