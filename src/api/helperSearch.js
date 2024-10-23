import apiRequest from "./apirequest"

function cleanHelperSearch(params) {
    const newParams  = structuredClone(params)
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

async function searchForHelper(authed, params) {
    const newParams = cleanHelperSearch(params);
    if (authed)
        return apiRequest('authed/helperinfo/search/', 'POST', newParams, true);
    else
        return apiRequest('public/helperinfo/search/', 'POST', newParams, true);
}

export { searchForHelper }