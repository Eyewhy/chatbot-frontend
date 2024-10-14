import { Box, Typography } from "@mui/material";

function Header ( {text, render} ) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            my:2,
        }}>
            <Typography variant="h5">{text}</Typography>
            <Box sx={{display:'flex', gap:2}}>
                {render}
            </Box>
        </Box>
    )
}

export default Header