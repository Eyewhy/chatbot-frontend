import React, { useMemo, useState, useEffect } from "react";

import Table from "../../components/table";
import { Link, Button } from "@mui/material";
import Header from "../../components/header";
import { FormUploadButton } from "../../components/formComponents";

import { qnaRequest, refreshQnaRequest } from "../../api/get";
import { uploadQna, deleteQna } from "../../api/others";

function QnaPage () {
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "__str__",
            Cell: props => <Link href={props.row.original.file}>{props.value}</Link>
        },
        {
            Header: "Uploaded",
            accessor: "time"
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
            let data = await qnaRequest();
            console.log(data);
            setData(data);
        })();
    },[state])

    const handleFileChange = (event) => {
        if (!event.target.files) return;
        uploadQna(event.target.files[0]).then((res) => {
            if (res !== 'error') setState(!state);
        });
    }

    const deleteButton = (id) => {
        deleteQna(id).then((res) => {
            if (res !== 'error') setState(!state);
        })
    }

    return (
        <>
            <Header text="Q&A Documents" render={
                <>
                    <Button variant="contained" color="success" onClick={refreshQnaRequest}>Update Documents</Button>
                    <FormUploadButton onChange={handleFileChange} text="Upload Document" />
                </>
            }/>
            <Table columns={columns} data={data} />
        </>
    )
}

export default QnaPage