import { Paper, Typography, Link, Box, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'

import { toast } from "react-toastify";

import { useShortlist } from "../services/shortlistProvider";

function HelperCard({ data }) {
    const shortlist = useShortlist();
    const ImgPaper = styled(Paper)(({theme}) => ({
        height: '300px',
        width:'200px',
        textAlign: 'center',
        alignContent: 'center',
        [theme.breakpoints.down('lg')]: {
            height: '150px',
            width: '100px',
        },
    }))

    function addToShortlist() {
        shortlist.addToShortlist(data) ? toast("Added to shortlist.") : toast("Already in Shortlist!");
    }

    function removeFromShortlist() {
        shortlist.removeFromShortlist(data); 
        toast("Removed from Shortlist.");
    }

    return (
        <Paper elevation={2} sx={{
            p:2,
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap:2
        }}>

            <Link href={`#/biodata/${data['id']}`}>
                {data['image'] ? 
                    <ImgPaper component='img' elevation={2} src={data['image']} />   
                :
                    <ImgPaper elevation={2}>
                        Please Sign In to View Image
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
                    <Typography noWrap>{data['personal_info_name']}</Typography>
                    <Typography noWrap>{data['personal_info_nationality']} maid</Typography>
                    <Typography noWrap>Type: {data['personal_info_type']}</Typography>
                </Box>
                {(useShortlist().inShortlist(data) === -1) ?
                    <IconButton size="medium" aria-label="Add to Shortlist" color="primary" onClick={addToShortlist}>
                        <AddIcon fontSize="medium"/>
                    </IconButton>
                :
                    <IconButton size="medium" aria-label="Remove from Shortlist" color="primary" onClick={removeFromShortlist}>
                        <RemoveIcon fontSize="medium"/>
                    </IconButton>
                }
                
            </Box>
        </Paper>
    )
}

export default HelperCard