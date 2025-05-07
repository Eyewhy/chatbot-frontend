import React, { useMemo, useState, useEffect } from "react";

import Table from "../../components/table";
import { Header } from "../../components/mui";
import { FormUploadButton } from "../../components/formComponents";
import { Link, Button } from "@mui/material";

import { helperRequest, uploadHelper, deleteHelper, toggleHelperVisibility } from "../../api/admin/helper";

function HelperPage () {
    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
            Cell: props => <Link href={`#/admin/helper/${props.value}`}>{props.value}</Link>
        },
        {
            Header: "Reference No.",
            accessor: "personal_info_ref",
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
            Header: "Visibility",
            accessor: "visibility",
            Cell: props => <Button variant="outlined" color={props.value ? "success": "warning"} onClick={(e) => {
                visibilityButton(props.row.original.id, props.value);
            }}>{props.value ? "Yes": "No"}</Button>
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

    async function getData() {
        let data = await helperRequest();
        console.log(data);
        setData(data);
    }

    useEffect(() => {
        getData();
    },[]);

    const deleteButton = (id) => { deleteHelper(id).then((res) => {
        if (res !== 'error') setTimeout(getData, 200);
    }); };

    const visibilityButton = (id, visibility) => {
        console.log(id, visibility)
        toggleHelperVisibility(id, !visibility).then((res) => {
            if (res !== 'error') setTimeout(getData, 200);
        })
    }

    const handleFileChange = (event) => {
        if (!event.target.files) return;
        uploadHelper(event.target.files[0]).then((res) => {
            if (res !== 'error') setTimeout(getData, 200);
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