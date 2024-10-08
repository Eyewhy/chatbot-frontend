import React, { useMemo, useState, useEffect } from "react";
import { useForm, handleSubmit } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Table from "../../../components/table";
import { toast } from "react-toastify";

import { organizationDetailRequest, changePassphraseRequest, deleteUserFromOrganizationRequest } from "../../../api/users";

function OrganizationPage ( {setActivePage }) {
    const [data, setData] = useState({'members':[]});
    const [state, setState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setActivePage("");
        ( async () => {
            await organizationDetailRequest().then((res) => {
                if (res === 'error') navigate('/account');
                console.log(res)
                setData(res);
            });
        })();
    },[state]);

    // TABLE
    const columns = useMemo(() => [
        {
            Header: "Username",
            accessor: "user.username",
        },
        {
            Header: "Email",
            accessor: "user.email"
        },
        {
            Header: "Date Joined",
            accessor: "user.date_joined",
        },
        {
            Header: "Delete",
            accessor: "id",
            Cell: props => <button class="btn btn-outline-danger" onClick={(e) => {
                deleteButton(props.row.original.id);
            }}>Delete</button>
        }
    ],[]);

    const deleteButton = (id) => { deleteUserFromOrganizationRequest(id).then((res) => {
        console.log(res);
        if (res !== 'error') {
            toast('Deleted.')
            setState(!state);
        }
    }); };
    
    // FORM
    const {
        register,
        handleSubmit,
        formState: {errors, ...formState}
    } = useForm();

    async function onSubmit(data) {
        if (data.pass1 !== data.pass2) {
            toast('Passphrases do not match!')
            return;
        }
        changePassphraseRequest(data.pass1).then((res) => {
            if (res !== 'error') { 
                toast('Passphrase change successful.')
                setState(!state);
            }
        });
    }
    return (
        <>
            <p class="lead m-2">Manage Organization</p>
            <div class="d-flex">
                <p class="m-2">
                    <h4>Organization Name</h4>
                    <span class="lead">{data['name']}</span>
                </p>
                <p class="m-2">
                    <h4>Organization Passphrase</h4>
                    <span class="lead">{data['passphrase']}</span>
                </p>
                <p class="m-2 ms-5">
                    <h4>Biodatas Scanned</h4>
                    <span class="lead">{data['documents_scanned']}</span>
                </p>
                <p class="m-2">
                    <h4>Q&A Refreshes</h4>
                    <span class="lead">{data['embeddings_generated']}</span>
                </p>
            </div>
            <span class="m-2">Provide the organization name & passphrase to users to allow them to join your organization.</span>
            
            <div class="m-2 mt-3" style={{maxWidth: "300px"}}>
                <h4>Change Passphrase</h4>
                
                <form class="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                    <span class="lead">Passphrase</span>
                    <input type="text" class="m-1" {
                        ...register("pass1", {required:true})}/>
                    <span class="lead">Confirm Passphrase</span>
                    <input type="text" class="m-1" {
                        ...register("pass2", {required:true})}/>
                    <input type="submit" class="m-1" value="Change Passphrase"/>
                </form>
                Passphrase must be at least 8 characters.
            </div>

            <h4 class="m-2 mt-3">Users</h4>
            <Table columns={columns} data={data['members']} />
        </>
    )
}

export default OrganizationPage