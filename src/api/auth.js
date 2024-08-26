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
    const res = await apiRequest('users/auth/', 'POST', body, false);
    if (res === 'error') return 'error';
    return 'Token ' + res['token'];
}

export { loginRequest };