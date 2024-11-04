import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FormInputText } from "../../components/formComponents";
import { Button, Paper, Typography, Link, Box } from "@mui/material";

import { useAuth } from "../../services/authProvider"

function LoginPage() {
    const {
        handleSubmit,
        control,
    } = useForm();

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.checkLoggedIn()) navigate('/search')
    },[])

    async function onSubmit(data) {
        console.log(data);
        if (data.username === "" || data.password === "") {
            toast("Please provide a valid input!");
            return;
        }
        auth.login(data.username, data.password).then((res) => {
            if (res === 'error') {
                toast("Login Failed!");
                return;
            };    
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
                <Typography variant="h5">Sign In</Typography>
                
                <FormInputText name="username" control={control} label="Username"/>
                <FormInputText type="password" name="password" control={control} label="Password"/>
                <Button type="submit" variant={"contained"} onClick={handleSubmit(onSubmit)}>Sign In</Button>
                <Button variant={"outlined"} href="#/reset">Forgot Password</Button>
                
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography variant="caption">
                        Need an account? 
                        <Link underline="none" href="#/create"> Create Account</Link>
                    </Typography>
                </Box>
                    
            </Paper>
        </Box>
    )
}

export default LoginPage