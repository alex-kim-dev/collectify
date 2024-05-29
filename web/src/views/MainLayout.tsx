import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

import { Link } from '~/components';

export const MainLayout: React.FC = () => {
  return (
    <Box minHeight='100dvh'>
      <AppBar position='static'>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Typography component='div' sx={{ flexGrow: 1 }} variant='h6'>
              Collectify
            </Typography>
            <Link color='inherit' to='/login'>
              Login
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component='main' maxWidth='lg' sx={{ paddingBlock: 2 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
