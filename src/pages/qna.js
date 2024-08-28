import React, { useMemo, useState, useEffect } from "react";

import Table from "../components/table";

import { qnaRequest, refreshQnaRequest } from "../api/get";
import { uploadQna, deleteQna } from "../api/others";

function QnaPage ( {setActivePage} ) {
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "__str__",
            Cell: props => <a href={props.row.original.file}>{props.value}</a>
        },
        {
            Header: "Uploaded",
            accessor: "time"
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
        setActivePage("qna");
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
            <div class="d-flex justify-content-between">
                <p class="lead m-2">Q&A Documents</p>
                <button class="btn btn-info mx-2" onClick={refreshQnaRequest}>Update Documents</button>
                <div class="d-flex align-items-end">
                    <div class="input-group">
                        <input type="file" class="form-control" id="inputGroup" onChange={handleFileChange}/>
                        <label class="btn btn-success input-group-text" for="inputGroup">Upload Document</label>
                    </div>    
                </div>
                

            </div>
                
            <Table columns={columns} data={data} />
        </>
    )
}

export default QnaPage