import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  chakra,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'

import { ChakraNextImage } from '@components'
import { getTwitterVideoUrl } from '@utils'

import { Navigate } from '../../Shared/Navigate'

interface TweetWidgetProps {
  title: string
  tweets?: Tweet[]
}

export const TweetWidget = ({
  title,
  tweets,
}: TweetWidgetProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <VStack align="stretch" justify="stretch" h={640}>
      <Text color="gray.500" fontSize="sm">
        {title}
      </Text>
      <Box bg="white" p={4} overflow="auto" shadow="primary">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {tweets && tweets.length > 0 ? (
            tweets.map((tweet, index) => {
              const { id, user, text, videos, image, likes } = tweet
              return (
                <HStack key={index} alignItems="flex-start">
                  <Avatar size="sm" name={user.name} src={user.profile} />

                  <Stack fontSize="sm">
                    <HStack noOfLines={1} fontWeight={600}>
                      <chakra.span>{user.name}</chakra.span>
                      <chakra.span as="span" fontSize="xs" fontWeight={400}>
                        @{user.username}
                      </chakra.span>
                    </HStack>
                    <Text lineHeight="1.5" whiteSpace="normal">
                      {text}
                    </Text>
                    {videos ? (
                      <AspectRatio
                        ratio={16 / 9}
                        w="full"
                        rounded="lg"
                        overflow="hidden"
                      >
                        <ReactPlayer
                          muted
                          playing
                          style={{ width: '100%' }}
                          url={getTwitterVideoUrl(videos)}
                          width="100%"
                          height="100%"
                          light={image}
                          playIcon={
                            <Box
                              boxSize={12}
                              color="whiteAlpha.700"
                              as={FaPlayCircle}
                            />
                          }
                        />
                      </AspectRatio>
                    ) : (
                      image && (
                        <ChakraNextImage
                          ratio="twitter"
                          w="full"
                          image={image}
                        />
                      )
                    )}
                    <ButtonGroup size="sm" variant="ghost">
                      <Button
                        fontWeight={400}
                        as={Navigate}
                        href={`https://twitter.com/intent/like?tweet_id=${id}`}
                        leftIcon={<AiOutlineHeart />}
                      >
                        {likes}
                      </Button>
                      <Button
                        fontWeight={400}
                        as={Navigate}
                        href={`https://twitter.com/intent/retweet?tweet_id=${id}`}
                        leftIcon={<AiOutlineRetweet />}
                      >
                        {likes}
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </HStack>
              )
            })
          ) : (
            <Stack textAlign="center">
              <Image src="/images/tweet-widget.svg" alt="no tweets" />
              <Text>{t`post.no-tweet`}</Text>
            </Stack>
          )}
        </VStack>
      </Box>
    </VStack>
  )
}
