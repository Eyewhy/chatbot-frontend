import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { SkillToggle, BooleanToggle, TextInputField, NumberField, OptionField, Head } from "../../components/helperComponents";

import { Button, Typography, Box, TableContainer, Table, TableBody, TableRow, Paper } from "@mui/material";
import { FormUploadButton } from "../../components/formComponents";

import { helperRequest } from "../../api/admin/get";
import { updateHelper, deleteHelper,uploadHelperImage } from "../../api/admin/others";
import { timeAgo } from "../../services/format";

function HelperDetail () {
  const [data, setData] = useState({personal_info_type:'new', personal_info_nationality:'thai'});
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
      'image': data['image'],
      'blurred_image': data['blurred_image'],
    };

    let deleteFields = ['biodata', 'id', 'time', 'organization', 'scanned', 'image', 'blurred_image'];
    deleteFields.forEach(item => {
      delete data[item];
    });

    return newData;
  }

  const save = () => { updateHelper(id, data).then((res) => {
    if (res !== 'error') setState(!state);
  }); }

  const deleteButton = () => { deleteHelper(id).then((res) => {
    if (res !== 'error') navigate ('/admin/helper');
  }); };

  const setNewData = (accessor, value) => {
    data[accessor] = value;
    console.log(data);
    setData({...data});
  }

  const handleFileChange = (event) => {
    if (!event.target.files) return;
    uploadHelperImage(id, event.target.files[0]).then((res) => {
      if (res !== 'error') setState(!state);
    });
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      mt:2,
      gap: 2
    }}>
      
      <Box sx={{
        position: 'sticky',
        top:0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap:2,
        height:'90vh',
        width: '20%'
      }}>
        <Paper elevation={2} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap:2,
          p:2,
        }}>
          <Typography variant="h6">{data['personal_info_name']}</Typography>
          <Typography>Uploaded {otherData['time']}</Typography>
          <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
            <Box component='img' src={otherData['image']} sx={{height:'300px', width:'200px', alignSelf:'center'}}/>
            <FormUploadButton onChange={handleFileChange} text="Change Image"/>  
          </Box>
          

          <Button variant="outlined" color="info" href={otherData['biodata']}>View Biodata</Button>
          <Button variant="contained" color="success" onClick={save}>Save</Button>      
        </Paper>
        <Button variant="contained" color="error" onClick={deleteButton}>Delete</Button>
      </Box>
      
      <Box sx={{width:'65%'}}>
        <TableContainer><Table size='small'>
          <TableBody>
            <Head>Personal Information</Head>
            <TableRow>
              <TextInputField label="Name" data={data} setData={setNewData} accessor="personal_info_name" />
              <TextInputField label="Reference" data={data} setData={setNewData} accessor="personal_info_ref" />
            </TableRow>
            <TableRow>
              <OptionField label="Type (availability)" data={data} setData={setNewData} accessor="personal_info_type" options={['new', 'advance_placement_scheme', 'transfer', 'ex-singapore']}/>
              <OptionField label="Nationality" data={data} setData={setNewData} accessor="personal_info_nationality" options={["filipino", "indonesian", "myanmarese", "indian", "sri lankan", "bangladeshi", "cambodian", "malaysian", "thai", "vietnamese"]}/>
            </TableRow>
            <TableRow>
              <TextInputField label="Height" data={data} setData={setNewData} accessor="personal_info_height" />
              <TextInputField label="Weight" data={data} setData={setNewData} accessor="personal_info_weight" />
            </TableRow>
            <TableRow>
              <TextInputField label="Date of Birth" data={data} setData={setNewData} accessor="personal_info_date_of_birth" />
              <TextInputField label="Birth State" data={data} setData={setNewData} accessor="personal_info_birth_state" />
            </TableRow>
            <TableRow>
              <TextInputField label="Religion" data={data} setData={setNewData} accessor="personal_info_religion" />
              <TextInputField label="Ethnic Group" data={data} setData={setNewData} accessor="personal_info_ethnic_group" />
            </TableRow>
            <Head>Education</Head>
            <TableRow>
              <BooleanToggle label="Formal Education" data={data} setData={setNewData} accessor="education_formal_education" />
              <TextInputField label="Highest Level" data={data} setData={setNewData} accessor="education_highest_education_level" />
            </TableRow>

            <Head>Family</Head>
            <TableRow>
              <TextInputField label="Siblings" data={data} setData={setNewData} accessor="family_siblings" />
              <td/><td/>
            </TableRow>
            <TableRow>
              <TextInputField label="Marital Status" data={data} setData={setNewData} accessor="family_marital_status_status" />
              <TextInputField label="Husband's Occupation" data={data} setData={setNewData} accessor="family_marital_status_husband_occupation" />
            </TableRow>
            <TableRow>
              <NumberField label="Children" data={data} setData={setNewData} accessor="family_children_number" />
              <TextInputField label="Child Details" data={data} setData={setNewData} accessor="family_children_details" />
            </TableRow>

            <Head>Salary</Head>
            <TableRow>
              <NumberField label="Monthly Salary (SGD)" data={data} setData={setNewData} accessor="salary_monthly_salary" />
              <NumberField label="Placement Fee (SGD)" data={data} setData={setNewData} accessor="salary_placement_fee" />
            </TableRow>
            <TableRow>
              <NumberField label="Rest Days/Month" data={data} setData={setNewData} accessor="salary_rest_days_per_month_total" />
              <TextInputField label="Rest Day Compensation Fee" data={data} setData={setNewData} accessor="salary_rest_days_per_month_compensate_fee" />
            </TableRow>
            <TableRow>
              <TextInputField label="Reason" data={data} setData={setNewData} accessor="salary_reason" />
            </TableRow>

            <Head>Skills</Head>
            <TableRow>
              <TextInputField label="Language Abilities" data={data} setData={setNewData} accessor="skills_spoken_language_abilities" />
              <TextInputField label="Language Categories" data={data} setData={setNewData} accessor="skills_spoken_language_categories" />
            </TableRow>
            <TableRow>
              <SkillToggle label="Infant & Children Care" data={data} setData={setNewData} accessor="skills_care_of_infants_children"/>
              <SkillToggle label="Elderly Care" data={data} setData={setNewData} accessor="skills_care_of_elderly"/>

            </TableRow>
            <TableRow>
              <SkillToggle label="Disabled Care" data={data} setData={setNewData} accessor="skills_care_of_disabled"/>
              <SkillToggle label="Pet Care" data={data} setData={setNewData} accessor="skills_care_of_pets"/>
            </TableRow>
            <TableRow>
              <SkillToggle label="Cooking" data={data} setData={setNewData} accessor="skills_cooking"/>
              <TextInputField label="Cuisine" data={data} setData={setNewData} accessor="skills_cooking_cuisine" />
            </TableRow>
            <TableRow>
              <SkillToggle label="General Housework" data={data} setData={setNewData} accessor="skills_general_housework"/>
              <TextInputField label="Others" data={data} setData={setNewData} accessor="skills_other_skills" />
            </TableRow>

            <Head>Employment (Singapore)</Head>
            <TableRow>
              <BooleanToggle label="Previous Work Experience" data={data} setData={setNewData} accessor="employment_history_singapore_previous_work_experience" />
              <TextInputField label="Work Permit Number" data={data} setData={setNewData} accessor="employment_history_singapore_work_permit_no" />
            </TableRow>
            <Head>Employment (Overseas)</Head>
            <TableRow>
              <TextInputField label="Date" data={data} setData={setNewData} accessor="employment_history_overseas_date" />
              <TextInputField label="Country" data={data} setData={setNewData} accessor="employment_history_overseas_country" />
            </TableRow>
            <TableRow>
              <TextInputField label="Employer" data={data} setData={setNewData} accessor="employment_history_overseas_employer" />
              <TextInputField label="Work Duties" data={data} setData={setNewData} accessor="employment_history_overseas_work_duties" />
            </TableRow>
            <TableRow>
              <TextInputField label="Feedback from Employers" data={data} setData={setNewData} accessor="employment_history_feedback_from_previous_employers" />
            </TableRow>

            <Head>Illness</Head>
            <TableRow>
              <TextInputField label="Dietary Restrictions" data={data} setData={setNewData} accessor="medical_history_dietary_restrictions" />
              <TextInputField label="Food Handling Preferences" data={data} setData={setNewData} accessor="medical_history_food_handling_preferences" />
            </TableRow>
            <TableRow>
              <BooleanToggle label="Asthma" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_asthma" />
              <BooleanToggle label="Diabetes" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_diabetes" />
            </TableRow>
            <TableRow>
              <BooleanToggle label="Epilepsy" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_epilepsy" />
              <BooleanToggle label="Heart Disease" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_heart_disease" />
            </TableRow>
            <TableRow>
              <BooleanToggle label="Hypertension" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_hypertension" />
              <BooleanToggle label="Malaria" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_malaria" />
            </TableRow>
            <TableRow>
              <BooleanToggle label="Tuberculosis" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_tuberculosis" />
              <BooleanToggle label="Operations" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_operations" />
            </TableRow>
            <TableRow>
              <BooleanToggle label="Mental Illness" data={data} setData={setNewData} accessor="medical_history_past_and_existing_illnesses_mental_illness" />
              <TextInputField label="Physical Disabilities" data={data} setData={setNewData} accessor="medical_history_physical_disabilities" />
            </TableRow>

            <Head>Interview</Head>
            <TableRow>
              <BooleanToggle label="By Phone" data={data} setData={setNewData} accessor="availability_for_interview_by_phone" />
              <BooleanToggle label="By Video Conference" data={data} setData={setNewData} accessor="availability_for_interview_by_videoconference" />
            </TableRow>
            <TableRow>
              <BooleanToggle label="In Person" data={data} setData={setNewData} accessor="availability_for_interview_in_person" />
            </TableRow>

            <Head>Remarks</Head>
            <TableRow>
              <TextInputField label="Preference for Rest Day" data={data} setData={setNewData} accessor="remarks_preference_for_rest_day" />
              <TextInputField label="Addtional Remarks" data={data} setData={setNewData} accessor="remarks_additional_remarks" />
            </TableRow>
          </TableBody>
        </Table></TableContainer>
      </Box>
    </Box>
  )
}

export default HelperDetail