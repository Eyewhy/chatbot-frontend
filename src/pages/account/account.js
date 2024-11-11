import React , { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormInputText } from "../../components/formComponents";
import { Header } from "../../components/mui";
import { Typography, Button, Box } from "@mui/material";

import { userRequest, userDeleteRequest, changePasswordRequest, editUserRequest } from "../../api/auth";
import { useAuth } from "../../services/authProvider";

function AccountPage() {
    const auth = useAuth();
    const [data, setData] = useState({});

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({defaultValues:{username:'username', email:'email'}});

    useEffect(() => {
        ( async () => {
            let data = await userRequest();
            // check for expired token
            console.log(data);
            if (data === 'error') auth.logout();
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

    async function deleteUser() {
        if (!window.confirm('Are you sure you want to delete your account?')) return 'error';
        userDeleteRequest();
        auth.logout();
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
                    <form onSubmit={handleSubmit(submitDetails)}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap:1
                        }}>

                            <FormInputText name="username" control={control} label="Username"/>
                            <FormInputText name="email" control={control} label="Email"/>
                            <Button type="submit" variant="contained" color="info">Change Details</Button>
                        </Box>
                    </form>
                    <form onSubmit={handleSubmit(submitPassword)}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap:1
                        }}>
                            <Typography variant="h5">Change Password</Typography>
                            
                            <FormInputText type="password" name="pass1" control={control} label="New Password"/>
                            <FormInputText type="password" name="pass2" control={control} label="Confirm Password"/>
                            <Button type="submit" variant="contained">Change Password</Button>
                            <Typography variant="caption">
                                Password must not be too similar to email or username.
                            </Typography>
                        </Box>    
                    </form>
                    
                    <Button type="submit" color="error" variant="contained" onClick={auth.logout}>Logout</Button>

                    <Typography />
                    <Button type="submit" color="error" variant="outlined" onClick={deleteUser}>Delete My Account</Button>

                </Box>    
            </Box>
            
        </Box>
    )
}

export default AccountPage