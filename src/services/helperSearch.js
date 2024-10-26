function cleanHelperSearch(params, agencyData) {
    const newParams  = structuredClone(params)
    for (const [key, value] of Object.entries(newParams)) {
        if (value === null || value.length === 0) delete newParams[key];

        if (key === 'type') {
            for (let i=0;i<value.length;i++) {
                if (value[i] === 'Advance Placement') value[i] = 'advance_placement_scheme';
            }
        }

        if (key === 'agency') {
            for (let i=0;i<value.length;i++) {
                value[i] = agencyData[value[i]];
            }
        }
    }
    return newParams
}

function processAgencyData(data) {
    let processedData = {};
    for (let i=0;i<data.length;i++) {
        processedData[data[i]['name']] = data[i]['id'];
    }
    return processedData;
}

export { cleanHelperSearch, processAgencyData }