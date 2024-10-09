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
    );
}

function SkillToggle ( {label, accessor, data, setData} ) {
    return (<>
        <td class="lead">{label}</td>
        <td>
            <ToggleButton accessor={accessor+"_willing"} label="Willing" setData={setData} data={data}/>
            <ToggleButton accessor={accessor+"_experience"} label="Experience" setData={setData} data={data}/>    
        </td>
    </>);
}

function BooleanToggle ( {label, accessor, data, setData} ) {
    return (<>
        <td class="lead">{label}</td>
        <td>
            <ToggleButton accessor={accessor} label="✓" setData={setData} data={data}/>
        </td>
    </>);
}

function TextField ( {label, accessor, data, setData} ) {
    return (<>
        <td class="lead">{label}</td>
        <td>
            <input class="form-control" defaultValue={data[accessor]} onChange={(e) => {
                setData(accessor, e.target.value);
            }}/>
        </td>
    </>);
}


function NumberField ( {label, accessor, data, setData} ) {
    return (<>
        <td class="lead">{label}</td>
        <td>
            <input class="form-control" type="number" defaultValue={data[accessor]} onChange={(e) => {
                setData(accessor, e.target.value);
            }}/>
        </td>
    </>);
}

function OptionField ( {label, accessor, data, setData, options} ) {
    const [option, setOption] = useState(data[accessor])

    return (<>
        <td class="lead">{label}</td>
        <td>
            <select class="form-select" value={data[accessor]} onChange={(e) => {
                setData(accessor, e.target.value);
                setOption(e.target.value);
            }}>
                {options.map((item) => {
                    return <option key={item}>{item}</option>
                })}
            </select>
        </td>
        
    </>);
}

export { SkillToggle, BooleanToggle, TextField, NumberField, OptionField }