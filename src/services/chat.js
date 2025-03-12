import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { CHATBOT_ID } from '../App';
import { chatRequest, newChatRequest } from '../api/chat';
import { toast } from 'react-toastify';

let chatHistory = null;
let id = null;

async function getFingerprint() {
    id = localStorage.getItem('chatbot_id');
    if (id !== null) return;
    const fp = await FingerprintJS.load();
    const fingerprint = await fp.get().then((res)=>res['visitorId']);
    id = CHATBOT_ID*(10**12) + Number('0x' + fingerprint)%(10**12);
    localStorage.setItem('chatbot_id', id);
    console.log('Chatbot Id:' + id);
}

async function getChat() {
    await getFingerprint();
    // already have a history
    if (chatHistory !== null) return [];
    chatHistory = JSON.parse(localStorage.getItem('chat_history')) || [];
    // already have a saved history, skip the new chat request.
    if (chatHistory.length !== 0) return chatHistory;
    
    const res = await newChatRequest(id);
    addMessage(false, res);
    return chatHistory;
}

/**
 * Send a message
 * @param {string} message 
 * @returns {Promise<string>} response
 */
async function sendMessage(message) {
    addMessage(true, message);
    const res = await chatRequest(id,message);
    if (!res) {
        toast('Error, Please try again later.');
        return 'error';
    }
    addMessage(false, res);
    return res;
}

/**
 * also sawe to localstorage
 * @param {boolean} human_message 
 * @param {string} text 
 */
function addMessage(human_message, text) {
    chatHistory.push({human_message: human_message, text:text});
    localStorage.setItem('chat_history',JSON.stringify(chatHistory));
}

export { getChat, sendMessage }