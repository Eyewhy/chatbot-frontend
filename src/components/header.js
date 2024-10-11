import { Box, Typography } from "@mui/material";

function Header ( {text, render} ) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            my:2,
        }}>
            <Typography variant="h5">{text}</Typography>
            {render}
        </Box>
    )
}

export default Header