import { useState } from "react";

import { useAuth } from "../services/authProvider";

import { AppBar, Toolbar, Button, Link, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from "@mui/icons-material/Menu";

/**
 * 
 * @param {str} active one of "chats", "helper", "referral", "qna"
 * @param {str} user username
 * @returns 
 */
function Navbar () {
  const auth = useAuth();
  const sites = [
    {
      name: 'Search',
      href: '#/search'
    },{
      name: 'Agencies',
      href: '#/organization'
    }
  ]
  const adminSites = [
    {
      name: 'Chats',
      href: '#/admin/chats',
    },{
      name: 'Helper Info',
      href: '#/admin/helper',
    },{
      name: 'Referrals',
      href: '#/admin/referral',
    },{
      name: 'Q&A Documents',
      href: '#/admin/qna',
    },{
      name: 'Organization',
      href: '#/admin/organization',
    }
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const NavBox = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between', 
    paddingLeft: '15%',
    paddingRight: '15%',
    width:'70%',
    [theme.breakpoints.down('xl')]: {
      paddingLeft:'2%',
      paddingRight:'2%',
      width:'96%'
    },

  }))

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <NavBox>
          <Box sx={{
            display:'flex',
            alignItems: 'center',
          }}>
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-label="Menu Appbar"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs:'flex', md:'none'}}}
              >
                {useAuth().isAdmin() ?
                  adminSites.map((site) => {
                    return <MenuItem key={site['name']} onClick={handleCloseNavMenu}>
                      <Button href={site['href']}>{site['name']}</Button>
                    </MenuItem>
                  })
                :
                  sites.map((site) => {
                    return <MenuItem key={site['name']} onClick={handleCloseNavMenu}>
                      <Button href={site['href']}>{site['name']}</Button>
                    </MenuItem>
                  })}
              </Menu>
            </Box>
            <Link
              variant="h6"
              href={useAuth().isAdmin() ? "#/admin":"#/search"}
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}>
              Helper Chatbot</Link>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
              {useAuth().isAdmin() ?
              adminSites.map((site) => {
                return <Button key={site['name']} href={site['href']} sx={{px:1, color:'inherit'}}>{site['name']}</Button>
              })
              :
              sites.map((site) => {
                return <Button key={site['name']} href={site['href']} sx={{px:1, color:'inherit'}}>{site['name']}</Button>
              })}   
            </Box>
          </Box>
          <Box>
            <IconButton sx={{color:'inherit'}} size="large" href="#/shortlist">
              <ShoppingBagIcon />
            </IconButton>
            <IconButton sx={{color:'inherit'}} size="large" href="#/account">
              <AccountCircle />
            </IconButton>
          </Box>  
        </NavBox>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;