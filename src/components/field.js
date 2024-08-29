import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

/**
 * 
 * @param {*} props changes, setChanges, key, value, type, displayName
 * @returns 
 */
function Field( {changes, setChanges, keyy, val, displayName} ) {
    const {
        register,
        handleSubmit,
        formState: {errors, ...formState}
    } = useForm();

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(String(val));
    const [datalist, setDatalist] = useState([])

    const onSubmit = (data) => {
        // BOOL
        let newVal = typecast(data.text, val);

        let newChanges = {...changes};
        newChanges[keyy] = newVal;

        setChanges(newChanges);
        setEdit(false);
        setValue(String(newVal));
    }

    useEffect(() => {
        getDatalist(keyy,val);
    },[])

    const getDatalist = (keyy, val) => {
        if (typeof(val) === 'boolean') return setDatalist(['true', 'false']);
        if (keyy === 'availability') return setDatalist(['overseas', 'advance_placement_scheme', 'transfer']);
        return setDatalist([]);
    }   

    const typecast = (newVal, val) => {
        if (typeof(val) === 'boolean') return (newVal.toLowerCase() === "true") ? true : false;
        if (typeof(val) === 'number') return Number(newVal);
        return newVal;
    }

    const editButton = () => {
        setEdit(true);
        console.log(keyy);
        console.log(datalist.length);
    }

    return (
        <tr>
            <td class="lead w-25">{displayName}</td>
            {(edit) ? 
                <td><form class="d-flex justify-content-between" onSubmit={handleSubmit(onSubmit)}>
                    {(datalist.length === 0) ?
                        <input type="text" class="w-75" defaultValue={value} {
                            ...register("text", {required:false})} />
                    :
                        <> <input type="text" class="w-75" list={keyy} defaultValue={value} {
                            ...register("text", {required:false})} />
                            {(datalist.length === 0) ? "" :
                                <datalist id={keyy}>
                                    { datalist.map( option => {
                                        return <option value={option} key={option}/>
                                    })}
                                </datalist>
                            }
                        </>
                    }
                    <input type="submit" class="btn btn-secondary" value="Change" />
                </form></td>
            :
                <td class="d-flex justify-content-between align-items-center">
                    <span>{value}</span>
                    <button class="btn btn-outline-secondary px-4" onClick={editButton}>Edit</button>
                </td>
            }
        </tr>
            
    )
}

export default Field;