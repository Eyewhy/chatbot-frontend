import Navbar from "../components/navbar"
import { qnaRequest, refreshQnaRequest } from "../api/get";
import React, { useMemo, useState, useEffect } from "react";
import Table from "../components/table";

function QnaPage () {
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "__str__",
            Cell: props => <a href={props.row.original.file}>{props.value}</a>
        },
        {
            Header: "Uploaded",
            accessor: "time"
        }
    ],[]);

    const [data, setData] = useState([]);
    useEffect(() => {( async () => {
            let data = await qnaRequest();
            console.log(data);
            setData(data);
        })();
    }, [])

    
    return (
        <>
            <Navbar active="qna"/>
            <div class="d-flex">
                <p class="lead m-2">Q&A Documents</p>
                <button class="btn btn-outline-success mx-2" onClick={refreshQnaRequest}>Update Documents</button>
            </div>
                
            <Table columns={columns} data={data} />
        </>
    )
}

export default QnaPage