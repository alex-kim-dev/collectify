import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLayoutEffect } from 'react';
import { useRouteError } from 'react-router-dom';

import { Link } from '~/components';

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as any;
  const message =
    error?.status && error?.statusText
      ? `${error.status} ${error.statusText}`
      : null;

  useLayoutEffect(() => {
    document.title = 'Collectify | Error';
  });

  return (
    <Box
      alignItems='center'
      component='main'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      marginInline='auto'
      maxWidth={400}
      minHeight='100dvh'
      padding={2}
      textAlign='center'>
      <Typography component='h1' variant='h4'>
        Error
      </Typography>
      <Typography variant='body1'>
        Sorry, an unexpected error has occurred.
        <br />
        {message}
        <br />
        <Link to='/'>Go to the main page</Link>
      </Typography>
    </Box>
  );
};
