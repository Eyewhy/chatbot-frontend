import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Paper, Box, Typography, Button } from "@mui/material";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import { AgencyTable, AgencyAddressTable } from "../components/tables";

import { publicOrganizationRequest } from "../api/public";
import { searchForHelper } from "../api/helperSearch";
import { HeaderGraphy, Pie } from "../components/mui";


function AgencyData () {
  const [data, setData] = useState({});
  const [helpers, setHelpers] = useState([]);
  const { id } = useParams();

  useEffect(() => {( async () => {
    let res = await publicOrganizationRequest(id);
    setData(res);
    let res2 = await searchForHelper(false, {agency: [id]});
    setHelpers(res2);
  })();}, []);

  return (<>
    <Box sx={{
      display:'flex',
      justifyContent: 'center',
      mt:2,
      gap: 2
    }}>
      <Box sx={{
        position: 'sticky',
        top:0,
        display: 'flex',
        flexDirection: 'column',
        gap:2,
        height:'1000px',
        width:'20%'
      }}>
        <Paper elevation={2} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center',
          gap:2,
          p:2,
        }}>
          <HeaderGraphy>{data['name']}</HeaderGraphy>
          <Paper component='img' src={data['image']} elevation={2} sx={{height:'200px', width:'200px'}}/>

          <AgencyTable data={data}/>
          <Button fullWidth variant="contained" color="success" startIcon={<AddIcCallIcon />}>Contact Agency</Button>
        </Paper>
      </Box>


      <Box sx={{
        display:'flex',
        flexDirection:'column',
        gap:2,
        width: '50%'
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
          </Box>
        </Paper>
      </Box>
    </Box> 
  </>)
}

export default AgencyData