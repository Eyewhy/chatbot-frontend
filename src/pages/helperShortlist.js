import { useShortlist } from "../services/shortlistProvider";

import { Box, Grid2, Link } from "@mui/material"
import { Header } from "../components/mui";
import HelperCard from "../components/helperCard"

function HelperShortlist() {
    const shortlist = useShortlist();
    return (<>
        <Header text={`${shortlist.shortlist.length} Helpers Shortlisted`} />
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            <Grid2 container spacing={2}>
                {shortlist.shortlist.map((helper) => {
                    return (<Grid2 key={helper['id']} size={{lg:3, md:4, sm:4, xs:6}}>
                        <HelperCard key={helper['id']} data={helper}/>
                    </Grid2>)
                })}
            </Grid2>
            <Link href="#/search" textAlign="center" variant="h6">Add more Helpers</Link>
        </Box>
        
    </>)
}

export default HelperShortlist