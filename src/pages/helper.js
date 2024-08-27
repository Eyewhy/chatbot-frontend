import React, { useMemo, useState, useEffect } from "react";

import Table from "../components/table";

import { helperRequest } from "../api/get";
import { uploadHelper } from "../api/others";

function HelperPage ( {setActivePage }) {
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
    useEffect(() => {
        setActivePage("helper");
        ( async () => {
            let data = await helperRequest();
            console.log("data");
            console.log(data);
            setData(data);
        })();
    },[])

    const handleFileChange = (event) => {
        if (!event.target.files) return;
        uploadHelper(event.target.files[0]);
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