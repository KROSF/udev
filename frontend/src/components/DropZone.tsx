import React, { useCallback, useState, useEffect } from 'react'

import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { Flex, FlexProps, Image } from '@chakra-ui/core'
import { sendFiles } from '../services/api'

export interface FilePreview extends File {
  preview: string
}

export const Thumb: React.FC<{ file: FilePreview }> = ({ file }) => {
  return (
    <Flex>
      <Image src={file.preview} />
    </Flex>
  )
}

const DropZone: React.FC<
  FlexProps & {
    dropZoneOptions?: Omit<DropzoneOptions, 'onDrop'>
    sendFiles?: boolean
    onSendFiles: (files: FilePreview[]) => void
    hasThumbnail?: boolean
  }
> = ({
  children: _,
  dropZoneOptions = {},
  sendFiles = false,
  hasThumbnail = false,
  onSendFiles,
  ...props
}) => {
  const [files, setFiles] = useState<FilePreview[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...dropZoneOptions,
    onDrop,
  })

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  useEffect(() => {
    if (sendFiles && files.length > 0) {
      onSendFiles(files)
    }
  }, [sendFiles, files])

  return hasThumbnail && files.length > 0 ? (
    <Flex>
      {files.map((file) => (
        <Thumb file={file} key={file.name} />
      ))}
    </Flex>
  ) : (
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

export default DropZone
