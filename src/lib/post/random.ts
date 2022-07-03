import { useRouter } from 'next/router'
import { QueryClient, useQueryClient } from 'react-query'

import { HashtagReturnType } from '../hashtag-events'

export const setRandomPost = (
  queryClient: QueryClient,
  locale: StrapiLocale,
  slug: string,
) => {
  const hashtag = queryClient.getQueryData<HashtagReturnType>([
    'hashtag',
    locale,
    slug,
  ])

  if (!hashtag) return null

  // Set random post to query data
  const randomPostIndex = Math.floor(
    Math.random() * (hashtag.posts?.length || 0),
  )

  let randomPost: Post | null = null

  if (hashtag.posts?.length > 0) {
    randomPost = { ...hashtag.posts[randomPostIndex], hashtag }
  }

  queryClient.setQueryData(['post', locale, slug], randomPost)
}

export const useSetRandomPost = () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  return () =>
    setRandomPost(queryClient, locale as StrapiLocale, slug as string)
}
