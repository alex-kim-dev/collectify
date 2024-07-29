import { extendTheme, type Theme, type ThemeConfig } from '@chakra-ui/react';
import { Rubik } from 'next/font/google';

export const rubik = Rubik({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-rubik',
});

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  } as ThemeConfig,
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
}) as Theme;
