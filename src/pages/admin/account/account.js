import React , { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormInputText } from "../../../components/formComponents";
import Header from "../../../components/header";
import { Typography, Button, Box } from "@mui/material";

import { userRequest, changePasswordRequest } from "../../../api/auth";
import { useAuth } from "../../../services/authProvider";

function AccountPage({ setActivePage }) {
    const {
        handleSubmit,
        reset,
        control,
        setValue
    } = useForm();

    const auth = useAuth();
    const [data, setData] = useState({});

    useEffect(() => {
        setActivePage("");
        ( async () => {
            let data = await userRequest();
            console.log(data);
            setData(data);
        })();
    },[])

    async function onSubmit(form) {
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
            gap:2,
            maxWidth: '400px'
        }}>
                <Header text={auth.user + "'s Account"}/>
                <Box>     
                    <Typography variant="h5">Email</Typography>
                    <Typography>{data['email']}</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap:1
                }}>
                    <Typography variant="h5">Change Password</Typography>
                    
                    <FormInputText type="password" name="pass1" control={control} label="Password"/>
                    <FormInputText type="password" name="pass2" control={control} label="Confirm Password"/>
                    <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Change Password</Button>
                    <Typography variant="caption">
                        Password must not be too similar to email or username.
                    </Typography>
                </Box>
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:1
                }}>
                    <Button type="submit" color="success" variant="contained" href="#/organization">Manage Organization (Admin only)</Button>
                    <Button type="submit" color="error" variant="contained" onClick={auth.logout}>Logout</Button>    
                </Box>
                
        </Box>
    )
}

export default AccountPage