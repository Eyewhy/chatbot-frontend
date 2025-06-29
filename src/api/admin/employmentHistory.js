import apiRequest from "../apirequest";
import { toast } from "react-toastify";

/**
 * Add a new employment history entry for a helper
 * @param {object} body - employment history data
 */
async function addEmploymentHistory(body) {
    return apiRequest(`employmenthistory/`, 'POST', body, false).then((res) => {
        if (res === 'error') return toast("Failed to add employment history.");
        toast("Employment history added successfully.");
        return res;
    });
}

/**
 * Update an existing employment history entry
 * @param {int} entry_id
 * @param {object} body - updated employment history data
 */
async function updateEmploymentHistory(entry_id, body) {
    return apiRequest(`employmenthistory/${entry_id}/`, 'POST', body, false).then((res) => {
        if (res === 'error') return toast("Failed to update employment history.");
        toast("Employment history updated successfully.");
        return res;
    });
}

/**
 * Delete an employment history entry
 * @param {int} entry_id
 */
async function deleteEmploymentHistory(entry_id) {
    return apiRequest(`employmenthistory/${entry_id}/`, 'DELETE', null, false).then((res) => {
        if (res === 'error') return toast("Failed to delete employment history.");
        toast("Employment history deleted successfully.");
        return res;
    });
}

export { addEmploymentHistory, updateEmploymentHistory, deleteEmploymentHistory };
