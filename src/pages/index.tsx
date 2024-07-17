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
      <main>
        <h1>Collectify home page</h1>
      </main>
    </>
  );
}
