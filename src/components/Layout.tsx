import { Link } from '@chakra-ui/next-js';
import { Box, Button, chakra, Container, Flex, Text } from '@chakra-ui/react';
import { type ReactElement } from 'react';
import { Collection } from 'react-bootstrap-icons';

interface LayoutProps {
  children: ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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

          <Button>Sign Up</Button>
        </Container>
      </Box>
      <Box as='main' py={{ base: 6, md: 10 }}>
        {children}
      </Box>
    </>
  );
};
