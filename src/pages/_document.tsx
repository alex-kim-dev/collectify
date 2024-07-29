import { ColorModeScript } from '@chakra-ui/react';
import type { DocumentProps } from 'next/document';
import { Head, Html, Main, NextScript } from 'next/document';

import { i18n } from '~/../next-i18next.config.cjs';
import { theme } from '~/theme';

export default function Document(props: DocumentProps) {
  const locale = props.__NEXT_DATA__.locale ?? i18n.defaultLocale;

  return (
    <Html lang={locale}>
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
