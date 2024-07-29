import { Heading } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = (async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}) satisfies GetStaticProps;

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
