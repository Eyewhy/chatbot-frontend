import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../components/table";
import { Header } from "../../components/mui";
import { Link, Button, Box } from "@mui/material";

import { referralRequest } from "../../api/admin/get";
import { deleteReferral } from "../../api/admin/others";

function ReferralPage() {
    const columns = useMemo(() => [
        {
            Header: "User",
            accessor: "username",
            Cell: (props) => (<Link href={`#/admin/chats/${(props.row.original.chatbot_user)}`}>{props.value}</Link>)
        },
        {
            Header: "Helper IDs",
            accessor: "helper",
            Cell: (props) => {
                return props.value.map(id => (
                    <Box sx={{mr:1}} key={id}>
                        <Link href={"#/admin/helper/" + id}>{id}</Link>&ensp;
                    </Box>
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
            Cell: props => <Button variant="outlined" color="error" onClick={(e) => {
                deleteButton(props.value);
            }}>Delete</Button>
        }
    ],[]);

    const [data, setData] = useState([]);
    const [state, setState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        ( async () => {
            let data = await referralRequest();
            if (data === 'error') navigate('/admin/join');
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
            <Header text="Referrals"/>
            <Table columns={columns} data={data} />
        </>
    )
}

export default ReferralPage