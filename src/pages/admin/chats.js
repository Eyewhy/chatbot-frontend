import React, { useMemo, useState, useEffect } from "react";

import Table from "../../components/table";

import { chatUserRequest } from "../../api/get";
import { deleteChatbotUser } from "../../api/others";

function ChatPage ( {setActivePage} ) {
    const columns = useMemo(() => [
        {
            Header: "Username",
            accessor: "username",
            Cell: props => <a href={`#/chats/${props.row.original.id}`}>{props.value}</a>
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
            Cell: props => <button class="btn btn-outline-danger" onClick={(e) => {
                deleteButton(props.value);
            }}>Delete</button>
        }
    ],[]);

    const [data, setData] = useState([]);
    const [state, setState] = useState(false);

    useEffect(() => {
        setActivePage("chats");
        ( async () => {
            let data = await chatUserRequest();
            console.log(data);
            setData(data);
        })();
    },[state])

    const deleteButton = (id) => {
        deleteChatbotUser(id).then((res) => {
            if (res !== 'error') setState(!state);
        })
    }

    return (
        <>
            <p class="lead m-2">Recently Active Users</p>
            <Table columns={columns} data={data} />
        </>
    )
}

export default ChatPage