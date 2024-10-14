import { useState, useEffect } from "react";

import { Box, Grid2 } from "@mui/material"
import { FormInputSelect, FormInputSlider } from "../components/formComponents"
import Header from "../components/header";
import HelperCard from "../components/helperCard"

import { helperRequest } from "../api/get";

function HelperSearch() {
    const [search, setSearch] = useState({});
    const [results, setResults] = useState([]);

    async function getData(params) {
        let data = await helperRequest();
        console.log(data);
        setResults(data);
    }

    function setSearchParam(param, value) {
        search[param] = value;
        setSearch(search);
        console.log(search);
        getData(0);
    }

    useEffect(() => {
        getData();
    },[])

    const salaryRange = [550,1500];
    const recencyRange = [1,30];
    const salaryText = (value) => (value === salaryRange[1]) ? 'Unlimited' : `$${value}`;
    const recencyText = (value) => (value === recencyRange[1]) ? 'Unlimited' : `${value} day(s)`;

    return (<>
        <Header text={`${results.length} Maids found in Singapore`} />
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            
            <Box sx={{display:'flex', gap:2}}>
                <FormInputSelect name="type" setOptions={setSearchParam} label="Type" options={[
                    'New', 'Transfer', 'Advance Placement', 'Ex-Singapore'
                ]}/>
                <FormInputSelect name="nationality" setOptions={setSearchParam} label="Nationality" options={[
                    "Filipino", "Indonesian", "Myanmarese", "Indian", "Sri Lankan", "Bangladeshi", "Cambodian", "Malaysian", "Thai", "Vietnamese"
                ]}/>
                <FormInputSelect name="language" setOptions={setSearchParam} label="Language" options={[
                    "English", "Chinese", "Malay", "Hindi", "Tamil"
                ]}/>
                <FormInputSelect name="skills" setOptions={setSearchParam} label="Duty" options={[
                    "Cooking",
                    "General Housework",
                    "Infant & Children Care",
                    "Elderly Care",
                    "Disabled Care",
                    "Pet Care",
                ]}/>
                <FormInputSelect name="agency" setOptions={setSearchParam} label="Agency" options={['ASSET']}/>
                <FormInputSlider name="salary" setOptions={setSearchParam}label="Max Salary" range={salaryRange} step={50} valueText={salaryText}/>
                <FormInputSlider name="recency" setOptions={setSearchParam}label="Recency" range={recencyRange} step={1} valueText={recencyText}/>
            </Box>
            
            <Grid2 container spacing={2}>
                {results.map((helper) => {
                    return (<Grid2 size={{lg:3, md:4, sm:4, xs:5}}>
                        <HelperCard key={helper['id']} data={helper}/>
                    </Grid2>)
                })}
            </Grid2>
        </Box>
    </>)
}

export default HelperSearch