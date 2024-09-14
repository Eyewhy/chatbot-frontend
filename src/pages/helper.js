import React, { useMemo, useState, useEffect } from "react";

import Table from "../components/table";

import { helperRequest } from "../api/get";
import { uploadHelper, deleteHelper } from "../api/others";

function HelperPage ( {setActivePage }) {
    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
            Cell: props => <a href={`#helper/${props.value}`}>{props.value}</a>
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
        },
        {
            Header: "Delete",
            accessor: "biodata",
            Cell: props => <button class="btn btn-outline-danger" onClick={(e) => {
                deleteButton(props.row.original.id);
            }}>Delete</button>
        }
    ],[]);

    const [data, setData] = useState([]);
    const [state, setState] = useState(false);

    useEffect(() => {
        setActivePage("helper");
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
            <div class="d-flex justify-content-between">
                <span class="lead m-2">Helper Info</span>
                <div class="d-flex align-items-end">
                    <div class="input-group">
                        <input type="file" class="form-control" id="inputGroup" onChange={handleFileChange}/>
                        <label class="btn btn-success input-group-text" for="inputGroup">Upload Biodata</label>
                    </div>    
                </div>
            </div>

            
            <Table columns={columns} data={data} />
        </>
    )
}

export default HelperPage