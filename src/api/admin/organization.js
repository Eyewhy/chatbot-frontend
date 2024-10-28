import apiRequest, {fileRequest} from "../apirequest";
import { toast } from "react-toastify";

async function organizationDetailRequest() {
    return apiRequest('organization/', 'GET');
}

async function updateOrganization(body) {
    if (Object.keys(body).length === 0) return toast("No changes to save.");
    
    return apiRequest(`organization/`, 'POST', body, false).then((res) => {
        if (res === 'error') return toast("Oops, save failed. Please try again.");
        toast("Organization Info updated successfully.");
    });
}

async function addToOrganizationRequest(name, pass) {
    return apiRequest('organization/add/', 'POST', {
        'name': name, 
        'passphrase':pass
    }, false);
}

async function deleteUserFromOrganizationRequest(id) {
    return apiRequest(`organization/userinfo/${id}/`, 'DELETE', null, false).then((res) => {
        if (res === 'error') return toast("Oops, delete failed.");
        toast("Deleted successfully.");
    })
}

async function uploadOrganizationImage(id, file) {
    if (! ['jpg', 'jpeg'].includes(file.name.split('.').pop())) return toast("Please upload a jpg/jpeg!");
    return fileRequest(`organization/${id}/image/`, file).then((res) => {
        if (res === 'error') return toast("Oops, upload failed. Is it a jpeg?");
        toast("Image updated succesfully.");
    })
}

export {organizationDetailRequest, updateOrganization, addToOrganizationRequest, deleteUserFromOrganizationRequest, uploadOrganizationImage}