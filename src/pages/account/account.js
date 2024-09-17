import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { changePasswordRequest } from "../../api/auth";
import { useAuth } from "../../services/authProvider";

function AccountPage({ setActivePage }) {
    const {
        register,
        handleSubmit,
        formState: {errors, ...formState}
    } = useForm();

    const auth = useAuth();

    useEffect(() => {
        setActivePage("");
    },[])

    async function onSubmit(data) {
        if (data.pass1 !== data.pass2) {
            toast('Passwords do not match!')
            return;
        }
        changePasswordRequest(data.pass1, data.pass2).then((res) => {
            if (res !== 'error') { 
                toast('Password change successful. Please return to the login page.')
            }
        });
    }

    return (
        <div style={{maxWidth: "300px"}}>
            <p class="lead my-2">{auth.user}'s Account</p>
            <div class="d-flex flex-column mt-2">
                <h4>Change Password</h4>
                
                <form class="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                    <span class="lead">Password</span>
                    <input type="password" class="m-1" {
                        ...register("pass1", {required:true})}/>
                    <span class="lead">Confirm Password</span>
                    <input type="password" class="m-1" {
                        ...register("pass2", {required:true})}/>
                    <input type="submit" class="m-1" value="Change Password"/>
                </form>
                Password must not be too similar to email or username.
            </div>
            <div class="mt-4 d-flex justify-content-center">
                <a class="btn btn-success mx-2 w-100" href="#/organization">Manage Organization (admin only)</a>    
            </div>
            <div class="mt-4 d-flex justify-content-center">
                <button class="btn btn-outline-danger mx-2 w-100" onClick={auth.logout}>Logout</button>    
            </div>
        </div>
    )
}

export default AccountPage