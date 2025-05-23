import React, { useMemo, useState, useEffect } from "react";

import Table from "../../components/table";

import { Header } from "../../components/mui"
import { Link, Button } from "@mui/material";

import { chatUserRequest, deleteChatbotUser } from "../../api/admin/chat";

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
            await chatUserRequest().then((data) => {
                formatChatList(data);
                console.log(data);
                setData(data);
            });
        })();
    },[state])

    const deleteButton = (id) => {
        deleteChatbotUser(id).then((res) => {
            if (res !== 'error') setState(!state);
        })
    }

    return (
        <>
            <Header text="Recently Active Users"/>
            <Table columns={columns} data={data} />
        </>
    )
}

export default ChatPage