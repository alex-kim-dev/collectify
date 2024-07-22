import { Link } from '@chakra-ui/next-js';
import { Box, Button, chakra, Container, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import { Collection } from 'react-bootstrap-icons';

interface LayoutProps {
  children: ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter();

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
          {pathname !== '/signin' && (
            <Button as={Link} href='/signin' variant='outline'>
              Sign In
            </Button>
          )}
          {pathname !== '/signup' && (
            <Button as={Link} href='/signup'>
              Sign Up
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
