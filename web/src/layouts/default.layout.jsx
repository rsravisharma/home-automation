import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import { Outlet } from "react-router-dom"
import { Tooltip, Avatar, Menu, Divider, CircularProgress } from '@mui/material';
// import AppDrawer from '../components/drawers/app.drawer';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { Suspense, useState } from 'react';
import styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';

// import * as AuthService from "../services/auth.service";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

DefaultLayout.propTypes = {
  window: PropTypes.object
}

const drawerWidth = 300;

const useStyles = styled(() => {
  return ({
  drawerPaper: {
    width: (theme) => theme.drawerWidth,
    backgroundColor: "rgba(120, 120, 120, 0.2)"
  }
})});

function LoadingBoundary() {
  return <Box>
    <CircularProgress/>
  </Box>
}
function DefaultLayout({...props }) {

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className={classes.drawer}
          sx={{
             display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <DashboardSidebar 
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen} />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          PaperProps={{ elevation: 9 }}
        >
          <DashboardSidebar 
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen} />
        </Drawer>

      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Box>
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
              width: { sm: `100%` },
              ml: { sm: `0px` },
              backgroundColor: "white",
              zIndex: { sm: 99999 },
              display: { sm: "none" }
            }}
          >
            <Toolbar sx={{ flexGrow: 1, }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>

              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="A" src="/static/images/avatar/2.jpg" sx={{ width: 35, height: 35 }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >

                  {/* <MenuItem onClick={e => AuthService.logout()}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem> */}

                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Divider />
        </Box>
        <Box sx={{ p: 3 }}>
          <Suspense fallback={<LoadingBoundary />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  )
}
const mapStateToProps = (state) => ({ ...state })
export default connect(mapStateToProps, null)(DefaultLayout);