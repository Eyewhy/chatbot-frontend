import { Paper, Typography, Link, Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function HelperCard({ data }) {
    return (
        <Paper elevation={2} sx={{
            minHeight:'400px',
            p:2,
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            <Link href={`#/biodata/${data['id']}`}>
                <Paper elevation={2} sx={{minHeight:'300px'}}>
                    <Typography>Placeholder for Image</Typography>
                </Paper>
            </Link>
            
            <Box sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems: 'center'
            }}> 
                <Box>
                    <Typography>{data['personal_info_name']}</Typography>
                    <Typography>{data['personal_info_nationality']} maid</Typography>
                    <Typography>Type: {data['personal_info_type']}</Typography>
                </Box>
                <IconButton sx={{height:'40px'}} size="medium" aria-label="Add to Shortlist" color="primary">
                    <AddIcon fontSize="medium"/>
                </IconButton>
            </Box>
        </Paper>
    )
}

export default HelperCard