import React , { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { addToOrganizationRequest } from "../../../api/users";
import { useAuth } from "../../../services/authProvider";

function JoinOrganizationPage({ setActivePage }) {
    const {
        register,
        handleSubmit,
        formState: {errors, ...formState}
    } = useForm();

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setActivePage("");
    },[])

    async function onSubmit(data) {
        addToOrganizationRequest(data.name, data.pass).then((res) => {
            if (res !== 'error') navigate('/referral')
        });
    }

    return (
        <div style={{maxWidth: "300px"}} class="m-2">
            <p class="lead my-2">{auth.user}'s Account</p>
            <div class="d-flex flex-column mt-2">
                <h4>Join Organization</h4>
                
                <form class="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                    <span class="lead">Organization Name</span>
                    <input type="text" class="m-1" {
                        ...register("name", {required:true})}/>
                    <span class="lead">Organization Passphrase</span>
                    <input type="text" class="m-1" {
                        ...register("pass", {required:true})}/>
                    <input type="submit" class="m-1" value="Join Organization"/>
                </form>
            </div>
        </div>
    )
}

export default JoinOrganizationPage