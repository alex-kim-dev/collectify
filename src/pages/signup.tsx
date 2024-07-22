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
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeFill, LockFill, PersonFill } from 'react-bootstrap-icons';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';

import { schema } from '~/lib/validate';

type SignUpInputs = z.infer<typeof schema.signUp>;

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignUpInputs>({ resolver: zodResolver(schema.signUp) });

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    console.log('Signing up with:', data);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  return (
    <Container as='form' maxW='sm' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <Heading as='h1'>Sign Up</Heading>

        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement boxSize={12} pointerEvents='none'>
              <EnvelopeFill size={20} />
            </InputLeftElement>
            <Input
              variant='filled'
              size='lg'
              type='email'
              placeholder='email@example.com'
              {...register('email')}
            />
          </InputGroup>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <InputGroup>
            <InputLeftElement boxSize={12} pointerEvents='none'>
              <PersonFill size={20} />
            </InputLeftElement>
            <Input
              variant='filled'
              size='lg'
              type='text'
              placeholder='Alex'
              {...register('name')}
            />
          </InputGroup>
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement boxSize={12} pointerEvents='none'>
              <LockFill size={20} />
            </InputLeftElement>
            <Input
              variant='filled'
              size='lg'
              type='password'
              {...register('password')}
            />
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.passwordConfirm}>
          <FormLabel>Confirm password</FormLabel>
          <InputGroup>
            <InputLeftElement boxSize={12} pointerEvents='none'>
              <LockFill size={20} />
            </InputLeftElement>
            <Input
              variant='filled'
              size='lg'
              type='password'
              {...register('passwordConfirm')}
            />
          </InputGroup>
          <FormErrorMessage>{errors.passwordConfirm?.message}</FormErrorMessage>
        </FormControl>

        <Button
          isLoading={isSubmitting}
          loadingText='Signing up ...'
          colorScheme='teal'
          type='submit'
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default SignUp;
