import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../components/table";

import { referralRequest } from "../api/get";
import { deleteReferral } from "../api/others";

function ReferralPage( {setActivePage} ) {
    const columns = useMemo(() => [
        {
            Header: "User",
            accessor: "username",
            Cell: (props) => (<a href={`#/chats/${(props.row.original.chatbot_user)}`}>{props.value}</a>)
        },
        {
            Header: "Helper IDs",
            accessor: "helper",
            Cell: (props) => {
                return props.value.map(id => (
                    <span>
                        <a key={id} href={"#/helper/" + id}>{id}</a>&ensp;
                    </span>
                )
            )}
        },
        {
            Header: "Contact Method",
            accessor: "contact_method"
        },
        {
            Header: "Summary",
            accessor: "summary"
        },
        {
            Header: "Time",
            accessor: "time"
        },
        {
            Header: "State",
            accessor: "state"
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
    const navigate = useNavigate();

    useEffect(() => {
        setActivePage('referral');
        ( async () => {
            let data = await referralRequest();
            if (data === 'error') navigate('/join');
            console.log(data);
            setData(data);
        })();
    },[state]);
    
    const deleteButton = (id) => {
        deleteReferral(id).then((res) => {
            if (res !== 'error') setState(!state);
        })
    }

    return (
        <>
            <p class="lead m-2">Referrals</p>
            <Table columns={columns} data={data} />
        </>
    )
}

export default ReferralPage