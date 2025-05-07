import apiRequest, { fileRequest } from "../apirequest";
import { toast } from "react-toastify";

async function uploadQna(file) {
    const allowed_extensions = ['pdf','txt','doc','docx'];
    const extension = file.name.split('.').pop();
    if ( !allowed_extensions.includes(extension)) return toast("Please upload a pdf / txt / doc / docx !");

    return fileRequest('qnadocument/', file).then((res) => {
        if (res === 'error') return toast("Oops, upload failed. Is it an acceptable type?");
        toast("Uploaded succesfully. Remember to update documents later.");
    })
}

async function deleteQna(id) {
    return apiRequest(`qnadocument/${id}`, 'DELETE', null, false).then((res) => {
        if (res === 'error') return toast("Oops, delete failed.");
        toast("Deleted successfully. Remember to update documents later.");
    })
}

async function deleteReferral(id) {
    return apiRequest(`referral/${id}`, 'DELETE', null, false).then((res) => {
        if (res === 'error') return toast("Oops, delete failed.");
        toast("Deleted successfully.");
    })
}


export { uploadQna, deleteQna, deleteReferral }