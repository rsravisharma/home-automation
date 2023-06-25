import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InputIcon from '@mui/icons-material/Input';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import Logo from '../Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Typography sx={{display: 'flex', ml: 1}}>
          <Typography sx={{fontWeight: 'bold'}} variant='h2'>IoTwebsite</Typography>
          <Typography sx={{ml: 0.5, fontStyle: 'italic', fontFamily: 'Georgia'}}>by Xpeed Tech</Typography>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton href="#" color="inherit">
            <LinkIcon />
          </IconButton>
          <IconButton href="https://github.com/rsravisharma/home-automation" color="inherit">
            <GitHubIcon />
          </IconButton>
          <IconButton href="/login" color="inherit" onClick={()=>{window.sessionStorage.removeItem("user_name");}}>
            <Typography sx={{mr: 1}}>Logout</Typography>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
