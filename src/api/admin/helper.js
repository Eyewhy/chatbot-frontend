import apiRequest, { fileRequest } from "../apirequest";
import { toast } from "react-toastify";

import { formatTime } from "../../services/format";

const PDF_EXTENSIONS = ['pdf','PDF'];

/**
 * GET helperInfo
 * @param {int} helper_id 
 * @returns helperInfo
 */
async function helperRequest(id=null) {
    if (id === null) 
        return formatTime(apiRequest('helperinfo/', 'GET'));
    else
        return apiRequest(`helperinfo/${id}/`, 'GET');
}

async function uploadHelper(file) {
    const renamed_file = new File([file], file.name.toLowerCase(), {type: file.type});
    if (!PDF_EXTENSIONS.includes(renamed_file.name.split('.').pop())) return toast("Please upload a pdf!");
    toast("File uploaded. Scanning may take a minute.")
    return fileRequest('helperinfo/', renamed_file).then((res) => {
        if (res === 'error') return toast("Oops, upload failed. Is it a pdf?");
        toast("Biodata scanned succesfully.");
    })
}

async function uploadHelperImage(id, file) {
    const renamed_file = new File([file], file.name.toLowerCase(), {type: file.type});
    if (! ['jpg', 'jpeg'].includes(renamed_file.name.split('.').pop())) return toast("Please upload a jpg/jpeg!");
    return fileRequest(`helperinfo/${id}/image/`, renamed_file).then((res) => {
        if (res === 'error') return toast("Oops, upload failed. Is it a jpeg?");
        toast("Image updated succesfully.");
    })
}

async function updateHelper(id, body) {
    if (Object.keys(body).length === 0) return toast("No changes to save.");
    
    return apiRequest(`helperinfo/${id}/`, 'POST', body, false).then((res) => {
        if (res === 'error') return toast("Oops, save failed. Please try again.");
        toast("Helper Info updated successfully.");
    });
}

async function deleteHelper(id) {
    return apiRequest(`helperinfo/${id}/`, 'DELETE', null, false).then((res) => {
        if (res === 'error') return toast("Oops, delete failed.");
        toast("Deleted successfully.");
    })
}

async function toggleHelperVisibility(id, visibility) {
    const body = {
        id: id,
        visibility: visibility
    }
    return apiRequest(`helperinfo/togglevisibility/`, 'POST', body, false).then((res) => {
        if (res !== 'error') toast("Visibility Toggled.");
    })
}

export {helperRequest, uploadHelper, updateHelper, uploadHelperImage, deleteHelper, toggleHelperVisibility}