import apiRequest from "./apirequest"

function cleanHelperSearch(params) {
    const newParams  = structuredClone(params)
    delete newParams['agency'];
    for (const [key, value] of Object.entries(newParams)) {
        if (value === null || value.length === 0) delete newParams[key];

        if (key === 'type') {
            for (let i=0;i<value.length;i++) {
                if (value[i] === 'Advance Placement') value[i] = 'advance_placement_scheme';
            }
        }
    }
    return newParams
}

async function searchForHelper(params) {
    const newParams = cleanHelperSearch(params);
    return apiRequest('helperinfo/search/', 'POST', newParams, true)
}

export default searchForHelper