import React , { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { userRequest, changePasswordRequest } from "../../api/auth";
import { useAuth } from "../../services/authProvider";

function AccountPage({ setActivePage }) {
    const {
        register,
        handleSubmit,
        formState: {errors, ...formState}
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
        <div style={{maxWidth: "300px"}} class="m-2">
            <p class="lead">{auth.user}'s Account</p>
            <p>
                <h4>Email</h4>
                <span class="lead">{data['email']}</span>
            </p>
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