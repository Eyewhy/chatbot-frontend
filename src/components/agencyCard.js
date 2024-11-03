import { Paper, Typography, Link, Box } from "@mui/material";

function AgencyCard({ data }) {
    return (
        <Paper elevation={2} sx={{
            minHeight:'400px',
            p:2,
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap:2
        }}>

            <Link href={`#/organization/${data['id']}`}>
                {data['image'] ? 
                    <Paper component='img' elevation={2} sx={{height:'200px', width:'200px'}} src={data['image']} />   
                :
                    <Paper elevation={2} sx={{height:'200px', width:'200px', p:1, textAlign:"center", alignContent:"center"}}>
                        Image Unavailable
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
                    <Typography noWrap>{data['name']}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default AgencyCard