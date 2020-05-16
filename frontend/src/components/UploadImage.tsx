import React, { useCallback } from 'react'

import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { Flex, FlexProps } from '@chakra-ui/core'
import { sendFiles } from '../services/api'

const UploadImage: React.FC<
  FlexProps & { dropZoneOptions?: Omit<DropzoneOptions, 'onDrop'> }
> = ({ children: _, dropZoneOptions = {}, ...props }) => {
  const onDrop = useCallback(async (files: File[]) => {
    await sendFiles(files)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...dropZoneOptions,
    onDrop,
  })

  return (
    <Flex
      borderWidth="1px"
      padding="20px"
      rounded="lg"
      {...props}
      {...getRootProps()}
    >
      <Flex as="input" {...getInputProps()} />
      {isDragActive ? (
        <Flex as="p">Drop the files here ...</Flex>
      ) : (
        <Flex as="p">
          Drag 'n' drop some files here, or click to select files
        </Flex>
      )}
    </Flex>
  )
}

export default UploadImage
