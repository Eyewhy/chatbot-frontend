import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { SkillToggle, BooleanToggle, TextField, NumberField, OptionField } from "../../components/helperComponents";

import { Button, Typography, Box } from "@mui/material";
import { Header } from "../../components/mui";
import { FormUploadButton } from "../../components/formComponents";

import { helperRequest } from "../../api/get";
import { updateHelper, deleteHelper,uploadHelperImage } from "../../api/others";
import { timeAgo } from "../../services/timeAgo";

function HelperDetail () {
    const [data, setData] = useState({});
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

    const save = () => { updateHelper(id, data).then((res) => {
        if (res !== 'error') setState(!state);
    }); }

    const deleteButton = () => { deleteHelper(id).then((res) => {
        if (res !== 'error') navigate ('/helper');
    }); };

    const setNewData = (accessor, value) => {
        data[accessor] = value;
        console.log(data);
        setData(data);
    }

    const handleFileChange = (event) => {
        if (!event.target.files) return;
        uploadHelperImage(id, event.target.files[0]).then((res) => {
            if (res !== 'error') setState(!state);
        });
    }

    return (
        <>
            <Header text={`${data['personal_info_name']} 's biodata`} render={
                <>
                    <Typography>Uploaded {otherData['time']}</Typography>
                    <Button variant="contained" color="info" href={otherData['biodata']}>View Biodata</Button>
                    <Button variant="contained" color="error" onClick={deleteButton}>Delete</Button>
                    <Button variant="contained" color="success" onClick={save}>Save</Button>  
                </>
            } />
            <Box sx={{
                display:'flex'
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                }}>
                    <Box component='img' src={data['image']} sx={{height:'300px', width:'200px'}}/>
                    <FormUploadButton onChange={handleFileChange} text="Change Image"/>
                </Box>    
            </Box>
            
            <table class="table">
                <tbody>
                    
                    <tr><th>Personal Information</th></tr>
                    <tr>
                        <TextField label="Name" data={data} setData={setNewData} accessor="personal_info_name" />
                        <TextField label="Reference" data={data} setData={setNewData} accessor="personal_info_ref" />
                    </tr>
                    <tr>
                        <OptionField label="Type (availability)" data={data} setData={setNewData} accessor="personal_info_type" options={['new', 'advance_placement_scheme', 'transfer', 'ex-singapore']}/>
                        <OptionField label="Nationality" data={data} setData={setNewData} accessor="personal_info_nationality" options={["filipino", "indonesian", "myanmarese", "indian", "sri lankan", "bangladeshi", "cambodian", "malaysian", "thai", "vietnamese"]}/>
                    </tr>
                    <tr>
                        <TextField label="Height" data={data} setData={setNewData} accessor="personal_info_height" />
                        <TextField label="Weight" data={data} setData={setNewData} accessor="personal_info_weight" />
                    </tr>
                    <tr>
                        <TextField label="Date of Birth" data={data} setData={setNewData} accessor="personal_info_date_of_birth" />
                        <TextField label="Birth State" data={data} setData={setNewData} accessor="personal_info_birth_state" />
                    </tr>
                    <tr>
                        <TextField label="Religion" data={data} setData={setNewData} accessor="personal_info_religion" />
                        <TextField label="Ethnic Group" data={data} setData={setNewData} accessor="personal_info_ethnic_group" />
                    </tr>

                    <tr><th>Education</th></tr>
                    <tr>
                        <BooleanToggle label="Formal Education" data={data} setData={setNewData} accessor="education_formal_education" />
                        <TextField label="Highest Level" data={data} setData={setNewData} accessor="education_highest_education_level" />
                    </tr>

                    <tr><th>Family</th></tr>
                    <tr>
                        <TextField label="Siblings" data={data} setData={setNewData} accessor="family_siblings" />
                        <td/><td/>
                    </tr>
                    <tr>
                        <TextField label="Marital Status" data={data} setData={setNewData} accessor="family_marital_status_status" />
                        <TextField label="Husband's Occupation" data={data} setData={setNewData} accessor="family_marital_status_husband_occupation" />
                    </tr>
                    <tr>
                        <NumberField label="Children" data={data} setData={setNewData} accessor="family_children_number" />
                        <TextField label="Child Details" data={data} setData={setNewData} accessor="family_children_details" />
                    </tr>

                    <tr><th>Salary</th></tr>
                    <tr>
                        <NumberField label="Monthly Salary (SGD)" data={data} setData={setNewData} accessor="salary_monthly_salary" />
                        <NumberField label="Placement Fee (SGD)" data={data} setData={setNewData} accessor="salary_placement_fee" />
                    </tr>
                    <tr>
                        <NumberField label="Rest Days/Month" data={data} setData={setNewData} accessor="salary_rest_days_per_month_total" />
                        <TextField label="Rest Day Compensation Fee" data={data} setData={setNewData} accessor="salary_rest_days_per_month_compensate_fee" />
                    </tr>
                    <tr>
                        <TextField label="Reason" data={data} setData={setNewData} accessor="salary_reason" />
                        <td/><td/>
                    </tr>

                    <tr><th>Skills</th></tr>
                    <tr>
                        <TextField label="Language Abilities" data={data} setData={setNewData} accessor="skills_spoken_language_abilities" />
                        <TextField label="Language Categories" data={data} setData={setNewData} accessor="skills_spoken_language_categories" />
                    </tr>
                    <tr>
                        <SkillToggle label="Infant & Children Care" data={data} setData={setNewData} accessor="skills_care_of_infants_children"/>
                        <SkillToggle label="Elderly Care" data={data} setData={setNewData} accessor="skills_care_of_elderly"/>

                    </tr>
                    <tr>
                        <SkillToggle label="Disabled Care" data={data} setData={setNewData} accessor="skills_care_of_disabled"/>
                        <SkillToggle label="Pet Care" data={data} setData={setNewData} accessor="skills_care_of_pets"/>
                    </tr>
                    <tr>
                        <SkillToggle label="Cooking" data={data} setData={setNewData} accessor="skills_cooking"/>
                        <TextField label="Cuisine" data={data} setData={setNewData} accessor="skills_cooking_cuisine" />
                    </tr>
                    <tr>
                        <SkillToggle label="General Housework" data={data} setData={setNewData} accessor="skills_general_housework"/>
                        <TextField label="Others" data={data} setData={setNewData} accessor="skills_other_skills" />
                    </tr>

                    <tr><th>Employment (Singapore)</th></tr>
                    <tr>
                        <BooleanToggle label="Previous Work Experience" data={data} setData={setNewData} accessor="employment_history_singapore_previous_work_experience" />
                        <TextField label="Work Permit Number" data={data} setData={setNewData} accessor="employment_history_singapore_work_permit_no" />
                    </tr>
                    <tr><th>Employment (Overseas)</th></tr>
                    <tr>
                        <TextField label="Date" data={data} setData={setNewData} accessor="employment_history_overseas_date" />
                        <TextField label="Country" data={data} setData={setNewData} accessor="employment_history_overseas_country" />
                    </tr>
                    <tr>
                        <TextField label="Employer" data={data} setData={setNewData} accessor="employment_history_overseas_employer" />
                        <TextField label="Work Duties" data={data} setData={setNewData} accessor="employment_history_overseas_work_duties" />
                    </tr>
                    <tr>
                        <TextField label="Feedback from Employers" data={data} setData={setNewData} accessor="employment_history_feedback_from_previous_employers" />
                        <td/><td/>
                    </tr>

                    <tr><th>Illness</th></tr>
                    <tr>
                        <TextField label="Dietary Restrictions" data={data} setData={setNewData} accessor="medical_history_dietary_restrictions" />
                        <TextField label="Food Handling Preferences" data={data} setData={setNewData} accessor="medical_history_food_handling_preferences" />
                    </tr>
                    <tr>
                        <BooleanToggle label="Asthma" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_asthma" />
                        <BooleanToggle label="Diabetes" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_diabetes" />
                    </tr>
                    <tr>
                        <BooleanToggle label="Epilepsy" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_epilepsy" />
                        <BooleanToggle label="Heart Disease" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_heart_disease" />
                    </tr>
                    <tr>
                        <BooleanToggle label="Hypertension" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_hypertension" />
                        <BooleanToggle label="Malaria" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_malaria" />
                    </tr>
                    <tr>
                        <BooleanToggle label="Tuberculosis" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_tuberculosis" />
                        <BooleanToggle label="Operations" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_operations" />
                    </tr>
                    <tr>
                        <BooleanToggle label="Mental Illness" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_mental_illness" />
                        <TextField label="Physical Disabilities" data={data} setData={setNewData} accessor="medical_history_physical_disabilities" />
                    </tr>

                    <tr><th>Interview</th></tr>
                    <tr>
                        <BooleanToggle label="By Phone" data={data} setData={setNewData} accessor="availability_for_interview_by_phone" />
                        <BooleanToggle label="By Video Conference" data={data} setData={setNewData} accessor="availability_for_interview_by_videoconference" />
                    </tr>
                    <tr>
                        <BooleanToggle label="In Person" data={data} setData={setNewData} accessor="availability_for_interview_in_person" />
                        <td/><td/>
                    </tr>

                    <tr><th>Remarks</th></tr>
                    <tr>
                        <TextField label="Preference for Rest Day" data={data} setData={setNewData} accessor="remarks_preference_for_rest_day" />
                        <TextField label="Addtional Remarks" data={data} setData={setNewData} accessor="remarks_additional_remarks" />
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default HelperDetail