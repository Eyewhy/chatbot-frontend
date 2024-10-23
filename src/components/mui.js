import { PieChart } from "@mui/x-charts/PieChart"
import { Box, Typography } from "@mui/material"

function HeaderGraphy({children}) {
  return <Typography variant="button" color="primary" fontSize="medium" align='center'>
    {children}
  </Typography>
}

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

function Pie( { data, prop} ) {

    const countBy = (arr, prop) => arr.reduce((prev, curr) => (prev[curr[prop]] = ++prev[curr[prop]] || 1, prev), {});

    const count = (data, prop) => {
        const counted = countBy(data, prop);
        const res = []
        for (const [key, value] of Object.entries(counted)) {
            res.push({
                value: value,
                label: key
            });
        };
        return res;
    }
    return (
        <PieChart series={[{data:count(data, prop)}]} height={120} width={310}/>
    )
}


export { HeaderGraphy, Header, Pie }