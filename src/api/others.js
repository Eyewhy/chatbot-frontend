import apiRequest, { fileRequest } from "./apirequest";
import { toast } from "react-toastify";

async function uploadHelper(file) {
    if (file.name.split('.').pop() !== 'pdf') return toast("Please upload a pdf!");
    toast("File uploaded. Scanning may take a minute.")
    return fileRequest('helperinfo/', file).then((res) => {
        if (res === 'error') return toast("Oops, upload failed. Is it a pdf?");
        toast("Biodata scanned succesfully.");
    })
}

async function updateHelper(id, body) {
    if (Object.keys(body).length === 0) return toast("No changes to save.");
    return apiRequest(`helperinfo/${id}/`, 'POST', body, false).then((res) => {
        if (res === 'error') return toast("Oops, save failed. Refresh to try again.");
        toast("Helper Info updated successfully. Refresh to see changes.");
    });
}

async function deleteHelper(id) {
    return apiRequest(`helperinfo/${id}`, 'DELETE', null, false).then((res) => {
        if (res === 'error') return toast("Oops, delete failed.");
        toast("Deleted successfully.");
    })
}

async function uploadQna(file) {
    const allowed_extensions = ['pdf','txt','doc','docx'];
    const extension = file.name.split('.').pop();
    if ( !allowed_extensions.includes(extension)) return toast("Please upload a pdf / txt / doc / docx !");

    return fileRequest('qnadocument/', file).then((res) => {
        if (res === 'error') return toast("Oops, upload failed. Is it an acceptable type?");
        toast("Uploaded succesfully.");
    })
}

async function deleteQna(id) {
    return apiRequest(`qnadocument/${id}`, 'DELETE', null, false).then((res) => {
        if (res === 'error') return toast("Oops, delete failed.");
        toast("Deleted successfully. Remember to update later.");
    })
}

export { uploadHelper, updateHelper, deleteHelper, uploadQna, deleteQna }