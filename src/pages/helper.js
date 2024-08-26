import Navbar from "../components/navbar"
import { helperRequest } from "../api/get";
import React, { useMemo, useState, useEffect } from "react";
import Table from "../components/table";

function HelperPage () {
    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
            Cell: props => <a href={`/helper/${props.value}`}>{props.value}</a>
        },
        {
            Header: "Name",
            accessor: "personal_info_name",
        },
        {
            Header: "Nationality",
            accessor: "personal_info_nationality"
        },
        {
            Header: "File Uploaded",
            accessor: "time",
            Cell: props => <a href={props.row.original.biodata}>{props.value}</a>
        }
    ],[]);

    const [data, setData] = useState([]);
    useEffect(() => {( async () => {
            let data = await helperRequest();
            console.log("data");
            console.log(data);
            setData(data);
        })();
    }, [])
    return (
        <>
            <Navbar active="Helper"/>
            <p class="lead m-2">Helper Info</p>
            <Table columns={columns} data={data} />
        </>
    )
}

export default HelperPage