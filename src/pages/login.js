import React , { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../services/authProvider"

function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const [feedback, setFeedback] = useState("Welcome to Admin Panel.");

    const auth = useAuth();

    async function onSubmit(data) {
        // TODO request backend
        console.log(data.username);
        console.log(data.password);
        if (data.username === "" || data.password === "") {
            setFeedback("Please provide a valid input!");
            return;
        }
        auth.login(data.username, data.password).then((res) => {
            if (res === 'error') {
                setFeedback("Login Failed!");
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
                        ...register("username", {required:true})
                    }/>
                    <span class="lead">Password</span>
                    <input type="password" class="m-1" {
                        ...register("password", {required:true})
                    }/>
                    <input type="submit" class="m-1" value="Login"/>
                    <small>{feedback}</small>
                </form>    
            </div>
            
        </div>
    )
}

export default Login