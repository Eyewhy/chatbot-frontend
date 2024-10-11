import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { FormInputText } from "../../../components/formComponents";
import { Button, Paper, Typography, Box } from "@mui/material";

import { resetConfirmRequest } from "../../../api/auth";
import { useAuth } from "../../../services/authProvider";

function ForgotPasswordConfirmPage() {
    const {
        handleSubmit,
        reset,
        control,
        setValue
    } = useForm();

    const { uid, token } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.checkLoggedIn()) navigate('/referral')
    },[])

    async function onSubmit(data) {
        if (data.pass1 !== data.pass2) {
            toast('Passwords do not match!')
            return;
        }
        resetConfirmRequest(uid, token, data.pass1, data.pass2).then((res) => {
            if (res !== 'error') { 
                toast('Password reset successful. Please return to the login page.')
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
            <Paper elevation="1" sx={{
                display: 'flex',
                flexDirection: 'column',
                gap:1,
                p:2,

            }}>
                <Typography variant="h4">Forgot Password</Typography>
                
                <FormInputText type="password" name="pass1" control={control} label="Password"/>
                <FormInputText type="password" name="pass2" control={control} label="Confirm Password"/>
                <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Change Password</Button>
                <Button variant="outlined" href="#/">Back to Login</Button>
                
                <Typography variant="caption">
                    Password must not be too similar to email <br/> or username.
                </Typography>
            </Paper>
        </Box>
    )
}

export default ForgotPasswordConfirmPage