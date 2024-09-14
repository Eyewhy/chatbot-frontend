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
    return chatList;
}

export default messagesToChat;