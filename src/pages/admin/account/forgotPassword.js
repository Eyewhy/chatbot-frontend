import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { resetRequest } from "../../../api/auth";
import { useAuth } from "../../../services/authProvider";

function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: {errors, ...formState}
    } = useForm();

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.checkLoggedIn()) navigate('/referral')
    },[])

    async function onSubmit(data) {
        toast('Sending mail, this may take a while')
        resetRequest(data.email).then((res) => {
            if (res === 'error') {
                toast("Email sending failed.");
            } else { toast("Email request sent. May take a few minutes to arrive.")}
        });
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <div>
                <h1>Forgot Password</h1>
                
                <form class="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                    <span class="lead">Email</span>
                    <input type="email" class="m-1" {
                        ...register("email", {required:true})}/>
                    <input type="submit" class="m-1" value="Send Email"/>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage