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

function Pie({ data, prop }) {
    const countBy = (arr, prop) => 
        arr.reduce((prev, curr) => (prev[curr[prop]] = ++prev[curr[prop]] || 1, prev), {});

    const count = (data, prop) => {
        const counted = countBy(data, prop);
        const res = [];
        for (const [key, value] of Object.entries(counted)) {
            res.push({
                value: value,
                label: key
            });
        };
        return res;
    };

    const chartData = count(data, prop);
    const showLegend = chartData.length <= 3;

    return (
        <PieChart 
            series={[{ data: chartData }]} 
            height={120} 
            width={310}
            margin={{ 
                top: 10, 
                bottom: 10, 
                left: 10, 
                right: showLegend ? 120 : 10 // Reduces right margin to give chart more space when legend is hidden
            }}
            slotProps={{
                legend: showLegend ? {
                    direction: 'column',
                    position: { vertical: 'middle', horizontal: 'right' },
                    labelStyle: { fontSize: 12 },
                    itemGap: 4,
                } : { hidden: true }
            }}
        />
    );
}


export { HeaderGraphy, Header, Pie }