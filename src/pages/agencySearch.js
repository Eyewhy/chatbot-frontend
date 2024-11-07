import { useState, useEffect } from "react";

import { Box, Grid2 } from "@mui/material"
import { Header } from "../components/mui";
import AgencyCard from "../components/agencyCard";

import { publicOrganizationRequest } from "../api/public";

function AgencySearch() {

    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        const getAgencyData = async () => {
            setAgencies(await publicOrganizationRequest());    
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
                    return (<Grid2 key={helper['id']} size={{lg:3, md:4, sm:4, xs:6}}>
                        <AgencyCard key={helper['id']} data={helper}/>
                    </Grid2>)
                })}
            </Grid2>
        </Box>
    </>)
}

export default AgencySearch