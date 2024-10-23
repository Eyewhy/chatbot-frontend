import apiRequest from "./apirequest";

/**
 * GET helperInfo
 * @param {int} helper_id 
 * @returns helperInfo
 */
async function publicHelperRequest(authed, id) {
    if (authed)
        return apiRequest(`authed/helperinfo/${id}/`, 'GET');
    else
        return apiRequest(`public/helperinfo/${id}/`, 'GET');
}

async function publicOrganizationRequest(id) {
    return apiRequest(`public/organization/${id}/`, 'GET');
}

export {publicHelperRequest, publicOrganizationRequest}