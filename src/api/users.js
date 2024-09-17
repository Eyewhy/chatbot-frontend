import apiRequest from "./apirequest";

async function organizationDetailRequest() {
    return apiRequest('organization/', 'GET');
}

async function changePassphraseRequest(pass) {
    return apiRequest('organization/', 'POST', {'passphrase':pass}, false);
}

async function addToOrganizationRequest(name, pass) {
    return apiRequest('organization/add/', 'POST', {
        'name': name, 
        'passphrase':pass
    }, false);
}

async function deleteUserFromOrganizationRequest(id) {
    return apiRequest(`organization/userinfo/${id}/`, 'DELETE');
}

export {organizationDetailRequest, changePassphraseRequest, addToOrganizationRequest, deleteUserFromOrganizationRequest}