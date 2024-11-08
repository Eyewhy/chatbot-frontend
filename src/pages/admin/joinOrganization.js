import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FormInputText } from "../../components/formComponents";
import { Typography, Box, Button, Paper } from "@mui/material";

import { addToOrganizationRequest } from "../../api/admin/organization";

function JoinOrganizationPage() {
    const {
        handleSubmit,
        control,
    } = useForm({name:'',pass:''});

    const navigate = useNavigate();

    async function onSubmit(data) {
        addToOrganizationRequest(data.name, data.pass).then((res) => {
            if (res !== 'error') navigate('/admin/referral')
        });
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
        }}>
            <Paper elevation={2} sx={{
                display: 'flex',
                flexDirection: 'column',
                gap:1,
                p:2,

            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:2
                    }}>
                        <Typography variant="h5">Join Organization</Typography>
                        
                        <FormInputText name="name" control={control} label="Organization Name"/>
                        <FormInputText name="pass" control={control} label="Organization Passphrase"/>
                        <Button type="submit" variant={"contained"}>Join Organization</Button>
                    </Box>
                </form>
                
            </Paper>
        </Box>
       
    )
}

export default JoinOrganizationPage