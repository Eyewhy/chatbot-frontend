import { useState } from "react";

import { AppBar, Toolbar, Button, Link, Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from "@mui/icons-material/Menu";

import { useAuth } from "../services/authProvider";
import { useShortlist } from "../services/shortlistProvider";
import { websiteVersion } from "../App";

import logo from "./image.png";


/**
 * 
 * @param {str} active one of "chats", "helper", "referral", "qna"
 * @param {str} user username
 * @returns 
 */
function Navbar () {
  const sites = [
    {
      name: 'Search',
      href: '#/search'
    },{
      name: 'Agencies',
      href: '#/organization'
    },{
      name: 'Blog',
      href: 'https://blog.helper4.me/wp/'
    },{
      name: 'FAQ',
      href: 'https://blog.helper4.me/wp/faq'
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
  const chatbotSites = [
    {
      name: 'Chats',
      href: '#/admin/chats',
    },{
      name: 'Q&A Documents',
      href: '#/admin/qna',
    },{
      name: 'Organization',
      href: '#/admin/organization',
    }
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);

  const auth = useAuth();
  const shortlist = useShortlist();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between', 
          paddingLeft: {xs: '2%', xl: '15%'},
          paddingRight: {xs: '2%', xl: '15%'},
          width:{xs: '96%', xl: '70%'},
        }}>
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
                { websiteVersion === 'chatbot' ?
                  chatbotSites.map((site) => {
                    return <MenuItem key={site['name']} onClick={handleCloseNavMenu}>
                      <Button href={site['href']}>{site['name']}</Button>
                    </MenuItem>
                  })
                : auth.organization === 0 ?
                  sites.map((site) => {
                    return <MenuItem key={site['name']} onClick={handleCloseNavMenu}>
                      <Button href={site['href']}>{site['name']}</Button>
                    </MenuItem>
                  })
                :
                  adminSites.map((site) => {
                    return <MenuItem key={site['name']} onClick={handleCloseNavMenu}>
                      <Button href={site['href']}>{site['name']}</Button>
                    </MenuItem>
                  })
                }
              </Menu>
            </Box>
            <Link
              variant="h6"
              href={ auth.organization ? "#/admin":"#/search"}
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                alignContent: 'center',
                lineHeight:0
              }}>
              { websiteVersion === 'chatbot' ? "Chatbot Management":
                <Box component="img" src={logo} sx={{height:'60px'}}/>
              }
            </Link>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
              { websiteVersion === 'chatbot' ?
                chatbotSites.map((site) => {
                  return <Button key={site['name']} href={site['href']} sx={{px:1, color:'inherit'}}>{site['name']}</Button>
                })
              : auth.organization === 0 ?
                sites.map((site) => {
                  return <Button key={site['name']} href={site['href']} sx={{px:1, color:'inherit'}}>{site['name']}</Button>
                })
              :
                adminSites.map((site) => {
                  return <Button key={site['name']} href={site['href']} sx={{px:1, color:'inherit'}}>{site['name']}</Button>
                })
              }   
            </Box>
          </Box>
          <Box sx={{display:'flex', alignItems:'center'}}>
            { websiteVersion === 'chatbot' ? "" :
                <Button 
                  sx={{color:'inherit'}} 
                  size="large"
                  href="#/shortlist"
                  startIcon={<ShoppingBagIcon />}
                >
                  {shortlist.shortlist.length} Shortlisted
                </Button>
            }
            <Box alignContent='center'>
              <IconButton sx={{color:'inherit'}} size="large" href="#/account">
                <AccountCircle />
              </IconButton>  
            </Box>
          </Box>  
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;