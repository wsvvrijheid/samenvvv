import { Box, Stack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import {
  AnimatedBox,
  Container,
  Hero,
  Layout,
  Markdown,
  SliderHero,
} from '@components'
import { getHashtags } from 'src/lib/hashtag-events'

interface HashtagEventsProps {
  hashtags: Hashtag[]
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const HashtagEvents = ({ hashtags, seo, source }: HashtagEventsProps) => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero title={seo.title as string} isFullHeight={false} />
      <Container overflowX="hidden">
        {source && (
          <Box my={8} maxW="container.md" mx="auto" textAlign="center">
            <Markdown source={source} />
          </Box>
        )}

        <Stack spacing={12} mb={12}>
          {hashtags?.map((hashtag, i) => (
            <AnimatedBox
              directing={i % 2 === 0 ? 'to-left' : 'to-right'}
              delay={3}
              key={i}
            >
              <Box rounded="lg" overflow="hidden" bg="white" shadow="primary">
                <SliderHero item={hashtag} type="hashtag" />
              </Box>
            </AnimatedBox>
          ))}
        </Stack>
      </Container>
    </Layout>
  )
}

export default HashtagEvents

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const hashtags = await getHashtags(locale)

  const title = {
    en: 'Hashtags',
    nl: 'Hashtags',
    tr: 'Hashtag Etiketleri',
  }

  const description = {
    en: '',
    nl: '',
    tr: '',
  }

  const content = {
    en: ``,
    nl: ``,
    tr: ``,
  }

  const seo: NextSeoProps = {
    title: title[locale],
    description: description[locale],
  }

  const source = await serialize(content[locale].trim())

  return {
    props: {
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
      hashtags,
      seo,
      source,
    },
  }
}
