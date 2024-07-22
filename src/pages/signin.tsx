import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type MouseEventHandler, useState } from 'react';
import {
  EnvelopeFill,
  EyeFill,
  EyeSlashFill,
  LockFill,
} from 'react-bootstrap-icons';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';

import { schema } from '~/lib/validate';

type SignInInputs = z.infer<typeof schema.signIn>;

const SignIn: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignInInputs>({ resolver: zodResolver(schema.signIn) });

  const [isPwShown, setPwShown] = useState(false);

  const handlePwShow: MouseEventHandler<HTMLButtonElement> = () => {
    setPwShown((isShown) => !isShown);
  };

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    console.log('Signing in with:', data);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  return (
    <Container as='form' maxW='sm' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <Heading as='h1'>Sign In</Heading>

        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel requiredIndicator={null}>Email</FormLabel>
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

        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel requiredIndicator={null}>Password</FormLabel>
          <InputGroup>
            <InputLeftElement boxSize={12} pointerEvents='none'>
              <LockFill size={20} />
            </InputLeftElement>
            <Input
              variant='filled'
              size='lg'
              type={isPwShown ? 'text' : 'password'}
              {...register('password')}
            />
            <InputRightElement boxSize={12}>
              <IconButton
                variant='ghost'
                onClick={handlePwShow}
                aria-label='Show/hide passwords'
              >
                {isPwShown ? <EyeSlashFill size={20} /> : <EyeFill size={20} />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          isLoading={isSubmitting}
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
