import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, Box, Typography } from "@mui/material";

import { InfoTable, SkillTable, MedicalTable } from "../components/tables";

import { helperRequest } from "../api/get";
import { timeAgo } from "../services/timeAgo";

function HelperBiodata () {
  const personalInfoTable = [
    ['Education Level', 'education_highest_education_level'],
    ['Reference', 'personal_info_ref'],
    ['Date of Birth', 'personal_info_date_of_birth'],
    ['Place of Birth', 'personal_info_birth_state'],
    ['Ethnic Group', 'personal_info_ethnic_group'],
    ['Religion', 'personal_info_religion'],
    ['Height', 'personal_info_height'],
    ['Weight', 'personal_info_weight'],
  ];

  const familyTable = [
    ['Siblings', 'family_siblings'],
    ['Marital Status', 'family_marital_status_status'],
    ["Husband's Occupation", 'family_marital_status_husband_occupation'],
    ['No. of Children', 'family_children_number'],
    ['Children Details', 'family_children_details']
  ]

  const salaryTable = [
    ['Salary', 'salary_monthly_salary'],
    ['Placement Fee', 'salary_placement_fee'],
    ['Rest days/Month', 'salary_rest_days_per_month_total'],
    ['Compensation Fee', 'salary_rest_days_per_month_compensate_fee'],
  ]

  const employmentTable = [
    ['Overseas Date', 'employment_history_overseas_date'],
    ['Country', 'employment_history_overseas_country'],
    ['Employer', 'employment_history_overseas_employer'],
    ['Work Duties', 'employment_history_overseas_work_duties'],
    ['Singapore Experience', 'employment_history_singapore_previous_work_experience'],
    ['Work Permit Number', 'employment_history_singapore_work_permit_no'],
    ['Feedback', 'employment_history_feedback_from_previous_employers']
  ]

  const medicalTable = [
    ['Food Handling Preferences', 'medical_history_food_handling_preferences'],
    ['Allergies', 'medical_history_allergies'],
    ['Mental Illness','medical_history_past_and_existing_illnesses_mental_illness'],
    ['Epilepsy','medical_history_past_and_existing_illnesses_epilepsy'],
    ['Asthma', 'medical_history_past_and_existing_illnesses_asthma'] ,
    ['Diabetes', 'medical_history_past_and_existing_illnesses_diabetes'],
    ['Hypertension', 'medical_history_past_and_existing_illnesses_hypertension'],
    ['Tuberculosis', 'medical_history_past_and_existing_illnesses_tuberculosis'],
    ['Heart Disease', 'medical_history_past_and_existing_illnesses_heart_disease'],
    ['Malaria', 'medical_history_past_and_existing_illnesses_malaria'],
    ['Operations', 'medical_history_past_and_existing_illnesses_operations'],
    ['Physical Disabilities', 'medical_history_physical_disabilities'],
    ['Dietary Restrictions', 'medical_history_dietary_restrictions'],
  ]

  const miscTable = [
    ['Rest Day Preference', 'remarks_preference_for_rest_day'],
    ['Remarks', 'remarks_additional_remarks'],
    ['Interview by Phone', 'availability_for_interview_by_phone'],
    ['Interview by Video Call', 'availability_for_interview_by_videoconference'],
    ['Interview in Person', 'availability_for_interview_in_person'],
  ]

  const mainInfoTable = [
    ['Name', 'personal_info_name'],
    ['Type', 'personal_info_type'],
    ['Nationality', 'personal_info_nationality'],
    ['Languages', 'skills_spoken_language_categories'],
    ['Salary', 'salary_monthly_salary'],
    ['Recency', 'time']
  ]

  const agencyTableRows = [
    ['Name', 'name'],
    ['Contact', 'contact'],
    ['Phone', 'number']
  ]

  const testAgencyInfo = {
    name: 'ASSET Maid Agency',
    contact: 'John Doe',
    number: '0598324098'
  }

  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {( async () => {
    let res = await helperRequest(id);
    timeAgo(res);
    setData(res);
  })();}, []);

  return (
    <Box sx={{
      display:'flex',
      justifyContent: 'start',
      mt:2,
      gap: 2
    }}>
      <Box sx={{
        position: 'sticky',
        top:0,
        display: 'flex',
        flexDirection: 'column',
        gap:2,
        height:'1000px'
      }}>
        <Paper elevation={2} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap:2,
          p:2,
        }}>
          <Paper elevation={2} sx={{height:'300px'}}>Placeholder for image</Paper>
          <InfoTable rows={mainInfoTable} data={data}/>
        </Paper>
        <Paper elevation={2} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap:2,
          p:2,
        }}>
          Maid Agency Info
          <InfoTable rows={agencyTableRows} data={testAgencyInfo}/>  
        </Paper>
      </Box>
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        gap:2,
      }}>
        <Paper elevation={2}>
          <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2,
            p:2,
          }}>
            <Typography>Personal Information</Typography>
            <InfoTable rows={personalInfoTable} data={data} />

            <Typography>Salary</Typography>
            <InfoTable rows={salaryTable} data={data} />

            <Typography>Family</Typography>
            <InfoTable rows={familyTable} data={data} />

            <Typography>Skills</Typography>
            <SkillTable data={data} />

            <Typography>Employment</Typography>
            <InfoTable rows={employmentTable} data={data} />

            <Typography>Remarks</Typography>
            <InfoTable rows={miscTable} data={data} />
            
            <Typography>Medical History</Typography>
            <MedicalTable rows={medicalTable} data={data} />
          </Box>
        </Paper>
      </Box>
    </Box> 
  )
}

export default HelperBiodata