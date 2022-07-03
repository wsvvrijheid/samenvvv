import { useRouter } from 'next/router'

import { RouteKeys } from '@config'
import { getItemLink } from '@utils'

export const useItemLink = (
  item: Hashtag | Post,
  type: RouteKeys,
  isAbsolute?: boolean,
): string | null => {
  const { locale } = useRouter()

  if (!item) return null

  return getItemLink(item, locale as StrapiLocale, type, isAbsolute)
}
