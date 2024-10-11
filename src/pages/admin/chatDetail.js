import React, { createRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import 'react-chat-elements/dist/main.css'
import { MessageList } from 'react-chat-elements'

import Header from "../../components/header";
import { Box, Typography, Button, Paper } from "@mui/material";

import { chatRequest } from "../../api/get";
import { deleteChatbotUser } from "../../api/others";
import messagesToChat from "../../services/messagesToChat";

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
            <Header text={data.username + "'s chat"} render={
                <Button variant="contained" color="error" onClick={deleteButton}>Delete</Button>
            }/>
            <Paper elevation='2'>
                <MessageList
                    referance={messageListReferance}
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={data['messages']} />    
            </Paper>
            
        </>
    )
}

export default ChatDetail