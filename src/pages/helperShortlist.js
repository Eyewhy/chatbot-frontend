import { useState, useEffect } from "react";

import { useShortlist } from "../services/shortlistProvider";

import { Box, Grid2 } from "@mui/material"
import { Header } from "../components/mui";
import HelperCard from "../components/helperCard"

function HelperShortlist() {

    return (<>
        <Header text={`${useShortlist().getShortlist().length} Helpers Shortlisted`} />
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            <Grid2 container spacing={2}>
                {useShortlist().getShortlist().map((helper) => {
                    return (<Grid2 key={helper['id']} size={{lg:3, md:4, sm:4, xs:6}}>
                        <HelperCard key={helper['id']} data={helper}/>
                    </Grid2>)
                })}
            </Grid2>
        </Box>
    </>)
}

export default HelperShortlist