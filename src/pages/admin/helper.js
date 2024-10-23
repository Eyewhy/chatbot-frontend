import React, { useMemo, useState, useEffect } from "react";

import Table from "../../components/table";
import { Header } from "../../components/mui";
import { FormUploadButton } from "../../components/formComponents";
import { Link, Button } from "@mui/material";

import { helperRequest } from "../../api/get";
import { uploadHelper, deleteHelper } from "../../api/others";

function HelperPage () {
    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
            Cell: props => <Link href={`#/helper/${props.value}`}>{props.value}</Link>
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
            Cell: props => <Link href={props.row.original.biodata}>{props.value}</Link>
        },
        {
            Header: "Delete",
            accessor: "biodata",
            Cell: props => <Button variant="outlined" color="error" onClick={(e) => {
                deleteButton(props.row.original.id);
            }}>Delete</Button>
        }
    ],[]);

    const [data, setData] = useState([]);
    const [state, setState] = useState(false);

    useEffect(() => {
        ( async () => {
            let data = await helperRequest();
            console.log(data);
            setData(data);
        })();
    },[state]);

    const deleteButton = (id) => { deleteHelper(id).then((res) => {
        if (res !== 'error') setState(!state);
    }); };


    const handleFileChange = (event) => {
        if (!event.target.files) return;
        uploadHelper(event.target.files[0]).then((res) => {
            if (res !== 'error') setState(!state);
        });
    }
    
    return (
        <>
            <Header text="Helper Info" render={
                <FormUploadButton onChange={handleFileChange} text="Upload Biodata"/>
            } />
            <Table columns={columns} data={data} />
        </>
    )
}

export default HelperPage