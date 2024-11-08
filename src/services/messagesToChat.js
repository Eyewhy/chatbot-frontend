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
    chatList.sort((a,b)=>new Date(a['date']) > new Date(b['date']));
    return chatList;
}

export default messagesToChat;