import { FormInputSelect, FormInputSlider } from "../components/formComponents"
import { MenuItem } from "@mui/material";

export default function HelperSearchBar({ setSearchParam, agencies, menu }) {
    const salaryRange = [550,1500];
    const recencyRange = [1,30];
    const salaryText = (value) => (value === salaryRange[1]) ? 'Ꝏ' : `$${value}`;
    const recencyText = (value) => {
        if (value === recencyRange[1]) return 'Ꝏ';
        if (value === 1) return `${value} day`;
        return `${value} days`;
    }

    const searchBar = [
        {
            type: 'select', 
            name: 'type', 
            label: 'Type', 
            options: ['New', 'Transfer', 'Advance Placement', 'Ex-Singapore']
        },{
            type: 'select',
            name: 'nationality',
            label: 'Nationality',
            options: ["Filipino", "Indonesian", "Myanmarese", "Indian", "Sri Lankan", "Bangladeshi", "Cambodian", "Malaysian", "Thai", "Vietnamese"]
        },{
            type: 'select',
            name: 'language',
            label: 'Language',
            options: ["English", "Chinese", "Malay", "Hindi", "Tamil"]
        },{
            type: 'select',
            name: 'agency',
            label: 'Agengy',
            options: Object.keys(agencies)
        },{
            type: 'slider',
            name: 'salary',
            label: 'Max Salary',
            range: salaryRange,
            step: 50,
            valueText: salaryText
        },{
            type: 'slider',
            name: 'recency',
            label: 'Recency',
            range: recencyRange,
            step: 1,
            valueText: recencyText
        }
    ]

    return searchBar.map((object) => {
        return (menu) ? 
            (<MenuItem sx={{mx:2}}>
                {(object['type'] === 'select') ? 
                    <FormInputSelect {...object} setOptions={setSearchParam}/>
                :
                    <FormInputSlider {...object} setOptions={setSearchParam}/>
                }
            </MenuItem>)
        : ((object['type'] === 'select') ? 
            <FormInputSelect {...object} setOptions={setSearchParam}/>
        :
            <FormInputSlider {...object} setOptions={setSearchParam}/>
        )
    })
}