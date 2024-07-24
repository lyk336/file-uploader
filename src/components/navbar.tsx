import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';

interface INavbarProps {}

const Navbar: FC<INavbarProps> = () => {
  return (
    <AppBar position='fixed'>
      <Container maxWidth='xl'>
        <Toolbar>
          <MuiLink component={Link} href='/' color={'#fff'} fontWeight={500} underline='hover'>
            Upload files
          </MuiLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
