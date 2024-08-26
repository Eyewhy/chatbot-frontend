import apiRequest from "./apirequest";

/**
 * GET individual user's chat.
 * @param {int} user_id The user's ID that you want the chat of
 * @returns the chat.
 */
async function chatRequest(user_id) {
    return apiRequest(`message/${user_id}/`, 'GET');
}

async function chatUserRequest() {
    return apiRequest(`chatbotuser/`, 'GET');
}

/**
 * GET helperInfo
 * @param {int} helper_id 
 * @returns helperInfo
 */
async function helperRequest(id=null) {
    if (id === null) 
        return apiRequest('helperinfo/', 'GET');
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
        return apiRequest('referral/', 'GET');
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
        return apiRequest('qnadocument/', 'GET');
    else
        return apiRequest(`qnadocument/${id}/`, 'GET');
}

async function refreshQnaRequest() {
    return apiRequest('qnadocument/reload/','GET')
}


export { chatRequest, chatUserRequest, helperRequest, referralRequest, qnaRequest, refreshQnaRequest};