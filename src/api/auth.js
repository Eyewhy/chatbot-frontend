import apiRequest from "./apirequest"
import { toast } from "react-toastify";

/**
 * Logs the user in.
 * @param {String} username 
 * @param {String} password 
 * @returns {Promise<String>} token
 */
async function loginRequest(username, password) {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const body = {
        password: password
    }

    if (emailRegex.test(username)) {
        body['email'] = username;
    } else {
        body['username'] = username;
    }
    console.log(body);
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
        'username': username.toLowerCase(),
        'password1': ps1,
        'password2': ps2,
        'email': email,
    }
    return apiRequest('auth/registration/', 'POST', body, false);
}

async function userRequest() {
    return apiRequest('user/', 'GET');
}

async function userDeleteRequest() {
    return apiRequest('user/', 'DELETE');
}

async function editUserRequest(username, email) {
    const body = {username: username.toLowerCase(), email: email}
    return apiRequest('user/', 'POST', body, false).then((res) => {
        if (res === 'error') return toast("Oops, save failed. Please try again.");
        toast("User Info updated successfully.");
    });
}

export { loginRequest, logoutRequest, resetRequest, resetConfirmRequest, createConfirmRequest, changePasswordRequest, registerRequest, userRequest, userDeleteRequest, editUserRequest };