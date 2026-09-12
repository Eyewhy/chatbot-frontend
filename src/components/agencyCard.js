import { Paper, Typography, Link, Box } from "@mui/material";
import { styled } from '@mui/material/styles'

function AgencyCard({ data }) {
    const ImgContainer = styled(Box)(({theme}) => ({
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.grey[100],
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.down('md')]: {
            width: '100px',
            height: '100px',
        },
    }))

    const ImgPaper = styled(Paper)(({theme}) => ({
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
        textAlign: 'center',
        alignContent: 'center',
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
                <ImgContainer>
                    {data['image'] ? 
                        <ImgPaper component='img' elevation={2} src={data['image']} />   
                    :
                        <ImgPaper elevation={2} sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                            Image Unavailable
                        </ImgPaper>   
                    }
                </ImgContainer>
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