import React, { createRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import 'react-chat-elements/dist/main.css'
import { MessageList } from 'react-chat-elements'

import { chatRequest } from "../../api/get";
import { deleteChatbotUser } from "../../api/others";
import messagesToChat from "../../services/messagesToChat";

import '../../rce.css';

function ChatDetail () {
    const messageListReferance = createRef();

    const [data, setData] = useState({messages:[]});

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        ( async () => {
            let data = await chatRequest(id);
            data['messages'] = messagesToChat(data['messages']);
            console.log(data);
            setData(data);
        })();
    },[id]);
    
    const deleteButton = () => {
        deleteChatbotUser(id).then((res) => {
            if (res !== 'error') navigate("/chats");
        })
    }

    return (
        <>
            <div class="d-flex p-2 justify-content-between align-items-center">
                <span class="lead">{data.username}'s chat</span>
                <button class="btn btn-danger px-4" onClick={deleteButton}>Delete</button>
            </div>
            <MessageList
                referance={messageListReferance}
                className='message-list bg-dark'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={data['messages']} />
        </>
    )
}

export default ChatDetail