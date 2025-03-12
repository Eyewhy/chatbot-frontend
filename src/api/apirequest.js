import { getToken } from "../services/authProvider";
import { backend } from "../App";
import { toast } from "react-toastify";

/**
 * 
 * @param {str} url no leading /
 * @param {str} method "GET", "POST", "DELETE"
 * @param {object} body JSON body if POST
 * @param {boolean} parse_json if response has JSON
 * @param {boolean} auth needs authentication
 * @returns 
 */
async function apiRequest(url, method, body=null, parse_json=true, auth=true) {
    const token = getToken();

    if (method === 'DELETE') {
        if (!window.confirm('Are you sure you want to delete this item?')) return 'error';
    }

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
        console.log(res);
        if (res.ok === false) {
            let res_text = await res.text();
            processResText(res_text);
            return 'error';
        }

        if (!parse_json) return res; // end here if no parsing required

        let data = await res.json(); // end here if parsing required
        return data;
    } catch (e) {
        console.log(e);
        return 'error';
    };
}

async function fileRequest(url, file) {
    const token = getToken();
    console.log(file.name);
    const fetchParams = {
        method: "POST",
        body: file,
        
        headers: {
            "X-CSRFToken": document.cookie?.match(/csrftoken=([\w-]+)/)?.[1],
            "Content-Type": file.type,
            "Content-Length": `${file.size}`,
            "Content-Disposition": `attachment; filename="${file.name}"`,
            "authorization": token,
        },
    }
    try {
        let res = await fetch(`${backend}/${url}`, fetchParams)
        console.log(res);
        if (res.ok === false) return 'error';

        return res; // end here if no parsing required
    } catch (e) {
        console.log(e);
        return 'error';
    };
}

function processResText(res_text) {
    // check for json object
    if (res_text[0] === '{') {
        res_text = JSON.parse(res_text);
        res_text = res_text[Object.keys(res_text)[0]];
    }
    if (res_text === 'Invalid token.') {
        res_text = 'Please login again!';
        window.location.href = '#/account';
    }
    toast(`Error: ${res_text}`);
}

export default apiRequest
export { fileRequest }