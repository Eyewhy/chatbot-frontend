import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { registerRequest } from "../../api/auth";
import { useAuth } from "../../services/authProvider";

function CreateAccountPage() {
    const {
        register,
        handleSubmit,
        formState: {errors, ...formState}
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
        toast('Creating account...')
        registerRequest(data.username, data.pass1, data.pass2, data.email).then((res) => {
            if (res === 'error') {
                toast('Account creation failed.');
            } else { toast('Account creation successful. Please return to the login page.')}
        });
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <div>
                <h1>Create Account</h1>
                
                <form class="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                    <span class="lead">Username</span>
                    <input type="text" class="m-1" {
                        ...register("username", {required:true})}/>

                    <span class="lead">Email</span>
                    <input type="email" class="m-1" {
                        ...register("email", {required:true})}/>

                    <span class="lead">Password</span>
                    <input type="password" class="m-1" {
                        ...register("pass1", {required:true})}/>

                    <span class="lead">Confirm Password</span>
                    <input type="password" class="m-1" {
                        ...register("pass2", {required:true})}/>
                    <input type="submit" class="m-1" value="Register"/>
                </form>
                Password must not be too similar to email or username.
                
            </div>
        </div>
    )
}

export default CreateAccountPage