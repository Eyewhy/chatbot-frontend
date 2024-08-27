import React, { useMemo, useState, useEffect } from "react";

import Table from "../components/table";

import { chatUserRequest } from "../api/get";

function ChatPage ( {setActivePage} ) {
    const columns = useMemo(() => [
        {
            Header: "Username",
            accessor: "username",
            Cell: props => <a href={`/chats/${props.row.original.id}`}>{props.value}</a>
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
        }
    ],[]);

    const [data, setData] = useState([]);
    useEffect(() => {
        setActivePage("chats");
        ( async () => {
            let data = await chatUserRequest();
            console.log(data);
            setData(data);
        })();
    },[])
    return (
        <>
            <p class="lead m-2">Recently Active Users</p>
            <Table columns={columns} data={data} />
        </>
    )
}

export default ChatPage