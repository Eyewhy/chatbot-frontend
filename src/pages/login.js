import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../services/authProvider"

function LoginPage() {
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
        console.log(data.username);
        console.log(data.password);
        if (data.username === "" || data.password === "") {
            toast("Please provide a valid input!");
            return;
        }
        auth.login(data.username, data.password).then((res) => {
            if (res === 'error') {
                toast("Login Failed!");
                return;
            };    
        });
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <div>
                <h1>Login</h1>
                
                <form class="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                    <span class="lead">Username</span>
                    <input type="text" class="m-1" {
                        ...register("username", {required:true})}/>
                    <span class="lead">Password</span>
                    <input type="password" class="m-1" {
                        ...register("password", {required:true})}/>
                    <input type="submit" class="m-1" value="Login"/>
                </form>
                <a class="form-text text-decoration-none" href="#reset">Forgot Password</a>
            </div>
        </div>
    )
}

export default LoginPage