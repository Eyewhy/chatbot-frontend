import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Paper, Box, Typography, Button, Link } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import { InfoTable, SkillTable, MedicalTable, AgencyTable } from "../components/tables";
import { HeaderGraphy } from "../components/mui";

import { publicHelperRequest, publicOrganizationRequest } from "../api/public";
import { useAuth } from "../services/authProvider";
import { properHelperInfo, timeAgo } from "../services/format";
import { useShortlist } from "../services/shortlistProvider";

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

  const miscTable = [
    ['Rest Day Preference', 'remarks_preference_for_rest_day'],
    ['Remarks', 'remarks_additional_remarks'],
    ['Interview by Phone', 'availability_for_interview_by_phone'],
    ['Interview by Video Call', 'availability_for_interview_by_videoconference'],
    ['Interview in Person', 'availability_for_interview_in_person'],
  ]

  const mainInfoTable = [
    ['ID', 'id'],
    ['Type', 'personal_info_type'],
    ['Nationality', 'personal_info_nationality'],
    ['Languages', 'skills_spoken_language_categories'],
    ['Salary', 'salary_monthly_salary'],
    ['Recency', 'time']
  ]

  const [data, setData] = useState({});
  const [agency, setAgency] = useState({description:''});
  const { id } = useParams();

  const auth = useAuth();
  const shortlist = useShortlist();

  useEffect(() => {( async () => {
    let res = await publicHelperRequest(auth.checkLoggedIn(), id);
    timeAgo(res);
    properHelperInfo(res);
    console.log(res);
    setData(res);
    let res2 = await publicOrganizationRequest(res['organization']);
    setAgency(res2);
  })();}, []);

  function addToShortlist() {
      shortlist.addToShortlist(data) ? toast("Added to shortlist.") : toast("Already in Shortlist!");
  }

  return (<>
    <Box sx={{
      display:'flex',
      flexDirection: {xs:'column', md:'row'},
      justifyContent: 'center',
      mt:2,
      gap: 2
    }}>
      <Box sx={{
        position: {md:'sticky'},
        height: {md:'90vh'},
        top:0,
        display: 'flex',
        flexDirection: 'column',
        gap:2,
        width: {md:'280px'}
      }}>
        <Paper elevation={2} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center',
          gap:2,
          p:2,
        }}>
          <HeaderGraphy>{data['personal_info_name']}</HeaderGraphy>
          {data['image'] ?
            <Paper component='img' src={data['image']} elevation={2} sx={{height:'300px', width:'200px'}}/>
          :
            <Paper elevation={2} sx={{
              height:'300px', width:'200px', 
              textAlign: 'center', 
              alignContent: 'center'
            }}>
              Image Unavailable.
            </Paper>
          }
          
          <InfoTable rows={mainInfoTable} data={data}/>
          <Button fullWidth variant="contained" color="info" startIcon={<AddIcon />} onClick={addToShortlist}>Add to Shortlist</Button>
        </Paper>
      </Box>

      <Box sx={{
        display:'flex',
        flexDirection:'column',
        gap:2,
        width: {md:'550px'},
      }}>
        <Paper elevation={2}>
          {data['personal_info_ref'] ?
            <Box sx={{
              display:'flex',
              flexDirection:'column',
              gap:2,
              p:2,
            }}>
              <HeaderGraphy>Personal Information</HeaderGraphy>
              <InfoTable rows={personalInfoTable} data={data} width='50%' />

              <HeaderGraphy >Salary</HeaderGraphy>
              <InfoTable rows={salaryTable} data={data} width='50%' />

              <HeaderGraphy>Family</HeaderGraphy>
              <InfoTable rows={familyTable} data={data} width='50%' />

              <HeaderGraphy>Skills</HeaderGraphy>
              <SkillTable data={data} />

              <HeaderGraphy>Employment</HeaderGraphy>
              {Array.isArray(data['employment_histories']) && data['employment_histories'].length > 0 ? (
                data['employment_histories'].map((job, idx) => (
                  <InfoTable 
                    rows={[
                      ['Start Date', 'start_date'],
                      ['End Date', 'end_date'],
                      ['Country', 'country'],
                      ['Employer', 'employer'],
                      ['Work Duties', 'work_duties'],
                      ['Feedback', 'feedback_from_previous_employers']
                    ]}
                    data={job}
                  />
                ))
              ) : (
                <Typography>No employment history available.</Typography>
              )}

              <HeaderGraphy>Medical Information</HeaderGraphy>
              <MedicalTable data={data} />

              <HeaderGraphy>Remarks</HeaderGraphy>
              <InfoTable rows={miscTable} data={data} />
            </Box>
          :
            <Box elevation={2} sx={{
              display:'flex', 
              flexDirection: 'column',
              justifyContent: 'top', 
              height: '50vh',
              p:2,
              gap: 1
            }}>
              <HeaderGraphy>
                Please Sign In to view personal details!
              </HeaderGraphy>
              <Button variant="contained" href="#/login">Sign in Here</Button>
            </Box>
          }
        </Paper>
      </Box>
      <Box sx={{
        position: {md:'sticky'},
        height: {md:'90vh'},
        top:0,
        display: 'flex',
        flexDirection: 'column',
        gap:2,
        width: {md:'280px'}
      }}>
        <Link href={`#/organization/${data['organization']}`} underline="none">
          <Paper elevation={2} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap:2,
            p:2,
          }}>
            <Typography>Maid Agency Info</Typography>

            <Paper component='img' src={agency['image']} elevation={2} sx={{height:'200px', width:'200px'}}/>
            <AgencyTable data={agency}/>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap:1
            }}>

              <Button variant="outlined" color="primary">View Agency Info</Button>
              <Button variant="contained" color="success" startIcon={<AddIcCallIcon />}>Contact Agency</Button>
            </Box>
          </Paper>
        </Link>
      </Box>
    </Box> 
  </>)
}

export default HelperBiodata