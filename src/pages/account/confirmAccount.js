import React , { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { Button, Paper, Typography, Box } from "@mui/material";

import { createConfirmRequest } from "../../api/auth";
import { useAuth } from "../../services/authProvider";

function ConfirmAccountPage() {
    const { keyy } = useParams();
    const [verified, setVerified] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.checkLoggedIn()) return navigate('/search');
        confirmEmail(keyy);
    },[])

    async function confirmEmail(keyy) {
        createConfirmRequest(keyy).then((res) => {
            if (res === 'error') return toast("Oops, Verification Failed");
            toast("Email Verified Successfully. Please return to login page.");
            setVerified(true);
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
                <Typography variant="h4">Confirm Email</Typography>
                {verified ? 
                    <Typography>Account Verified, please return to login page.</Typography>
                :
                    <Typography>Please wait a moment for verification to occur.</Typography>
                }
                <Button variant="outlined" href="#/">Back to Login</Button>
            </Paper>
        </Box>
    )
}

export default ConfirmAccountPage