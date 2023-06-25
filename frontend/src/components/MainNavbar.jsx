import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import {
  Box,
  Typography,
  IconButton
} from '@mui/material';
import Logo from './Logo';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
          <Logo />
      </RouterLink>
      <Typography sx={{display: 'flex', ml: 1}}>
        <Typography sx={{fontWeight: 'bold'}} variant='h2'>IoTwebsite</Typography>
        <Typography sx={{ml: 0.5, fontStyle: 'italic', fontFamily: 'Georgia'}}>by xpeed Tech</Typography>
      </Typography>

      <Box sx={{ flexGrow: 1 }} />
      
      <IconButton href="#" color="inherit">
        <LinkIcon />
      </IconButton>
      <IconButton href="https://github.com/rsravisharma/home-automation" color="inherit">
        <GitHubIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
