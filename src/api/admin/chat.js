import apiRequest from "../apirequest";
import { toast } from "react-toastify";

import { formatTime } from "../../services/format";

/**
 * GET individual user's chat.
 * @param {int} user_id The user's ID that you want the chat of
 * @returns the chat.
 */
async function chatRequest(user_id) {
    return apiRequest(`message/${user_id}/`, 'GET');
}

async function chatUserRequest() {
    return formatTime(apiRequest(`chatbotuser/`, 'GET'));
}

async function deleteChatbotUser(id) {
    return apiRequest(`chatbotuser/${id}/`, 'DELETE', null, false).then((res) => {
        if (res === 'error') return toast("Oops, delete failed.");
        toast("Deleted successfully.");
    })
}

async function sendAdminMessage(id, message) {
    const body = {
        id: id,
        message: message
    }
    return apiRequest(`chat/sendmessage/`, 'POST', body, false).then((res) => {
        if (res !== 'error') toast("Message sent successfully!")
    });
}

export { chatRequest, chatUserRequest, deleteChatbotUser, sendAdminMessage }
