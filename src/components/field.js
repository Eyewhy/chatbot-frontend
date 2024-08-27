import { useState } from "react";
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

    const onSubmit = (data) => {
        // BOOL
        let newVal = typecast(data.text);

        let newChanges = {...changes};
        newChanges[keyy] = newVal;

        setChanges(newChanges);
        setEdit(false);
        setValue(String(newVal));
    }

    function typecast(value) {
        if (typeof(val) === 'boolean') return (value.toLowerCase() === "true") ? true : false;
        if (typeof(val) === 'number') return Number(value);
        return value
    }

    const editButton = () => {
        setEdit(true);
        console.log(keyy);
    }

    return (
        <tr>
            <td class="lead w-25">{displayName}</td>
            {(edit) ? 
                <td><form class="d-flex justify-content-between" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" class="w-75" defaultValue={value} {
                        ...register("text", {required:false})}/> 
                    <input type="submit" class="btn btn-secondary" value="Change" />
                </form></td>
            :
                <td class="d-flex justify-content-between align-items-center">
                    <span>{value}</span>
                    <button class="btn btn-secondary px-4" onClick={editButton}>Edit</button>
                </td>
            }
        </tr>
            
    )
}

export default Field;