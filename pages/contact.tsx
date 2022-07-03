import {
  Box,
  Button,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp as FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

import { ContactForm, Container, Layout, SocialButtons } from '@components'

interface ContactProps {
  seo: NextSeoProps
}

const Contact = ({ seo }: ContactProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo}>
      <Box
        minH="inherit"
        background="url(/images/bg-wave.svg) no-repeat bottom"
      >
        <Container minH="inherit" maxW="container.xl">
          <Stack
            justify="center"
            align="center"
            spacing={8}
            direction={{ base: 'column', lg: 'row' }}
            minH="inherit"
          >
            <VStack
              bg="gray.700"
              borderRadius="lg"
              p={{ base: 8, lg: 16 }}
              w={{ base: 'full', lg: '500px' }}
              textAlign="center"
              justify="center"
              spacing={{ base: 8, lg: 16 }}
            >
              <Box>
                <Heading>{t('contact.title')}</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="primary.50">
                  {t('contact.fill-form')}
                </Text>
              </Box>
              <VStack alignItems="flex-start" color="primary.50">
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdPhone} color="primary.400" size="20px" />
                  }
                  href="tel:+31685221308"
                >
                  +31-6 85221308
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={FaWhatsapp} color="primary.400" size="20px" />
                  }
                  href="https://api.whatsapp.com/send?phone=31685221308"
                >
                  {t('contact.form.contactOnWhatsApp')}
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdEmail} color="primary.400" size="20px" />
                  }
                  href="mailto:info@samenvvv.nl"
                >
                  info@samenvvv.nl
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdLocationOn} color="primary.400" size="20px" />
                  }
                  href="https://goo.gl/maps/E9HaayQnXmphUWtN8"
                >
                  Tandersplein 1, 3027 CN <br /> Rotterdam, Netherland
                </Button>
              </VStack>

              <SocialButtons />
            </VStack>
            <Box
              w={{ base: 'full', lg: '500px' }}
              bg="white"
              borderRadius="lg"
              p={{ base: 8, lg: 16 }}
              shadow="primary"
            >
              <ContactForm />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}
export default Contact
export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context

  const title: Record<string, string> = {
    en: 'Contact',
    tr: 'İletişim',
    nl: 'Contact',
  }

  const description: Record<string, string> = {
    en: '',
    tr: '',
    nl: '',
  }

  const seo: NextSeoProps = {
    title: title[locale as StrapiLocale],
    description: description[locale as StrapiLocale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
  }
}
