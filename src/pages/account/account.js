import React , { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormInputText } from "../../components/formComponents";
import { Header } from "../../components/mui";
import { Typography, Button, Box } from "@mui/material";

import { userRequest, changePasswordRequest, editUserRequest } from "../../api/auth";
import { useAuth } from "../../services/authProvider";

function AccountPage() {
    const auth = useAuth();
    const [data, setData] = useState({});

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm();

    useEffect(() => {
        ( async () => {
            let data = await userRequest();
            console.log(data);
            setData(data);
            setValue('username', data['username']);
            setValue('email', data['email']);
        })();
    },[])

    async function submitDetails(form) {
        editUserRequest(form['username'], form['email']);
    }
    async function submitPassword(form) {
        if (form.pass1 !== form.pass2) {
            toast('Passwords do not match!')
            return;
        }
        changePasswordRequest(form.pass1, form.pass2).then((res) => {
            if (res !== 'error') { 
                toast('Password change successful. Please return to the login page.')
            }
        });
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box>
                <Header text={auth.user + "'s Account"}/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap:5,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap:1
                    }}>

                        <FormInputText name="username" control={control} label="Username" defaultValue="username"/>
                        <FormInputText name="email" control={control} label="Email" defaultValue="email"/>
                        <Button type="submit" variant="contained" color="info" onClick={handleSubmit(submitDetails)}>Change Details</Button>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap:1
                    }}>
                        <Typography variant="h5">Change Password</Typography>
                        
                        <FormInputText type="password" name="pass1" control={control} label="New Password"/>
                        <FormInputText type="password" name="pass2" control={control} label="Confirm Password"/>
                        <Button type="submit" variant="contained" onClick={handleSubmit(submitPassword)}>Change Password</Button>
                        <Typography variant="caption">
                            Password must not be too similar to email or username.
                        </Typography>
                    </Box>
                    <Box sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:1
                    }}>
                        <Button type="submit" color="info" variant="outlined" href="#/organization">Manage Organization (Admin only)</Button>
                        <Button type="submit" color="error" variant="contained" onClick={auth.logout}>Logout</Button>    
                    </Box>    
                </Box>    
            </Box>
            
        </Box>
    )
}

export default AccountPage