import { format } from 'timeago.js'

/**
 * In-place.
 * @param {Array} chatList 
 */
function formatChatList (chatList) {
    chatList.forEach((chat) => getChatId(chat));
}

/**
 * In-place.
 * @param {Object} chat 
 */
function getChatId (chat) {
    chat['number'] = parseInt(chat['id']) % (10**12);
}

function messagesToChat (messageList) {
    const chatList = [];
    messageList.forEach ((message) => {
        chatList.push({
            'position': (message['human_message']) ? 'right' : 'left',
            'type': 'text',
            'text': message['text'],
            'date': message['time'],
        })
    })
    chatList.sort((a,b)=>new Date(a['date']) > new Date(b['date']) ? 1 : -1);
    return chatList;
}

async function formatTime (itemListPromise) {
    return itemListPromise.then((itemList) => {
        if (itemList === 'error') return 'error';
        itemList.forEach(( item ) => {
            timeAgo(item, 'time');
        })
        return itemList
    })
}

function formatTimeSync (itemList, attr='time'){
    itemList.forEach(( item ) => {
        timeAgo(item, attr);
    })
}

function timeAgo (item, attr='time') {item[attr] = format(new Date(item[attr]));};

export { formatTime, messagesToChat, timeAgo, formatTimeSync, formatChatList, getChatId }