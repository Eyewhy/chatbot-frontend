import React, { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Table from "../../../components/table";
import { toast } from "react-toastify";

import { Typography, Button, Box } from "@mui/material";
import { Header } from "../../../components/mui";
import { FormInputText } from "../../../components/formComponents";

import { organizationDetailRequest, changePassphraseRequest, deleteUserFromOrganizationRequest } from "../../../api/users";

function OrganizationPage () {
    const [data, setData] = useState({'members':[]});
    const [state, setState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        ( async () => {
            await organizationDetailRequest().then((res) => {
                if (res === 'error') navigate('/account');
                console.log(res)
                setData(res);
            });
        })();
    },[state]);

    // TABLE
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

    const deleteButton = (id) => { deleteUserFromOrganizationRequest(id).then((res) => {
        console.log(res);
        if (res !== 'error') {
            toast('Deleted.')
            setState(!state);
        }
    }); };
    
    // FORM
    const {
        control,
        handleSubmit,
        formState: {errors, ...formState}
    } = useForm();

    async function onSubmit(data) {
        if (data.pass1 !== data.pass2) {
            toast('Passphrases do not match!')
            return;
        }
        changePassphraseRequest(data.pass1).then((res) => {
            if (res !== 'error') { 
                toast('Passphrase change successful.')
                setState(!state);
            }
        });
    }
    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            <Header text="Manage Organization"/>
            <Box sx={{display:'flex'}}>
                <Box sx={{mr:2}}>
                    <Typography variant="h6">Organization Name</Typography>
                    <Typography variant="subtitle1">{data['name']}</Typography>
                </Box>
                <Box sx={{mr:5}}>
                    <Typography variant="h6">Organization Passphrase</Typography>
                    <Typography variant="subtitle1">{data['passphrase']}</Typography>
                </Box>
                <Box sx={{mr:2}}>
                    <Typography variant="h6">Biodatas Scanned</Typography>
                    <Typography variant="subtitle1">{data['documents_scanned']}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">Q&A Refreshes</Typography>
                    <Typography variant="subtitle1">{data['embeddings_generated']}</Typography>
                </Box>
            </Box>
            <Typography>Provide the organization name & passphrase to users to allow them to join your organization.</Typography>
            
            <Box style={{
                maxWidth: "300px",
                display: 'flex',
                flexDirection: 'column',
                gap:8
            }}>
                <Typography variant="h5">Change Passphrase</Typography>
                
                <FormInputText name="pass1" control={control} label="Passphrase"/>
                <FormInputText name="pass2" control={control} label="Confirm Passphrase"/>
                <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Change Passphrase</Button>

                <Typography variant="caption">Passphrase must be at least 8 characters.</Typography>
            </Box>

            <Typography variant="h5">Users</Typography>
            <Table columns={columns} data={data['members']} />
        </Box>
    )
}

export default OrganizationPage