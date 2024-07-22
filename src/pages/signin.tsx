import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';

const SignIn: React.FC = () => {
  return (
    <Container as='form' maxW='sm'>
      <Stack spacing={5}>
        <Heading as='h1'>Sign In</Heading>

        <FormControl isRequired isInvalid={true}>
          <FormLabel requiredIndicator={null}>Email</FormLabel>
          <InputGroup>
            <InputLeftElement boxSize={12} pointerEvents='none'>
              <EmailIcon boxSize={5} color='gray.300' />
            </InputLeftElement>
            <Input
              variant='filled'
              size='lg'
              type='email'
              placeholder='email@example.com'
            />
          </InputGroup>
          <FormErrorMessage>Email is required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={true}>
          <FormLabel requiredIndicator={null}>Password</FormLabel>
          <InputGroup>
            <InputLeftElement boxSize={12} pointerEvents='none'>
              <LockIcon boxSize={5} color='gray.300' />
            </InputLeftElement>
            <Input variant='filled' size='lg' type='password' />
          </InputGroup>
          <FormErrorMessage>Password is required</FormErrorMessage>
        </FormControl>

        <Button
          isLoading={true}
          loadingText='Signing in ...'
          colorScheme='teal'
          type='submit'
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default SignIn;
