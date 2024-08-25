import { backend } from "../App";

/**
 * Logs the user in.
 * @param {String} username 
 * @param {String} password 
 * @returns {String} token
 */
async function loginRequest(username, password) {
    try {
        let res = await fetch(`${backend}/users/auth/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": document.cookie?.match(/csrftoken=([\w-]+)/)?.[1],
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        let data = await res.json();
        if (res.ok === false) return 'error';
        return 'Token ' + data['token'];
    } catch (e) {
        console.log(e);
        return 'error';
    };
}

export { loginRequest };