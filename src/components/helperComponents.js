import { useState } from "react"

import { Button, Typography, TextField, TableCell, TableRow, FormControl, InputLabel, Select, MenuItem, ListItemText, Box } from "@mui/material";
import { HeaderGraphy } from "./mui";

function Cell( {children, colSpan} ) {
    return <TableCell sx={{border:'none'}} colSpan={colSpan} width='50%'>
        {children}
    </TableCell>
}

function Head( {children} ) {
    return <TableRow>
        <Cell colSpan={2}>
            <HeaderGraphy>{children}</HeaderGraphy>
        </Cell>
    </TableRow>
}

function ToggleButton( {accessor, label, data, setData} ) {
    const [isTrue, setTrue] = useState(data[accessor]);
    return (
        <Button  sx={{
            px:1,
            mr:1,
        }} 
        variant={(data[accessor]) ? "contained":"text"} color="primary"
        onClick={() => {
            setData(accessor, !data[accessor]);
            setTrue(!isTrue);
        }}>
            {label}
        </Button>
    );
}

function SkillToggle ( {label, accessor, data, setData} ) {
    return (
        <Cell>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
               <Typography>{label}</Typography>
               <Box>
                    <ToggleButton accessor={accessor+"_willing"} label="Willing" setData={setData} data={data}/>
                    <ToggleButton accessor={accessor+"_experience"} label="Experience" setData={setData} data={data}/>    
                </Box>
            </Box>
             
        </Cell>
    );
}

function BooleanToggle ( {label, accessor, data, setData} ) {
    return (
        <Cell>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography>{label}</Typography>
                <ToggleButton accessor={accessor} label="✓" setData={setData} data={data}/>
            </Box>
        </Cell>
    );
}

function TextInputField ( {label, accessor, data, setData} ) {
    return (
        <Cell>
            <TextField fullWidth size="small" variant="standard" 
            value={data[accessor]} defaultValue="loading" label={label} 
            onChange={(e) => {
                setData(accessor, e.target.value);
            }}/>
        </Cell>
    );
}

function LargeTextInputField ( {label, accessor, data, setData, colSpan} ) {
    return (
        <Cell colSpan={colSpan}>
            <TextField fullWidth size="small" variant="standard" multiline rows={4}
            value={data[accessor]} defaultValue="loading" label={label} 
            onChange={(e) => {
                setData(accessor, e.target.value);
            }}/>
        </Cell>
    );
}

function NumberField ( {label, accessor, data, setData} ) {
    return (<>
        <Cell>
            <TextField type="number" size="small" variant="standard"
            value={data[accessor]} defaultValue="0" label={label}
            onChange={(e) => {
                setData(accessor, e.target.value);
            }}/>
        </Cell>
    </>);
}

function OptionField ( {label, accessor, data, setData, options} ) {
    const [option, setOption] = useState(data[accessor])

    return (<>
        <Cell>
            <FormControl fullWidth size='small'>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={data[accessor]}
                    label={label}
                    default=''
                    variant="standard"
                    onChange={(e) => {
                        setData(accessor, e.target.value);
                        setOption(e.target.value);
                    }}
                >
                    {options.map((option) => {
                    return <MenuItem key={option} value={option}>
                        <ListItemText primary={option}/>
                    </MenuItem>
                    })}
                </Select>
            </FormControl>
        </Cell>
        
    </>);
}

export { SkillToggle, BooleanToggle, TextInputField, LargeTextInputField,  NumberField, OptionField, Head }