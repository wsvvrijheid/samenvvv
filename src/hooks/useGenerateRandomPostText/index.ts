import { useCallback, useRef } from 'react'

import _ from 'lodash'
import { useRouter } from 'next/router'

import { setPostText, useAppDispatch } from '@store'
import { getRandomPostSentence } from '@utils'

export const useGenerateRandomPostText = () => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const tryCount = useRef<number>(0)

  const generateRandomPostText = useCallback(
    (post?: Post) => {
      if (!post) return

      if (tryCount.current === 10) tryCount.current = 0

      const randomPostSentence = getRandomPostSentence(locale as StrapiLocale)
      const sentences = post.text
        .replace(/\.\.+/g, '.')
        .replace(/\n/g, '.')
        .split('.')
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)

      const numberOfSentences = sentences.length

      const combinationArray = [...Array(numberOfSentences)].map((_, i) => i)

      const combinations = combinationArray.flatMap((v, i) =>
        combinationArray.slice(i + 1).map(w => [v, w]),
      )

      const randomCombination = _.sample(combinations) as number[]

      const randomPostText = sentences
        .slice(randomCombination?.[0] || 0, randomCombination?.[1] || 1)
        .join('. ')
        .trim()

      const combinedText = `${randomPostText}\n\n"${randomPostSentence}"`

      if (
        (randomPostText === '' || combinedText.length > 230) &&
        tryCount.current < 10
      ) {
        tryCount.current += 1
        generateRandomPostText()
      } else {
        dispatch(setPostText(combinedText))
      }
    },
    [dispatch, locale],
  )

  return generateRandomPostText
}
