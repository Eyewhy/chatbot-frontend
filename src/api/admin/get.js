import apiRequest from "../apirequest";
import { toast } from "react-toastify";

import { formatTime } from "../../services/format";

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

/**
 * GET referral
 * @param {int} referral_id 
 * @returns refferal
 */
async function referralRequest(id=null) {
    if (id === null) 
        return formatTime(apiRequest('referral/', 'GET'));
    else
        return apiRequest(`referral/${id}/`, 'GET');
}

/**
 * GET qnaDocument
 * @param {int} qnaDocument_id 
 * @returns qnaDocument
 */
async function qnaRequest(id=null) {
    if (id === null) 
        return formatTime(apiRequest('qnadocument/', 'GET'));
    else
        return apiRequest(`qnadocument/${id}/`, 'GET');
}

async function refreshQnaRequest() {
    toast("Documents reloading...")
    return apiRequest('qnadocument/reload/','GET', null, false).then((res) => {
        if (res === 'error') return toast("Oops, update failed.");
        toast("Documents reloaded successfully.");
    })
}


export { helperRequest, referralRequest, qnaRequest, refreshQnaRequest};