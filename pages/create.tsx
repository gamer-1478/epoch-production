import { Box, Button, Flex, Heading, Input, Textarea } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { font } from '../lib/font';

export default function Login() {
  const router = useRouter();

  return (
    <Flex flexDir="column" h="100vh" w="full">
      <Flex p="20px 50px" align="center">
        <Link href="/">
          <Box as="img" src="/logo.png" height="50px" />
        </Link>
      </Flex>
      <Flex flex={1} px="1rem" gap="0 0.5rem">
        <Box
          as="img"
          src="/spam.png"
          objectFit="contain"
          objectPosition="center"
          w="45vw"
        ></Box>
        <Flex
          px="1.5rem"
          flexDir="column"
          // justifyContent="space-between"
        >
          <Flex
            as="form"
            m="auto 0"
            flexDir="column"
            justify="center"
            onSubmit={async e => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget as any);

              await fetch('/api/spam', {});
            }}
          >
            <Heading fontSize="3.5rem">Annoy your friends and foe!</Heading>
            <Flex mt="8" flexDir="column" gap="2">
              <Input name="name" size="lg" rounded="lg" placeholder="Name" />
              <Textarea
                size="lg"
                name="description"
                rounded="lg"
                placeholder="A description about them and what they like"
              />
              <Flex gap="2">
                <Input
                  name="twitter"
                  size="lg"
                  rounded="lg"
                  placeholder="Twitter Handle"
                />
                <Input
                  name="instagram"
                  size="lg"
                  rounded="lg"
                  placeholder="Instagram Handle"
                />
              </Flex>
              <Flex gap="2">
                <Input
                  size="lg"
                  name="email"
                  rounded="lg"
                  type="email"
                  placeholder="Email ID"
                />
                <Input
                  size="lg"
                  name="phone"
                  type="tel"
                  rounded="lg"
                  placeholder="Phone No."
                />
              </Flex>
            </Flex>
            <Button
              type="submit"
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
              Spam them
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
