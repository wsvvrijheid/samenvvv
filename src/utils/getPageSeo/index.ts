import { NextSeoProps } from 'next-seo'

import { RouteKeys } from '@config'
import { getItemLink } from '@utils'

export const emptySeoObj = {
  title: '',
  titleTemplate: '',
  defaultTitle: '',
  noindex: false,
  nofollow: false,
  robotsProps: {
    nosnippet: false,
    maxSnippet: 1,
    maxImagePreview: 'standard',
    maxVideoPreview: 1,
    noarchive: false,
    unavailableAfter: '',
    noimageindex: false,
    notranslate: false,
  },
  description: '',
  canonical: '',
  mobileAlternate: {
    media: '',
    href: '',
  },
  openGraph: {
    url: '',
    type: '',
    title: '',
    description: '',
    images: [
      {
        url: '',
        width: 1,
        height: 1,
        alt: '',
        type: '',
        secureUrl: '',
      },
    ],
    videos: [
      {
        url: '',
        width: 1,
        height: 1,
        alt: '',
        type: '',
        secureUrl: '',
      },
    ],
    defaultImageHeight: 1,
    defaultImageWidth: 1,
    locale: '',
    site_name: '',
    profile: {
      firstName: '',
      lastName: '',
      username: '',
      gender: '',
    },
    book: {
      authors: [''],
      isbn: '',
      releaseDate: '',
      tags: [''],
    },
    article: {
      publishedTime: '',
      modifiedTime: '',
      expirationTime: '',
      authors: [''],
      section: '',
      tags: [''],
    },
    video: {
      actors: [
        {
          profile: '',
          role: '',
        },
      ],
      directors: [''],
      writers: [''],
      duration: 1,
      releaseDate: '',
      tags: [''],
      series: '',
    },
  },
  facebook: {
    appId: '',
  },
  twitter: {
    handle: '',
    site: '',
    cardType: '',
  },
  disableGooglebot: false,
}

export const getPageSeo = (
  data: Hashtag | Post,
  locale: StrapiLocale,
  type: RouteKeys,
): NextSeoProps => {
  const url = getItemLink(data as Hashtag | Post, locale, type, true) ?? ''

  const page = data as Hashtag
  const post = data as Post

  const title = page.title ?? post.hashtag?.title ?? ''
  const description = page.description ?? post.text ?? ''
  const image = data.image
  const adminUrl = process.env.NEXT_PUBLIC_API_URL as string

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: adminUrl + image?.url,
          secureUrl: adminUrl + image?.url,
          type: image?.mime as string,
          width: image?.width as number,
          height: image?.height as number,
          alt: title,
        },
      ],
    },
  }
}
