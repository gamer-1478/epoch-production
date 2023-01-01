import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { font } from '../lib/font';

export default function Login() {
  const router = useRouter();

  return (
    <Flex flexDir="column" h="100vh" w="full">
      <Flex p="20px 50px" align="center" h="10vh">
        <Link href="/">
          <Box as="img" src="/logo.png" height="50px" />
        </Link>
      </Flex>
      <Flex flex={1} gap="0 2rem">
        <Box
          as="img"
          src="/illus.png"
          objectFit="contain"
          objectPosition="center"
          w="45vw"
        ></Box>
        <Flex
          px="4rem"
          flexDir="column"
          // justifyContent="space-between"
        >
          <Flex m="auto 0" flexDir="column" justify="center">
            <Heading fontSize="3.5rem">Sign up to discover more!</Heading>
            {/* <Flex mt="8" flexDir="column" gap="3">
              <Input size="lg" rounded="lg" placeholder="Your name" />
              <Input size="lg" rounded="lg" placeholder="Your email" />
            </Flex> */}
            <Button
              mt="6"
              size="lg"
              p="1.8rem 3rem"
              bg="#E93A7D"
              _hover={{ bg: '#E93A7D' }}
              rounded="4rem"
              w="min-content"
              onClick={async () => {
                await signIn('google', {
                  redirect: false,
                  callbackUrl: '/dashboard',
                });
              }}
            >
              Sign up
            </Button>
          </Flex>
          <Flex gap="2" p="4" alignSelf="flex-end">
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
              >
                hackclub
              </Box>
            </Box>
            <Box as="img" src="/hackclub.png" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
