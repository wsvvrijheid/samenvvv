import { truncateText } from '@utils'

export const makeTwitterContent = (
  description: string,
  title?: string,
): string => {
  const twitterCharLimit = 280
  const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link
  const titleCharCount = title?.length || 0

  const text = truncateText(
    description,
    twitterCharLimit - linkCharCount - titleCharCount,
  )

  return title ? title + '\n\n' + text : text
}
