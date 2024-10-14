import { Paper, Typography, Box } from "@mui/material";

function HelperCard({ data }) {
    return (
        <Paper elevation={2} sx={{
            minHeight:'400px',
            p:2,
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            <Paper elevation={2} sx={{minHeight:'300px'}}>
                <Typography>Placeholder for Image</Typography>
            </Paper>
            <Box>
                <Typography>{data['personal_info_name']}</Typography>
                <Typography>{data['personal_info_nationality']} maid</Typography>
                <Typography>Type: {data['personal_info_type']}</Typography>
            </Box>
        </Paper>
    )
}

export default HelperCard