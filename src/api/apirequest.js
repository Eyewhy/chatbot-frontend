import { getToken } from "../services/authProvider";
import { backend } from "../App";

/**
 * 
 * @param {str} url no leading /
 * @param {str} method "GET" or "POST"
 * @param {object} body JSON body if POST
 * @param {boolean} auth needs authentication
 * @returns 
 */
async function apiRequest(url, method, body=null, auth=true) {
    const token = getToken();

    const fetchParams = {
        method: method,
        headers: {
            "X-CSRFToken": document.cookie?.match(/csrftoken=([\w-]+)/)?.[1],
        }
    }
    if (auth) fetchParams['headers']['authorization'] = token;
    if (body !== null) {
        fetchParams['headers']['Content-Type'] = 'application/json';
        fetchParams['body'] = JSON.stringify(body);
    }
    try {
        let res = await fetch(`${backend}/${url}`, fetchParams)
        let data = await res.json();
        if (res.ok === false) return 'error';
        return data;
    } catch (e) {
        console.log(e);
        return 'error';
    };
}

export default apiRequest