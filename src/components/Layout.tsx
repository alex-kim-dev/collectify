import { Box, Button, chakra, Container, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import type { ReactElement } from 'react';
import { Collection, Github } from 'react-bootstrap-icons';

import { AccountMenu } from '~/components/AccountMenu';

interface LayoutProps {
  children: ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const user = session.data?.user;

  const handleSignIn = async () => {
    try {
      const res = await signIn('github', { redirect: false });
      if (res?.error) console.log('SignInRes.error:', res.error);
    } catch (error) {
      console.log('sing in catch:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.log('sign out catch', error);
    }
  };

  return (
    <>
      <Box as='header' bg='teal.800'>
        <Container
          maxW='container.lg'
          p={4}
          display='flex'
          alignItems='center'
          gap={4}
        >
          <Flex as={Link} href='/' gap={3} align='center'>
            <Collection size={32} />
            <Text fontWeight={500} fontSize='2xl'>
              Collectify
            </Text>
          </Flex>

          <chakra.div flexGrow={1} />

          {isAuthenticated ? (
            <AccountMenu user={user} onSignOut={handleSignOut} />
          ) : (
            <Button leftIcon={<Github size={20} />} onClick={handleSignIn}>
              {t('appbar.signin')}
            </Button>
          )}
        </Container>
      </Box>
      <Box as='main' py={{ base: 6, md: 10 }}>
        {children}
      </Box>
    </>
  );
};
