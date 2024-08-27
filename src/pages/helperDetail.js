import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Field from "../components/field";
import { helperRequest } from "../api/get";
import { updateHelper, deleteHelper } from "../api/others";
import keyToDisplay from "../services/keyToDisplay";

function HelperDetail () {
    const [data, setData] = useState({});
    const [changes, setChanges] = useState({});
    const [otherData, setOtherData] = useState({});

    const { id } = useParams();

    useEffect(() => {( async () => {
            let data = await helperRequest(id);
            setOtherData(splitData(data));
            setData(data);
        })();
    }, [id]);

    const splitData = (data) => {
        let newData = {
            'biodata': data['biodata'],
            'id': data['id'],
            'time': data['time']
        };

        let deleteFields = ['biodata', 'id', 'time', 'organization', 'scanned'];
        deleteFields.forEach(item => {
            delete data[item];
        });

        return newData;
    }

    const save = () => { console.log(changes); updateHelper(id, changes); }

    const deleteButton = () => { deleteHelper(id); };

    return (
        <>
            <div class="d-flex p-2 justify-content-between align-items-center">
                <h2>Helper ID {otherData['id']}</h2>
                <a class="lead btn btn-primary" href={otherData['biodata']}>Biodata</a>
                <span>Uploaded at {otherData['time']}</span>
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