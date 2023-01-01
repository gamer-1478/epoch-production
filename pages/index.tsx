import { Flex, Box, Button, Heading } from '@chakra-ui/react';
import { Outfit, Montserrat } from '@next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { font } from '../lib/font';

const montserrat = Montserrat({ weight: '700', subsets: ['latin'] });
const outfit = Outfit({ weight: '800', subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  return (
    <Box minH="100vh" w="full">
      <Flex
        align="center"
        w="full"
        bgImg="url('/bg.png')"
        justify="center"
        bgSize="cover"
        bgPos="bottom"
        h="100vh"
      >
        <Box pos="absolute" top="30px" left="50px">
          <Link href="/">
            <Box as="img" src="/logo.png" height="50px" />
          </Link>
        </Box>
        <Flex flexDir="column" gap="2.4rem" alignItems="center">
          <Box
            textAlign="center"
            fontWeight="800"
            className={outfit.className}
            background="linear-gradient(90.09deg, rgba(255, 255, 255, 0.82) -3.09%, #A4E4FF 99.92%);"
            backgroundClip="text"
            fontSize="95px"
            lineHeight="1.05"
            css={{
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
          >
            <h1>Annoyance</h1>
            <h1>As A</h1>
            <h1>Service</h1>
          </Box>
          <Box maxW="600px" textAlign="center" fontSize="1.2rem" color="white">
            Revolutionizing the way you annoy your friends and foes.
          </Box>
          <Button
            className={montserrat.className}
            textTransform="uppercase"
            fontSize="15px"
            px="3rem"
            py="2rem"
            size="lg"
            rounded="3rem"
            bg="#E93A7D"
            color="white"
            letterSpacing="1.3px"
            _hover={{
              bg: '#bb1d59',
            }}
            onClick={() => router.push('/login')}
          >
            Try it for free
          </Button>
        </Flex>
      </Flex>
      <Box w="full" h="0.7rem" bg="#FF6D2C"></Box>
      <Flex
        align="center"
        justify="center"
        p="2.5rem 0"
        bg="white"
        color="black"
      >
        <Box
          as="p"
          maxW="600px"
          fontSize="2.8rem"
          textAlign="center"
          fontWeight="800"
          lineHeight="1.1"
        >
          Making the world a better place with{' '}
          <Box
            as="span"
            fontSize="3.2rem"
            className={font.className}
            color="#009387"
          >
            spammm
          </Box>
          .
        </Box>
      </Flex>
      <Box bg="#272727" minH="30vh" w="full" p="6rem 4rem 2rem 4rem">
        <Flex gap="2.5rem" mb="6rem">
          <Flex flex={5} flexDir="column" gap="2.2rem">
            <Heading color="white" fontSize="3.3rem" fontWeight="700">
              Easy enough to learn on your own, but you don&apos;t have to
            </Heading>
            <Box as="p" color="#907D7D" fontSize="xl">
              Project discussions, important documents, free food announcements:
              they all live tidily together in Team. With your team and
              information in one easily searchable place, collaborating online
              is as easy as collaborating in person.
            </Box>
            <Button size="lg" w="max-content" px="4rem">
              Learn more
            </Button>
          </Flex>
          <Box flex={5} p="1rem">
            <Box as="img" src="/illustration.png" />
          </Box>
        </Flex>
        <Flex alignItems="center" flexDir="column">
          <Box textAlign="center" mb="3rem">
            <Heading color="white" mb="4" fontSize="3.3rem" fontWeight="700">
              Simple Membership
            </Heading>
            <Box as="p" color="#907D7D" fontSize="xl">
              Use the Startup Framework for free with no limits.
            </Box>
          </Box>
          <Flex p="0 2rem" gap="1rem">
            <Box>
              <Box as="img" src="first.png" mb="10px" w="full" rounded="md" />
              <Flex
                border="1px solid white"
                flexDir="column"
                gap="1.5rem"
                p="2.5rem"
                rounded="md"
              >
                <Flex
                  justifyContent="space-between"
                  color="white"
                  fontWeight="700"
                  fontSize="2xl"
                >
                  <Box as="span">Starter</Box>
                  <Box as="span">Rs. 15</Box>
                </Flex>
                <Box as="p" fontSize="xl">
                  Unlimited recipes, plans, programs and more. All you need to
                  make eating healthy ridiculously.
                </Box>
                <Button
                  className={montserrat.className}
                  textTransform="uppercase"
                  fontSize="15px"
                  px="2rem"
                  py="1.8rem"
                  size="lg"
                  rounded="3rem"
                  bg="#E93A7D"
                  color="white"
                  letterSpacing="1.3px"
                  _hover={{
                    bg: '#bb1d59',
                  }}
                >
                  Get started for Free
                </Button>
              </Flex>
            </Box>
            <Box>
              <Box as="img" src="second.png" w="full" mb="10px" rounded="md" />
              <Flex
                border="1px solid white"
                flexDir="column"
                gap="1.5rem"
                p="2.5rem"
                rounded="md"
              >
                <Flex
                  justifyContent="space-between"
                  color="white"
                  fontWeight="700"
                  fontSize="2xl"
                >
                  <Box as="span">Starter</Box>
                  <Box as="span">Rs. 15</Box>
                </Flex>
                <Box as="p" fontSize="xl">
                  Unlimited recipes, plans, programs and more. All you need to
                  make eating healthy ridiculously.
                </Box>
                <Button
                  className={montserrat.className}
                  textTransform="uppercase"
                  fontSize="15px"
                  px="2rem"
                  py="1.8rem"
                  size="lg"
                  rounded="3rem"
                  bg="#E93A7D"
                  color="white"
                  letterSpacing="1.3px"
                  _hover={{
                    bg: '#bb1d59',
                  }}
                >
                  Get started for Free
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex justifyContent="center" m="2rem 0 0 0">
          <Box
            as="p"
            fontSize="1.8rem"
            textAlign="center"
            fontWeight="700"
            lineHeight="1.1"
          >
            Powered by{' '}
            <Box
              as="span"
              fontSize="2.6rem"
              color="#009387"
              className={font.className}
              marginRight="20px"
            >
              hackclub
            </Box>
          </Box>
          <Box as="img" src="/hackclub.png" />
        </Flex>
      </Box>
    </Box>
  );
}
