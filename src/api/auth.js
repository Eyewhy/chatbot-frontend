import apiRequest from "./apirequest"

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
    const res = await apiRequest('auth/logout/', 'POST', {}, false);
    if (res === 'error') return 'error';
    return 'succcess';
}

async function resetRequest(email) {
    const res = await apiRequest('auth/password/reset/', 'POST', {'email':email}, false);
    if (res === 'error') return 'error';
    return 'succcess';
}

async function resetConfirmRequest(uid, token, new_ps1, new_ps2) {
    const body = {
        'uid':uid,
        'token':token,
        'new_password1':new_ps1,
        'new_password2':new_ps2
    }
    const res = await apiRequest('auth/password/reset/confirm/', 'POST', body, false);
    if (res === 'error') return 'error';
    return 'succcess';
}

async function changePasswordRequest(new_ps1, new_ps2) {
    const body = {
        'new_password1':new_ps1,
        'new_password2':new_ps2
    }
    const res = await apiRequest('auth/password/change/', 'POST', body, false);
    if (res === 'error') return 'error';
    return 'succcess';
}

async function registerRequest(username, ps1, ps2, email) {
    const body = {
        'username': username,
        'password1': ps1,
        'password2': ps2,
        'email': email,
    }
    const res = await apiRequest('auth/registration/', 'POST', body, false);
    if (res === 'error') return 'error';
    return 'succcess';
}

export { loginRequest, logoutRequest, resetRequest, resetConfirmRequest, changePasswordRequest, registerRequest };