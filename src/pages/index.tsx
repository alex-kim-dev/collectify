import { Box, Heading } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Collectify</title>
        <meta
          name='description'
          content='A personal collections management web app'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box as='main' p={6}>
        <Heading as='h1' textAlign='center'>
          Collectify home page
        </Heading>
      </Box>
    </>
  );
}
