import { useState } from "react"

function ToggleButton( {accessor, label, data, setData} ) {
    const [isTrue, setTrue] = useState(data[accessor]);
    return (
        <button class={((data[accessor]) ? "btn-primary": "btn-outline-primary") + " btn px-2 py-1 me-3"} onClick={() => {
            setData(accessor, !data[accessor]);
            setTrue(!isTrue);
        }}>
            {label}
        </button>
    )
}

function SkillToggle ( {label, accessor, data, setData} ) {
    return (
        <>
            <td class="lead">{label}</td>
            <td>
                <ToggleButton accessor={accessor+"_willing"} label="Willing" setData={setData} data={data}/>
                <ToggleButton accessor={accessor+"_experience"} label="Experience" setData={setData} data={data}/>    
            </td>
        </>
    )
}

function BooleanToggle ( {label, accessor, data, setData} ) {
    return (
        <>
            <td class="lead">{label}</td>
            <td>
                <ToggleButton accessor={accessor} label="✓" setData={setData} data={data}/>
            </td>
        </>
    )
}

function TextField ( {label, accessor, data, setData} ) {
    return (
        <>
            <td class="lead">{label}</td>
            <td>
                <input defaultValue={data[accessor]} onChange={(e) => {
                    setData(accessor, e.target.value);
                }}/>
            </td>
        </>
    )
}


function NumberField ( {label, accessor, data, setData} ) {
    return (
        <>
            <td class="lead">{label}</td>
            <td>
                <input type="number" defaultValue={data[accessor]} onChange={(e) => {
                    setData(accessor, e.target.value);
                }}/>
            </td>
        </>
    )
}

export { SkillToggle, BooleanToggle, TextField, NumberField }