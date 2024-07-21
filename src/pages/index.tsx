import { Heading } from '@chakra-ui/react';
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
        <link rel='icon' href='/collection.svg' />
      </Head>
      <Heading as='h1' textAlign='center'>
        Home page
      </Heading>
    </>
  );
}
