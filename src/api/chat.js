import apiRequest from "./apirequest";

import { CHATBOT_ID } from "../App";

async function chatRequest(id, message) {
    return apiRequest('chat/', 'POST', {
        user_id:id, 
        message:message,
    },true,false).then((res) => res['output']);
}

async function newChatRequest(id) {
    return apiRequest('chat/create/','POST', {
        chatbot_id: CHATBOT_ID,
        user_id:id,
        username:id.toString(),
    },true,false).then((res) => res['output']);
}

export {chatRequest, newChatRequest};