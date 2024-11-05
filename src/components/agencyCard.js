import { Paper, Typography, Link, Box } from "@mui/material";
import { styled } from '@mui/material/styles'

function AgencyCard({ data }) {
    const ImgPaper = styled(Paper)(({theme}) => ({
        height: '200px',
        width:'200px',
        textAlign: 'center',
        alignContent: 'center',
        [theme.breakpoints.down('lg')]: {
            height: '100px',
            width: '100px',
        },
    }))

    return (
        <Paper elevation={2} sx={{
            p:2,
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap:2
        }}>

            <Link href={`#/organization/${data['id']}`}>
                {data['image'] ? 
                    <ImgPaper component='img' elevation={2} src={data['image']} />   
                :
                    <ImgPaper elevation={2}>
                        Image Unavailable
                    </ImgPaper>   
                }
                
            </Link>
            
            <Box sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems: 'center',
                width: 1
            }}> 
                <Box>
                    <Typography>{data['name']}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default AgencyCard