import React, { useState, useEffect } from 'react';

import {Widget, addResponseMessage, addUserMessage } from '@ryaneewx/react-chat-widget'
import '@ryaneewx/react-chat-widget/lib/styles.css';

import { getChat, sendMessage } from '../services/chat';
import { useAuth } from '../services/authProvider';
import { websiteVersion } from '../App';

export default function ChatWidget() {
    const auth = useAuth();
    useEffect(()=>{
        const getId = async () => {
            let messages = await getChat();
            console.log(messages);
            messages.forEach(element => {
                if (element['human_message']) addUserMessage(element['text']);
                else addResponseMessage(element['text']);
            });
        };
        getId();
    },[])

    const handleNewUserMessage = async (message) => {
        addResponseMessage(await sendMessage(message));
    }
    return (
        (websiteVersion === 'helper_agency' && auth.organization === 0) ?
        <Widget 
            handleNewUserMessage={handleNewUserMessage}
            title="Chat with Chatbot"
            subtitle="Find your perfect domestic helper match"
        />
        : ""
    )
    
}