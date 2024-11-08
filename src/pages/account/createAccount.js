import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";

import { FormInputText } from "../../components/formComponents";
import { Button, Paper, Typography, Box } from "@mui/material";

import { registerRequest } from "../../api/auth";
import { useAuth } from "../../services/authProvider";

function CreateAccountPage() {
    const {
        handleSubmit,
        control,
    } = useForm({defaultValues:{username:'',email:'',pass1:'',pass2:''}});

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.checkLoggedIn()) navigate('/account')
    },[])

    async function onSubmit(data) {
        if (data.pass1 !== data.pass2) {
            toast('Passwords do not match!')
            return;
        }
        toast('Creating account...')
        registerRequest(data.username, data.pass1, data.pass2, data.email).then((res) => {
            if (res === 'error') {
                toast('Account creation failed.');
            } else { toast('Account creation successful. Please wait for email verification before logging in.')}
        });
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
                    <Typography variant="h5">Create Account</Typography>
                    
                    <FormInputText name="username" control={control} label="Username"/>
                    <FormInputText type="email" name="email" control={control} label="Email"/>
                    <FormInputText type="password" name="pass1" control={control} label="Password"/>
                    <FormInputText type="password" name="pass2" control={control} label="Confirm Password"/>
                    <Button type="submit" variant="contained">Create Account</Button>
                    <Button variant="outlined" href="#/">Back to Login</Button>
                    
                    <Typography variant="caption">
                        Password must not be too similar to email <br/> or username.
                    </Typography>
                </Paper>    
            </form>
            
        </Box>
    )
}

export default CreateAccountPage