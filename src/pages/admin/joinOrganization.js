import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../services/authProvider";

import { FormInputText } from "../../components/formComponents";
import { Typography, Box, Button, Paper } from "@mui/material";

import { addToOrganizationRequest } from "../../api/admin/organization";
import { toast } from "react-toastify";

function JoinOrganizationPage() {
    const {
        handleSubmit,
        control,
    } = useForm({name:'',pass:''});

    const auth = useAuth();

    async function onSubmit(data) {
        addToOrganizationRequest(data.name, data.pass).then((res) => {
            if (res !== 'error') {
                toast('Join Successful! Please login again to reload the page.');
                auth.logout();
            }
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