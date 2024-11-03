import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid2 } from "@mui/material"
import { Header } from "../components/mui";
import AgencyCard from "../components/agencyCard";

import { publicOrganizationRequest } from "../api/public";

import { useAuth } from "../services/authProvider";

function AgencySearch() {
    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        const getAgencyData = async () => {
            let agencyData = await publicOrganizationRequest();
            setAgencies(agencyData);    
        }
        getAgencyData();
    },[])

    return (<>
        <Header text={`${agencies.length} Maid Agencies found in Singapore`} />
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            <Grid2 container spacing={2}>
                {agencies.map((helper) => {
                    return (<Grid2 key={helper['id']} size={{lg:3, md:4, sm:4, xs:5}}>
                        <AgencyCard key={helper['id']} data={helper}/>
                    </Grid2>)
                })}
            </Grid2>
        </Box>
    </>)
}

export default AgencySearch