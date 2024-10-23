import { Paper, Typography, Link, Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function HelperCard({ data }) {
    return (
        <Paper elevation={2} sx={{
            minHeight:'400px',
            p:2,
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap:2
        }}>

            <Link href={`#/biodata/${data['id']}`}>
                {data['image'] ? 
                    <Paper component='img' elevation={2} sx={{height:'300px', width:'200px'}} src={data['image']} />   
                :
                    <Paper elevation={2} sx={{height:'300px', width:'200px', p:1}}>
                        Please Sign In to View Image
                    </Paper>   
                }
                
            </Link>
            
            <Box sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems: 'center',
                width: 1
            }}> 
                <Box>
                    <Typography noWrap>{data['personal_info_name']}</Typography>
                    <Typography noWrap>{data['personal_info_nationality']} maid</Typography>
                    <Typography noWrap>Type: {data['personal_info_type']}</Typography>
                </Box>
                <IconButton sx={{height:'40px'}} size="medium" aria-label="Add to Shortlist" color="primary">
                    <AddIcon fontSize="medium"/>
                </IconButton>
            </Box>
        </Paper>
    )
}

export default HelperCard