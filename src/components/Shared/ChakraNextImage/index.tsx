import { AspectRatio, Box, BoxProps } from '@chakra-ui/react'
import Image, { ImageProps } from 'next/image'

import { getImageUrl, toBase64 } from '@utils'

const shimmer = (
  w: number,
  h: number,
) => `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#ccc" offset="20%" />
            <stop stop-color="#eee" offset="50%" />
            <stop stop-color="#ccc" offset="70%" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#E2E8F0" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
      </svg>`

export const ChakraNextImage = ({
  image,
  format,
  nextImageProps,
  alt,
  ratio,
  ...rest
}: {
  image: UploadFile | string
  format?: FileFormatsType
  nextImageProps?: ImageProps
  ratio?: 'twitter' | 'square'
  alt?: string
} & Omit<BoxProps, 'as'>): JSX.Element => {
  const src = getImageUrl(image, format)
  const alternativeText =
    typeof image === 'string'
      ? alt || 'alternative text'
      : image?.alternativeText

  const ImageWrapper = (props: BoxProps) =>
    ratio ? (
      <AspectRatio
        ratio={ratio === 'twitter' ? 1200 / 675 : 1}
        {...props}
        {...rest}
      />
    ) : (
      <Box pos="relative" {...props} {...rest} />
    )

  return (
    <ImageWrapper>
      <Image
        objectFit="cover"
        layout="fill"
        src={src}
        alt={alternativeText}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`}
        {...nextImageProps}
      />
    </ImageWrapper>
  )
}
