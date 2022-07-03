import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { request } from '../request'

export const getHashtags = async (
  locale: StrapiLocale,
  populate?: string | string[],
  pageSize?: number,
) => {
  const response = await request<Hashtag[]>({
    url: 'api/hashtags',
    locale,
    populate: undefined,
    sort: ['date:desc'],
    pageSize,
  })

  return response.result || []
}

export const useHashtags = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['hashtags', locale],
    queryFn: () => getHashtags(locale as StrapiLocale),
  })
}
