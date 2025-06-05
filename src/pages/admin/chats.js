import React, { useMemo, useState, useEffect } from "react";

import Table from "../../components/table";

import { Header } from "../../components/mui"
import { Link, Button, Typography, Box } from "@mui/material";

import { chatUserRequest, chatUserRecentRequest, deleteChatbotUser } from "../../api/admin/chat";

import { formatChatList } from "../../services/format";

function ChatPage () {
    const columns = useMemo(() => [
        {
            Header: "Username",
            accessor: "username",
            Cell: props => <Link href={`#/admin/chats/${props.row.original.id}`}>{props.value}</Link>
        },
        {
            Header: "ID/Number",
            accessor: "number"
        },
        {
            Header: "Last Message",
            accessor: "last_message"
        },
        {
            Header: "Last Active",
            accessor: "time"
        },
        {
            Header: "Platform",
            accessor: "platform"
        },
        {
            Header: "Delete",
            accessor: "id",
            Cell: props => <Button variant="outlined" color="error" onClick={(e) => {
                deleteButton(props.value);
            }}>Delete</Button>
        }
    ],[]);

    const [data, setData] = useState([]);
    const [state, setState] = useState(false);

    useEffect(() => {
        ( async () => {
            await chatUserRecentRequest().then((data) => {
                formatChatList(data);
                setData(data);
            });
        })();
    },[state])

    const getAllButton = () => {
        ( async () => {
            await chatUserRequest().then((data) => {
                formatChatList(data);
                setData(data);
            })
        })();
    }

    const deleteButton = (id) => {
        deleteChatbotUser(id).then((res) => {
            if (res !== 'error') setState(!state);
        })
    }

    return (
        <>
            <Header text="Recently Active Users" render={
                <Box sx={{display:'flex', alignItems:'center', gap:2}}>
                    <Typography>Showing last {data.length} users</Typography>
                    <Button variant="contained" onClick={getAllButton}>Get all Users</Button>
                </Box>
            }/>
            <Table columns={columns} data={data} />
        </>
    )
}

export default ChatPage