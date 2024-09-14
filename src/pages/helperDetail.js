import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Field from "../components/field";
import { helperRequest } from "../api/get";
import { updateHelper, deleteHelper } from "../api/others";
import keyToDisplay from "../services/keyToDisplay";
import { timeAgo } from "../services/timeAgo";

function HelperDetail () {
    const [data, setData] = useState({});
    const [changes, setChanges] = useState({});
    const [otherData, setOtherData] = useState({});
    const [state, setState] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {( async () => {
            let data = await helperRequest(id);
            setOtherData(splitData(data));
            setData(data);
        })();
    }, [state]);

    const splitData = (data) => {
        timeAgo(data);
        let newData = {
            'biodata': data['biodata'],
            'id': data['id'],
            'time': data['time'],
        };

        let deleteFields = ['biodata', 'id', 'time', 'organization', 'scanned'];
        deleteFields.forEach(item => {
            delete data[item];
        });

        return newData;
    }

    const save = () => { updateHelper(id, changes).then((res) => {
        if (res !== 'error') setState(!state);
    }); }

    const deleteButton = () => { deleteHelper(id).then((res) => {
        if (res !== 'error') navigate ('/helper');
    }); };

    return (
        <>
            <div class="d-flex p-2 justify-content-between align-items-center">
                <span class="lead">{data['personal_info_name']}'s biodata</span>
                <span>Uploaded {otherData['time']}</span>
                <a class="lead btn btn-primary" href={otherData['biodata']}>View Biodata</a>
                <button class="btn btn-danger px-4" onClick={deleteButton}>Delete</button>
                <button class="btn btn-success px-4" onClick={save}>Save</button>
            </div>
            
            <table class="table">
                <tbody>
                    { Object.entries(data).map(([key, value]) => (
                        <Field 
                            changes={changes}
                            setChanges={setChanges}
                            key={key}
                            keyy={key}
                            val={value}
                            displayName={keyToDisplay[key]}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default HelperDetail