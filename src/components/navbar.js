import { useAuth } from "../services/authProvider";

import { AppBar, Toolbar, Typography, Button, Link, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

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
    },{
      name: 'Search',
      href: '#/search'
    },
    {
      name: 'Agencies',
      href: '#/organization'
    }
  ];


  const NavBox = styled(Box)(({theme}) => ({
    paddingLeft: '15%',
    paddingRight: '15%',
    display: 'flex',
    justifyContent: 'space-between',
    width:'100%',
    [theme.breakpoints.down('lg')]: {
      paddingLeft:'1%',
      paddingRight:'1%',
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
            <Link
              variant="h6"
              href="#/search"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}>
              Helper Chatbot</Link>
            {useAuth().isAdmin() ?
            adminSites.map((site) => {
              return <Button key={site['name']} href={site['href']} sx={{px:1, color:'inherit'}}>{site['name']}</Button>
            })
            :
            sites.map((site) => {
              return <Button key={site['name']} href={site['href']} sx={{px:1, color:'inherit'}}>{site['name']}</Button>
            })}  
          </Box>
          <Box>
          {(auth.user === null) ? 
            <Button sx={{px:1, color:'inherit'}} href="#"> Please Login </Button>
          :
            <>
              <Button sx={{px:1, color:'inherit'}}size="large" href="#/shortlist" aria-label="Shortlist" endIcon={<ShoppingBagIcon/>}>
                Shortlist
              </Button>
              <IconButton sx={{color:'inherit'}} size="large" href="#/account">
                <AccountCircle />
              </IconButton>
            </>
          }
          </Box>  
        </NavBox>
        
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;