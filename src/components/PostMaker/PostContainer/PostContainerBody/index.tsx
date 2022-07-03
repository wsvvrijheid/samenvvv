import { FC, memo } from 'react'

import { Box, Spacer, Stack } from '@chakra-ui/react'

import { ChakraNextImage } from '@components'

import { PostContainerTags } from '../PostContainerTags'
import { PostTextarea } from '../PostTextarea'

interface PostContainerBodyProp {
  postImage?: string
}

export const PostContainerBody: FC<PostContainerBodyProp> = memo(
  function PostContainerBody({ postImage }) {
    return (
      <Stack
        flex={1}
        data-tour="step-post-content"
        data-tour-mob="step-post-content"
        p={4}
        rounded="sm"
        borderWidth={1}
        fontSize="md"
        bg="white"
      >
        <PostTextarea />
        <PostContainerTags />
        <Spacer />
        {postImage && (
          <Box
            rounded="md"
            overflow="hidden"
            borderColor="gray.300"
            borderWidth={1}
          >
            <ChakraNextImage ratio="twitter" h={'100%'} image={postImage} />
          </Box>
        )}
      </Stack>
    )
  },
)
