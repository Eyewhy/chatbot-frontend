import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FormInputText } from "../../components/formComponents";
import { Button, Paper, Typography, Box } from "@mui/material";

import { resetRequest } from "../../api/auth";
import { useAuth } from "../../services/authProvider";

function ForgotPasswordPage() {
    const {
        handleSubmit,
        control,
    } = useForm();

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.checkLoggedIn()) navigate('/account')
    },[])

    async function onSubmit(data) {
        toast('Sending mail, this may take a while')
        resetRequest(data.email).then((res) => {
            if (res === 'error') {
                toast("Email sending failed.");
            } else { toast("Email request sent. May take a few minutes to arrive.")}
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
                <Typography variant="h5">Forgot Password</Typography>
                
                <FormInputText type="email" name="email" control={control} label="Email"/>
                <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Send Email</Button>
                <Button variant="outlined" href="#/">Back to Login</Button>
                
            </Paper>
        </Box>
    )
}

export default ForgotPasswordPage