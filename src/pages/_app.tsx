import { ChakraProvider } from '@chakra-ui/react';
import type { AppType } from 'next/dist/shared/lib/utils';

import { Layout } from '~/components/Layout';
import { rubik, theme } from '~/theme';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-rubik: ${rubik.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
