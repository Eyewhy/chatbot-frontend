import { useAuth } from "../services/authProvider";

import { AppBar, Toolbar, Typography, Button, Link, Box } from "@mui/material";

/**
 * 
 * @param {str} active one of "chats", "helper", "referral", "qna"
 * @param {str} user username
 * @returns 
 */
function Navbar ({ active }) {
  const auth = useAuth();
  const sites = [
    {
      name: 'Chats',
      href: '#/chats',
    },
    {
      name: 'Helper Info',
      href: '#/helper',
    },
    {
      name: 'Referrals',
      href: '#/referral',
    },
    {
      name: 'Q&A Documents',
      href: '#/qna',
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{
        display:'flex',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          display:'flex',
          alignItems: 'center'
        }}>
          <Link
            variant="h6"
            href="#/account"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >Helper Chatbot</Link>
          {sites.map((site) => {
            return <Button href={site['href']} sx={{px:1, color:'inherit'}}>{site['name']}</Button>
          })}  
        </Box>
        <Box>
        {(auth.user === null) ? 
          <Typography variant="button"> Please Login </Typography>
        :
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <Button variant="contained" href="#/account" sx={{px:1}}> Welcome, {auth.user} </Button>
          </Box>
        }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;