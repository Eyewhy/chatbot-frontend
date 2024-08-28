import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Table from "../components/table";

import { chatRequest } from "../api/get";
import { deleteChatbotUser } from "../api/others";

function ChatDetail () {
    const columns = useMemo(() => [
        {
            Header: "From",
            accessor: "human_message",
            Cell: (props) => ((props.value) ? 
                <span class="text-success">User</span>
            : 
                <span class="text-primary">Bot</span>
            )
        },
        {
            Header: "Text",
            accessor: "text",
        },
        {
            Header: "Time",
            accessor: "time"
        }
    ],[]);

    const [data, setData] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        ( async () => {
            let data = await chatRequest(id);
            console.log(data);
            setData(data);
        })();
    },[]);
    
    const deleteButton = () => {
        deleteChatbotUser(id).then((res) => {
            if (res !== 'error') navigate("/chats");
        })
    }

    return (
        <>

            <div class="d-flex p-2 justify-content-between align-items-center">
                <span class="lead">Chat for User ID {id}</span>
                <button class="btn btn-danger px-4" onClick={deleteButton}>Delete</button>
            </div>
            
            <Table columns={columns} data={data} />
        </>
    )
}

export default ChatDetail