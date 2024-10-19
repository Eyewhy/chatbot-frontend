import { TableContainer, TableBody, TableRow, TableCell, Table, Paper, TableHead} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function InfoTable ({rows, data}) {
    return <TableContainer component={Paper}>
        <Table size="small">
            <TableBody>
            {rows.map((item) => {
                return <TableRow>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell>{data[item[1]]}</TableCell>
                </TableRow>
            })}
            </TableBody>
        </Table>
    </TableContainer>
}

function MedicalTable ({rows, data}) {
    return <TableContainer component={Paper}>
        <Table size="small">
            <TableBody>
            {rows.map((item) => {
                return <TableRow>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell>{data[item[1]] ? 
                        <CheckIcon color="success" /> 
                    : 
                        <CloseIcon color="error" />
                    }</TableCell>
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
                    <TableCell>Skill</TableCell>
                    <TableCell>Willing</TableCell>
                    <TableCell>Experience</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {genericSkills.map((skill) => {
                return <TableRow>
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

export { InfoTable, SkillTable, MedicalTable }