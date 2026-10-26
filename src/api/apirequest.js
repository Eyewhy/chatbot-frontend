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
        if (res.ok === false) {
            if (res.status === 403) {
                toast("Error: You are not authorized to perform this action.");
                return 'error';
            }
            if (res.status === 404) {
                toast("Error: The requested resource was not found.");
                return 'error';
            }
            if (res.status === 500) {
                toast("Error: Internal server error. Please try again later.");
                return 'error';
            }
            let res_text = await res.text();
            toast(processResText(res_text));
            return 'error';
        }

        if (!parse_json) return res; // end here if no parsing required

        let data = await res.json(); // end here if parsing required
        return data;
    } catch (e) {
        return 'error';
    };
}

async function fileRequest(url, file) {
    const token = getToken();
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
        if (res.ok === false) {
            let res_text = await res.text();
            toast(processResText(res_text));
            return 'error';
        }
        return res; // end here if no parsing required
    } catch (e) {
        return 'error';
    };
}

function processResText(res_text) {
    if (typeof res_text === 'string' && res_text.trim().startsWith('{')) {
        try {
            res_text = JSON.parse(res_text);
        } catch (e) {
            // Not valid JSON, keep as is
        }
    }
    if (typeof res_text === 'object' && res_text !== null) {
        const firstKey = Object.keys(res_text)[0];
        const firstVal = res_text[firstKey];
        res_text = Array.isArray(firstVal) ? firstVal[0] : firstVal;
    }
    if (res_text === 'Invalid token.') {
        res_text = 'Please login again!';
        window.location.href = '#/account';
    }
    return res_text;
}

export default apiRequest
export { fileRequest }