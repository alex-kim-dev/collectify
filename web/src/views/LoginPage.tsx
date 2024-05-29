import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { TextField } from '~/components';

const loginSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z
    .string()
    .regex(
      /^[a-z\d!@#$%^&*]+$/i,
      'Password should consist of alphanumeric characters or special symbols',
    ),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    console.log('Email:', data.email);
    console.log('Password:', data.password);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 300,
          margin: 'auto',
          gap: 2,
        }}>
        <Typography align='center' component='h1' variant='h4' gutterBottom>
          Login
        </Typography>
        <TextField
          control={control}
          label='Email'
          name='email'
          type='email'
          variant='outlined'
          required
        />
        <TextField
          control={control}
          label='Password'
          name='password'
          type='password'
          variant='outlined'
          required
        />
        <LoadingButton
          color='primary'
          loading={isSubmitting}
          type='submit'
          variant='contained'>
          Submit
        </LoadingButton>
      </Box>
    </form>
  );
};
