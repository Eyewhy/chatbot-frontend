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
    } = useForm({defaultValues:{username:'', password:''}});

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.checkLoggedIn()) navigate('/account')
    },[])

    async function onSubmit(data) {
        if (!data.username || !data.password) {
            toast("Please provide a valid input!");
            return;
        }
        auth.login(data.username, data.password);
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper elevation={2} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap:1,
                    p:2,

                }}>
                    <Typography variant="h5">Sign In</Typography>
                    
                    <FormInputText name="username" control={control} label="Username"/>
                    <FormInputText type="password" name="password" control={control} label="Password"/>
                    <Button type="submit" variant={"contained"}>Sign In</Button>
                    
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
            </form>
        </Box>
    )
}

export default LoginPage