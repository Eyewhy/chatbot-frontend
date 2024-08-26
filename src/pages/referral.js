import Navbar from "../components/navbar"
import { referralRequest } from "../api/get";
import React, { useMemo, useState, useEffect } from "react";
import Table from "../components/table";

function ReferralPage() {
    const columns = useMemo(() => [
        {
            Header: "User",
            accessor: "username",
            Cell: (props) => (<a href={`/chats/${(props.row.original.chatbot_user)}`}>{props.value}</a>)
        },
        {
            Header: "Helper IDs",
            accessor: "helper",
            Cell: (props) => {
                return props.value.map(id => (
                    <span>
                        <a key={id} href={"/helper/" + id}>{id}</a>&ensp;
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
        }
    ],[]);

    const [data, setData] = useState([]);
    useEffect(() => {( async () => {
            let data = await referralRequest();
            console.log(data);
            setData(data);
        })();
    }, [])
    return (
        <>
            <Navbar active="referral"/>
            <p class="lead m-2">Referrals</p>
            <Table columns={columns} data={data} />
        </>
    )
}

export default ReferralPage