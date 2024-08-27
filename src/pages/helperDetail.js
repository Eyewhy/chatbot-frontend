import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Field from "../components/field";
import { helperRequest } from "../api/get";
import { updateHelper } from "../api/post";
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
        delete data['biodata'];
        delete data['id'];
        delete data['time'];
        delete data['organization'];
        delete data['scanned'];
        return newData
    }

    function save() {
        console.log(changes);
        updateHelper(id, changes)
    }


    return (
        <>
            <div class="d-flex p-2 justify-content-between align-items-center">
                <h2>Helper ID {otherData['id']}</h2>
                <a class="lead btn btn-secondary" href={otherData['biodata']}>Biodata</a>
                <span>Uploaded at {otherData['time']}</span>
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