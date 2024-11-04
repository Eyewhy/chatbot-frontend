import { TableContainer, TableBody, TableRow, TableCell, Table, Paper, TableHead, Link } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function InfoTable ({rows, data, width}) {
    return <TableContainer component={Paper}>
        <Table size="small">
            <TableBody>
            {rows.map((item) => {
                return <TableRow key={item[0]}>
                    <TableCell width={width}>{item[0]}</TableCell>
                    <TableCell width={width}>{data[item[1]]}</TableCell>
                </TableRow>
            })}
            </TableBody>
        </Table>
    </TableContainer>
}

function MedicalTable ({ data}) {
    const medicalTable = [
        ['Allergies', 'medical_history_allergies',
        'Mental Illness','medical_history_past_and_existing_illnesses_mental_illness'],
        ['Operations', 'medical_history_past_and_existing_illnesses_operations',
        'Epilepsy','medical_history_past_and_existing_illnesses_epilepsy'],
        ['Asthma', 'medical_history_past_and_existing_illnesses_asthma',
        'Diabetes', 'medical_history_past_and_existing_illnesses_diabetes'],
        ['Hypertension', 'medical_history_past_and_existing_illnesses_hypertension',
        'Tuberculosis', 'medical_history_past_and_existing_illnesses_tuberculosis'],
        ['Heart Disease', 'medical_history_past_and_existing_illnesses_heart_disease',
        'Malaria', 'medical_history_past_and_existing_illnesses_malaria'],
    ]

    return <TableContainer component={Paper}>
        <Table size="small">
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2}>Food Handling Preferences</TableCell>
                    <TableCell colSpan={2}>{data['medical_history_food_handling_preferences'] ? data['medical_history_food_handling_preferences'] : 'NIL'}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Dietary Restrictions</TableCell>
                    <TableCell colSpan={2}>{data['medical_history_dietary_restrictions'] ? data['medical_history_dietary_restrictions'] : 'NIL'}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Physical Disabilities</TableCell>
                    <TableCell colSpan={2}>{data['medical_history_physical_disabilities'] ? data['medical_history_physical_disabilities'] : 'NIL'}</TableCell>
                </TableRow>
            {medicalTable.map((item) => {
                return <TableRow key={item[0]}>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell align='right'>{data[item[1]] ? 
                        <CheckIcon color="success" /> 
                    : 
                        <CloseIcon color="error" />
                    }</TableCell>
                    <TableCell>{item[2]}</TableCell>
                    <TableCell align='right'>{(item[3] === '') ? '' : (data[item[3]] ? 
                        <CheckIcon color="success" /> 
                    : 
                        <CloseIcon color="error" />
                    )}</TableCell>
                </TableRow>
            })}
            </TableBody>
        </Table>
    </TableContainer>
}

function SkillTable ({data}) {
    const genericSkills = [
        ['Infant/Children Care', 'care_of_infants_children'], 
        ['Elderly Care', 'care_of_elderly'],
        ['Disabled Care', 'care_of_disabled'], 
        ['Pet Care', 'care_of_pets'], 
        ['General Housework', 'general_housework'], 
        ['Cooking', 'cooking']
    ]
    return <TableContainer component={Paper}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell width='50%'>Skill</TableCell>
                    <TableCell width='25%'>Willing</TableCell>
                    <TableCell width='25%'>Experience</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {genericSkills.map((skill) => {
                return <TableRow key={skill[0]}>
                    <TableCell>{skill[0]}</TableCell>
                    <TableCell>{data[`skills_${skill[1]}_willing`] ? 
                        <CheckIcon color="success" /> 
                    : ""}</TableCell>
                    <TableCell>{data[`skills_${skill[1]}_experience`] ? 
                        <CheckIcon color="success" /> 
                    : ""}</TableCell>
                </TableRow>
            })}
                <TableRow>
                    <TableCell>Cuisine</TableCell>
                    <TableCell colSpan={2}>{data['skills_cooking_cuisine']}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Spoken Languages</TableCell>
                    <TableCell colSpan={2}>{data['skills_spoken_language_abilities']}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Other Skills</TableCell>
                    <TableCell colSpan={2}>{data['skills_other_skills']}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}

function AgencyTable ({data}) {
    const tableRows = [    
        ['Name', 'name'],
        ['Phone', 'contact_number'],
    ]

    return <TableContainer component={Paper}>
        <Table size="small">
            <TableBody>
            {tableRows.map((item) => {
                return <TableRow key={item[0]}>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell sx={{whiteSpace: 'pre-wrap'}}>{data[item[1]]}</TableCell>
                </TableRow>
            })}
            <TableRow>
                <TableCell>Website</TableCell>
                <TableCell><Link href={data['website']}>{data['name']}</Link></TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}

function AgencyAddressTable ({data}) {
    const addressTableRows = [
        ['Address', 'address'],
        ['Office Hours', 'office_hours'],
        ['Phone Number', 'contact_number'],
    ]

    return <TableContainer component={Paper}>
        <Table size="small">
            <TableBody>
            {addressTableRows.map((item) => {
                return <TableRow>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell sx={{whiteSpace: 'pre-wrap'}}>{data[item[1]]}</TableCell>
                </TableRow>
            })}
            <TableRow>
                <TableCell>Website</TableCell>
                <TableCell><Link href={data['website']}>{data['website']}</Link></TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}

export { InfoTable, SkillTable, MedicalTable, AgencyTable, AgencyAddressTable }