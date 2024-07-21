import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';
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
          <Flex gap={3} align='center' grow={1}>
            <Collection size={32} />
            <Text fontWeight={500} fontSize='2xl'>
              Collectify
            </Text>
          </Flex>
          <Button variant='outline'>Sign In</Button>
          <Button>Sign Up</Button>
        </Container>
      </Box>
      <Box as='main' p={6}>
        {children}
      </Box>
    </>
  );
};
