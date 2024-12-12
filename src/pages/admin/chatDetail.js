import React, { createRef, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import 'react-chat-elements/dist/main.css'
import { MessageList } from 'react-chat-elements'

import { Header } from "../../components/mui";
import { Box, Button, Paper, Typography } from "@mui/material";

import { chatRequest } from "../../api/admin/get";
import { deleteChatbotUser } from "../../api/admin/others";
import { messagesToChat, getChatId } from "../../services/format";

function ChatDetail () {
    const messageListReferance = createRef();

    const messageListEndRef = useRef(null);
    const messageListStartRef = useRef(null);

    const [data, setData] = useState({messages:[]});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        ( async () => {
            await chatRequest(id).then((data) => {
                getChatId(data);
                data['messages'] = messagesToChat(data['messages']);
                console.log(data);
                setData(data);
            });
            
        })();
    },[id]);
    
    const deleteButton = () => {
        deleteChatbotUser(id).then((res) => {
            if (res !== 'error') navigate("/admin/chats");
        })
    }

    const scrollToBottom = () => messageListEndRef.current.scrollIntoView();
    const scrollToTop = () => messageListStartRef.current.scrollIntoView();

    return (
        <>
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
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Button variant="contained" onClick={scrollToTop}>Return to Top</Button>
            </Box>
            
            <div ref={messageListEndRef}/>
        </>
    )
}

export default ChatDetail