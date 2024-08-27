import apiRequest from "./apirequest";
import { toast } from "react-toastify";

async function updateHelper(id, body) {
    if (Object.keys(body).length === 0) return toast("No changes to save.");
    return apiRequest(`helperinfo/${id}/`, 'POST', body, false).then((res) => {
        console.log(res);
        if (res == 'error') return toast("Oops, save failed. Refresh to try again.");
        toast("Helper Info updated successfully. Refresh to see changes.")
    });
}

export { updateHelper }