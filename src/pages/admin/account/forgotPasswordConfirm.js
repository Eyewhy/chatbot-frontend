import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { resetConfirmRequest } from "../../../api/auth";
import { useAuth } from "../../../services/authProvider";

function ForgotPasswordConfirmPage() {
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
        resetConfirmRequest(uid, token, data.pass1, data.pass2).then((res) => {
            if (res !== 'error') { 
                toast('Password reset successful. Please return to the login page.')
            }
        });
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <div>
                <h1>Forgot Password</h1>
                
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
        </div>
    )
}

export default ForgotPasswordConfirmPage