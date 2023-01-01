import { Avatar, Box, Button, Flex, Heading } from '@chakra-ui/react';
import { font } from '../lib/font';
import {
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaSms,
} from 'react-icons/fa';
import prisma from '../lib/db';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { type SpammedUser } from '@prisma/client';
import { authOptions } from './api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Dashboard(props: { spammed: SpammedUser[] }) {
  const session = useSession();
  const router = useRouter();

  if (session.status !== 'authenticated' || session.data.user == null)
    return null;

  return (
    <Box
      minH="100vh"
      w="full"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <Box>
        <Flex p="20px 50px" mb="2" justifyContent="space-between">
          <Link href="/">
            <Box as="img" src="/logo.png" height="50px" />
          </Link>
          <Flex
            bg="linear-gradient(to right, #394359, #232731)"
            py="3"
            px="5"
            rounded="md"
            gap="3"
          >
            <Avatar
              name={session.data.user.name!}
              src={session.data.user.image!}
            />
            <Box as="p" display="flex" alignItems="center">
              {session.data.user.name}
            </Box>
          </Flex>
        </Flex>
        <Flex m="0 2.5rem 3rem 2.5rem" justifyContent="space-between">
          <Box bg="#2E323C" h="min-content" p="8" rounded="xl">
            <Heading mb="4" fontSize="4xl">
              Special premium account
            </Heading>
            <Box as="p" fontSize="xl">
              With a special premium account, you can do very interesting
              things! By purchasing this account, special features will be
              activated for you that you will be amazed to see!
            </Box>
          </Box>
          <Box as="img" src="/dashboard.png" height="300px" />
        </Flex>
        <Box
          display="grid"
          m="0 2.5rem"
          gridTemplateColumns="repeat(4, 1fr)"
          gap="6"
        >
          <Flex
            rounded="2xl"
            bg="linear-gradient(to bottom right, #0D8A7C, #292F3C)"
            height="12rem"
            align="center"
            justifyContent="center"
          >
            <Button
              bg="#0D8A7C"
              _hover={{ bg: '#0D8A7C', shadow: 'lg' }}
              p="6"
              fontSize="2xl"
              onClick={() => router.push('/create')}
            >
              Add +
            </Button>
          </Flex>
          {props.spammed.map(spammed => (
            <Flex
              rounded="2xl"
              bg="linear-gradient(to bottom right, #2E374B, #292F3C)"
              height="12rem"
              align="center"
              p="8"
            >
              <Flex w="full" flexDir="column" alignItems="center">
                <Avatar mb="2" size="lg" name={spammed.name} />
                <Box mb="4" as="p" fontSize="xl" fontWeight="500">
                  {spammed.name}
                </Box>
                <Flex justifyContent="space-around" w="full" color="#8794BA">
                  {spammed.twitter && <FaTwitter size="25px" />}
                  {spammed.instagram && <FaInstagram size="25px" />}
                  {spammed.phone && <FaPhone size="25px" />}
                  {spammed.phone && <FaSms size="25px" />}
                  {spammed.email && <FaEnvelope size="25px" />}
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Box>
      </Box>
      <Flex gap="2" p="6" justifyContent="flex-end">
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
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const spammed = await prisma.spammedUser.findMany({
    where: {
      spammedBy: {
        email: session.user.email!,
      },
    },
  });

  return {
    props: {
      spammed,
      session,
    },
  };
};
