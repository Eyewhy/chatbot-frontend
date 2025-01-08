import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ReactTable from "../../components/table";

import { Button, Typography, Box, TableContainer, Table, TableBody, TableRow, Paper } from "@mui/material";
import { InfoTable } from "../../components/tables";
import { TextInputField, LargeTextInputField } from "../../components/helperComponents";
import { FormUploadButton } from "../../components/formComponents";

import { organizationDetailRequest, updateOrganization, deleteUserFromOrganizationRequest, uploadOrganizationImage } from "../../api/admin/organization";

function OrganizationPage () {
  const columns = useMemo(() => [
    {
      Header: "Username",
      accessor: "user.username",
    },
    {
      Header: "Email",
      accessor: "user.email"
    },
    {
      Header: "Date Joined",
      accessor: "user.date_joined",
    },
    {
      Header: "Delete",
      accessor: "id",
      Cell: props => <Button variant="outlined" color="error" onClick={(e) => {
        deleteButton(props.row.original.id);
      }}>Delete</Button>
    }
  ],[]);

  const orgTable = [
    ['Biodata Scans', 'documents_scanned'],
    ['Q&A Refreshes', 'embeddings_generated']
  ]

  const [data, setData] = useState({});
  const [otherData, setOtherData] = useState({members:[]});
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {( async () => {
    let data = await organizationDetailRequest().then((res) => {
      if (res === 'error') {
        navigate('/admin');
        return {};
      }
      return res;
    });
    setOtherData(splitData(data));
    setData(data);
  })();
  }, [state]);

  const splitData = (data) => {
    let newData = {
      id: data['id'],
      admin_username: data['admin_username'],
      documents_scanned: data['documents_scanned'],
      embeddings_generated: data['embeddings_generated'],
      members: data['members'],
      image: data['image']
    };

    let deleteFields = ['id', 'admin_username', 'documents_scanned', 'embeddings_generated', 'members', 'image'];
    deleteFields.forEach(item => {
      delete data[item];
    });

    return newData;
  }

  const save = () => { updateOrganization(data).then((res) => {
    if (res !== 'error') setState(!state);
  }); }

  const setNewData = (accessor, value) => {
    data[accessor] = value;
    console.log(data);
    setData({...data});
  }

  const handleFileChange = (event) => {
    if (!event.target.files) return;
    uploadOrganizationImage(otherData['id'], event.target.files[0]).then((res) => {
      if (res !== 'error') setState(!state);
    });
  }

  const deleteButton = (id) => { deleteUserFromOrganizationRequest(id).then((res) => {
    console.log(res);
    if (res !== 'error') {
      setState(!state);
    }
  }); };

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
          <Typography variant="h6">{data['name']}</Typography>
          <InfoTable rows={orgTable} data={otherData}/>
          <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
            <Box component='img' src={otherData['image']} sx={{height:'200px', width:'200px', alignSelf:'center'}}/>
            <FormUploadButton onChange={handleFileChange} text="Change Image"/>  
          </Box>
          

          <Button variant="outlined" color="info" href={`#organization/${otherData['id']}`}>View Website</Button>
          <Button variant="contained" color="success" onClick={save}>Save</Button>      
        </Paper>
      </Box>
      
      <Box sx={{width:'65%'}}>
        <TableContainer><Table size='small'>
          <TableBody>
            <TableRow>
                <TextInputField label="Name" data={data} setData={setNewData} accessor="name" />
                <TextInputField label="Passphrase" data={data} setData={setNewData} accessor="passphrase" />
            </TableRow>
            <TableRow>
                <TextInputField colSpan={2} label="Full Name" data={data} setData={setNewData} accessor="full_name" />
            </TableRow>
            <TableRow>
                <LargeTextInputField colSpan={2} label="Description" data={data} setData={setNewData} accessor="description" />
            </TableRow>
            <TableRow>
                <LargeTextInputField label="Address" data={data} setData={setNewData} accessor="address" />
                <LargeTextInputField label="Office Hours" data={data} setData={setNewData} accessor="office_hours" />
            </TableRow>
            <TableRow>
                <LargeTextInputField label="Phone Number" data={data} setData={setNewData} accessor="contact_number" />
                <LargeTextInputField label="Website" data={data} setData={setNewData} accessor="website" />
            </TableRow>
          </TableBody>
        </Table></TableContainer>
        <Typography variant="h5">Users</Typography>
        <ReactTable columns={columns} data={otherData['members']} />
      </Box>
    </Box>
  )
}

export default OrganizationPage