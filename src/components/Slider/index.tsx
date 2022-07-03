import { useState } from 'react'

import {
  Box,
  chakra,
  ChakraProps,
  CSSObject,
  Heading,
  ResponsiveValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import { Card, CardSkeleton, SliderHero, SliderHeroSkeleton } from '@components'
import { RouteKeys } from '@config'

export const SwiperBox = chakra(Swiper)

interface SliderProps {
  heading: string
  children: JSX.Element[]
  slides: ResponsiveValue<number>
  spaces: ResponsiveValue<number>
  items: Hashtag[]
  posts: Post[]
  activeStyles: ChakraProps
  customStyles: ChakraProps
  swiperStyles: CSSObject
  paginationStyles: CSSObject
  isLoading: boolean
  isSimple: boolean
  hasSocialCard: boolean
  hasLink: boolean
  hasPagination: boolean
  hasThumb: boolean
  centeredSlides: boolean
  loop: boolean
  type: RouteKeys
}

export const Slider = (
  props: Partial<SliderProps & SwiperProps>,
): JSX.Element => {
  const {
    slides = [1, null, 2, 3, 4],
    spaces = 30,
    items,
    posts,
    activeStyles = {},
    customStyles = {},
    heading,
    children,
    swiperStyles = {},
    paginationStyles = {},
    isLoading = false,
    isSimple = false,
    hasSocialCard = false,
    hasLink = false,
    hasPagination = false,
    hasThumb = false,
    centeredSlides = true,
    loop,
    type,
  } = props

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)

  const responsiveSlidesPerView = useBreakpointValue(slides as number[]) || 1
  const responsiveSpaceBetween = useBreakpointValue(spaces as number[]) || 30

  const activeStyle: ChakraProps = {
    transform: 'scale(1.05)',
    _hover: {
      transform: 'scale(1.05) translateY(-5px)',
    },
    ...activeStyles,
  }

  return (
    <Box
      sx={{
        '.swiper': {
          '&-pagination': {
            top: 0,
            textAlign: 'right',
            bottom: 'unset',
            ...paginationStyles,
          },
          ...swiperStyles,
        },
      }}
    >
      {heading && (
        <Heading size="xl" my={6}>
          {heading}
        </Heading>
      )}
      {hasThumb && !posts && (
        <SwiperBox modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}>
          {isLoading ? (
            <SwiperSlide>
              <SliderHeroSkeleton />
            </SwiperSlide>
          ) : (
            items?.map((item, i) => (
              <SwiperSlide key={i}>
                <SliderHero item={item} type={type as RouteKeys} />
              </SwiperSlide>
            ))
          )}
        </SwiperBox>
      )}
      <SwiperBox
        className="samen-slider"
        py={6}
        modules={[Navigation, Pagination]}
        slidesPerView={responsiveSlidesPerView}
        spaceBetween={responsiveSpaceBetween}
        centeredSlides={centeredSlides}
        navigation
        pagination={hasPagination && { type: 'bullets' }}
        initialSlide={1}
        slideToClickedSlide={Boolean(posts) || !hasLink}
        onSwiper={setThumbsSwiper}
        loop={loop}
        {...(hasThumb && {
          modules: [Navigation, Pagination, Thumbs],
          watchSlidesProgress: true,
          watchOverflow: true,
          sx: {
            '.swiper-slide-thumb-active': activeStyle,
            '.swiper-wrapper': { h: 'inherit' },
          },
        })}
        sx={{ '.swiper-wrapper': { h: 'inherit' } }}
      >
        {/* Render custom children if it's provided instead of default Card list */}
        {isLoading
          ? new Array(5).fill(0).map((_, i) => (
              <SwiperSlide key={i}>
                <CardSkeleton />
              </SwiperSlide>
            ))
          : children?.map((child, i) => (
              <SwiperSlide
                key={i}
                style={{ height: 'inherit', alignSelf: 'stretch' }}
              >
                {({ isActive }) => (
                  <Box {...(isActive && activeStyle)}>{child}</Box>
                )}
              </SwiperSlide>
            )) ||
            (items || posts)?.map((item, i) => (
              <SwiperSlide
                style={{ height: 'inherit', alignSelf: 'stretch' }}
                key={i}
              >
                {({ isActive }) => (
                  <Card
                    item={item}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: isSimple ? 'none' : 'lg',
                    }}
                    {...customStyles}
                    {...(isActive && !hasThumb && activeStyle)}
                    isSimple={isSimple}
                    isSocial={!hasThumb && hasSocialCard}
                    hasLink={!hasThumb && hasLink}
                    hasDescription={!hasThumb}
                    type={type as RouteKeys}
                  />
                )}
              </SwiperSlide>
            )) ||
            // TODO: create better ui for empty data
            'No data found'}
      </SwiperBox>
    </Box>
  )
}
