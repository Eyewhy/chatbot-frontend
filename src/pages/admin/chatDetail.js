import React, { createRef, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import 'react-chat-elements/dist/main.css'
import { MessageList } from 'react-chat-elements'

import { Header } from "../../components/mui";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import { chatRequest, deleteChatbotUser, sendAdminMessage } from "../../api/admin/chat";
import { messagesToChat, getChatId } from "../../services/format";

function ChatDetail () {
    const messageListReferance = createRef();

    const messageListEndRef = useRef(null);
    const messageListStartRef = useRef(null);

    const [data, setData] = useState({messages:[]});
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    async function getData() {
        await chatRequest(id).then((data) => {
            getChatId(data);
            data['messages'] = messagesToChat(data['messages']);
            console.log(data);
            setData(data);
        });
    }

    useEffect(() => {
        getData();
    },[id]);
    
    const deleteButton = () => {
        deleteChatbotUser(id).then((res) => {
            if (res !== 'error') navigate("/admin/chats");
        })
    }

    const sendButton = () => {
        console.log(message);
        if (message.length === 0) return;
        sendAdminMessage(id, message);
        setTimeout(getData, 1000);
    }

    const scrollToBottom = () => messageListEndRef.current.scrollIntoView();
    const scrollToTop = () => messageListStartRef.current.scrollIntoView();

    return (
        <Box sx={{display: 'flex', gap:2, flexDirection: 'column'}}>
            <div ref={messageListStartRef}/>
            <Header text={`${data.username}'s chat (${data['number']})`} render={
                <>
                    <Typography></Typography>
                    <Button variant="contained" onClick={scrollToBottom}>Go to Bottom</Button>
                    <Button variant="contained" color="error" onClick={deleteButton}>Delete</Button>
                </>
            }/>
            <Paper elevation={2}>
                <MessageList
                    referance={messageListReferance}
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={data['messages']} />    
            </Paper>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                <TextField fullWidth onChange={(e) => {setMessage(e.target.value);}}/>
                <Button variant="contained" onClick={sendButton}>Send</Button>
            </Box>
            
            <Box sx={{display: 'flex', justifyContent:'center'}}>
                <Button variant="contained" onClick={scrollToTop}>Return to Top</Button>
            </Box>
            
            <div ref={messageListEndRef}/>
        </Box>
    )
}

export default ChatDetail