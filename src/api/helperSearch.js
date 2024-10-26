import apiRequest from "./apirequest"

async function searchForHelper(authed, params) {
    if (authed)
        return apiRequest('authed/helperinfo/search/', 'POST', params, true);
    else
        return apiRequest('public/helperinfo/search/', 'POST', params, true);
}

export { searchForHelper }