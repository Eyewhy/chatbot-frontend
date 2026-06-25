import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Paper, Box, Typography, Button } from "@mui/material";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import { AgencyTable, AgencyAddressTable } from "../components/tables";
import HelperCard from "../components/helperCard";

import { publicOrganizationRequest } from "../api/public";
import { searchForHelper } from "../api/helperSearch";
import { HeaderGraphy, Pie } from "../components/mui";
import { useAuth } from "../services/authProvider";


function AgencyData () {
  const INCREMENT = 24;
  const [data, setData] = useState({});
  const [helpers, setHelpers] = useState([]);
  const [displayHelpers, setDisplayHelpers] = useState([]);
  const { id } = useParams();
  const { checkLoggedIn } = useAuth();
  const authed = checkLoggedIn();

  useEffect(() => {( async () => {
    let res = await publicOrganizationRequest(id);
    setData(res);
    let res2 = await searchForHelper(authed, {agency: [id]});
    res2 = res2 || [];
    setHelpers(res2);
    setDisplayHelpers(res2.slice(0, INCREMENT));
  })();}, [id, authed]);

  const addMoreHelpers = () => {
    if (displayHelpers.length >= helpers.length) return;
    setDisplayHelpers(helpers.slice(0, displayHelpers.length + INCREMENT));
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    addMoreHelpers();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayHelpers, helpers]);

  return (<>
    <Box sx={{
      flexDirection: {xs:'column', md:'row'},
      display:'flex',
      justifyContent: 'center',
      mt:2,
      gap: 2
    }}>
      <Box sx={{
        position: {md: 'sticky'},
        height: {md:'90vh'},
        top:0,
        display: 'flex',
        flexDirection: 'column',
        gap:2,
        width: {md:'250px'}
      }}>
        <Paper elevation={2} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center',
          gap:2,
          p:2,
        }}>
          <HeaderGraphy>{data['full_name']}</HeaderGraphy>
          <Paper component='img' src={data['image']} elevation={2} sx={{height:'200px', width:'200px'}}/>

          <AgencyTable data={data}/>
          <Button fullWidth variant="contained" color="success" startIcon={<AddIcCallIcon />}>Contact Agency</Button>
        </Paper>
      </Box>


      <Box sx={{
        display:'flex',
        flexDirection:'column',
        gap:2,
        width: {md:'750px'}
      }}>
        <Paper elevation={2}>
          <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2,
            p:2,
          }}>
            <HeaderGraphy>Helpers</HeaderGraphy>
            <Typography variant="h5">{helpers.length} total Helpers available</Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: {xs:'column', md:'row'},
              gap: 2,
            }}>
              <Box>
                <Typography align="center" fontSize='large'>Nationality</Typography>
                <Pie data={helpers} prop={'personal_info_nationality'} />
              </Box>
              <Box>
                <Typography align="center" fontSize='large'>Type</Typography>
                <Pie data={helpers} prop={'personal_info_type'} />
              </Box>
            </Box>

            <HeaderGraphy>Description</HeaderGraphy>
            <Typography sx={{whiteSpace:'pre-wrap'}}>{data['description']}</Typography>

            <HeaderGraphy>Address & Contact</HeaderGraphy>
            <AgencyAddressTable data={data}/>

            <HeaderGraphy>Agency Helpers</HeaderGraphy>
            <Typography sx={{mb: 2}}>{displayHelpers.length} of {helpers.length} helpers showing</Typography>
            <Box sx={{display:'grid', gridTemplateColumns:{xs:'1fr 1fr', sm:'1fr 1fr 1fr'}, gap:2}}>
              {displayHelpers.map((helper) => (
                <HelperCard key={helper.id} data={helper} />
              ))}
            </Box>
            {displayHelpers.length < helpers.length && (
              <Typography align="center" sx={{mt:2}}>Scroll for more helpers...</Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Box> 
  </>)
}

export default AgencyData