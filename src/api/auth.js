import apiRequest from "./apirequest"
import { toast } from "react-toastify";

/**
 * Logs the user in.
 * @param {String} username 
 * @param {String} password 
 * @returns {String} token
 */
async function loginRequest(username, password) {
    const body = {
        username: username,
        password: password,
    }
    const res = await apiRequest('auth/login/', 'POST', body, true, false);
    if (res === 'error') return 'error';
    return 'Token ' + res['key'];
}

async function logoutRequest() {
    return apiRequest('auth/logout/', 'POST', {}, false);
}

async function resetRequest(email) {
    return apiRequest('auth/password/reset/', 'POST', {'email':email}, false);
}

async function resetConfirmRequest(uid, token, new_ps1, new_ps2) {
    const body = {
        'uid':uid,
        'token':token,
        'new_password1':new_ps1,
        'new_password2':new_ps2
    }
    return apiRequest('auth/password/reset/confirm/', 'POST', body, false);
}

async function createConfirmRequest(keyy) {
    return apiRequest(`auth/registration/account-confirm-email/${keyy}/`, 'POST', {key:keyy}, false, false);
}

async function changePasswordRequest(new_ps1, new_ps2) {
    const body = {
        'new_password1':new_ps1,
        'new_password2':new_ps2
    }
    return apiRequest('auth/password/change/', 'POST', body, false);
}

async function registerRequest(username, ps1, ps2, email) {
    const body = {
        'username': username,
        'password1': ps1,
        'password2': ps2,
        'email': email,
    }
    return apiRequest('auth/registration/', 'POST', body, false);
}

async function userRequest() {
    return apiRequest('user/', 'GET');
}

async function editUserRequest(username, email) {
    const body = {username: username, email: email}
    return apiRequest('user/', 'POST', body, false).then((res) => {
        if (res === 'error') return toast("Oops, save failed. Please try again.");
        toast("User Info updated successfully.");
    });
}

export { loginRequest, logoutRequest, resetRequest, resetConfirmRequest, createConfirmRequest, changePasswordRequest, registerRequest, userRequest, editUserRequest };