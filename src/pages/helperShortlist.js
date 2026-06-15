import { useShortlist } from "../services/shortlistProvider";

import { Box, Grid2, Link, Button, TextField } from "@mui/material"
import { useState } from 'react';
import { Header } from "../components/mui";
import HelperCard from "../components/helperCard"
import apiRequest from "../api/apirequest";
import { toast } from "react-toastify";
import { useAuth } from "../services/authProvider";

function HelperShortlist() {
    const shortlist = useShortlist();
    const [contactMethod, setContactMethod] = useState('');
    const [sending, setSending] = useState(false);
    const auth = useAuth();
    const allNotified = shortlist.shortlist && shortlist.shortlist.length > 0 && shortlist.shortlist.every(h => h.notified);

    async function notifyAgencies() {
        if (!auth || !auth.checkLoggedIn || !auth.checkLoggedIn()) {
            toast('Please login to continue.');
            window.location.href = '#/login';
            return;
        }
        try {
            if (!shortlist.shortlist || shortlist.shortlist.length === 0) {
                toast('No helpers shortlisted.');
                return;
            }
            // only notify helpers that haven't been notified yet
            const unnotified = shortlist.shortlist.filter(h => !h.notified);
            if (unnotified.length === 0) {
                toast('All shortlisted helpers have already been notified.');
                return;
            }
            const ids = unnotified.map(h => h.id);
            setSending(true);
            const body = { helper_ids: ids };
            if (contactMethod && contactMethod.trim() !== '') body.contact_method = contactMethod.trim();
            const res = await apiRequest('user/notify_helpers/', 'POST', body);
            setSending(false);
            const sentCount = Array.isArray(res.sent) ? res.sent.length : 0;
            const failedCount = Array.isArray(res.failed) ? res.failed.length : 0;
            if (failedCount === 0) toast(`Sent notifications for ${sentCount} helpers.`);
            else toast(`Sent notifications for ${sentCount} helpers; ${failedCount} failed.`);
            // mark successfully notified helpers
            if (Array.isArray(res.sent) && res.sent.length > 0) {
                if (shortlist && typeof shortlist.markNotified === 'function') shortlist.markNotified(res.sent);
            }
        } catch (e) {
            console.error(e);
            toast('Error sending notifications.');
        }
    }
    return (<>
        <Header text={`${shortlist.shortlist.length} Helpers Shortlisted`} />
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            <Grid2 container spacing={2}>
                {shortlist.shortlist.map((helper) => {
                    return (<Grid2 key={helper['id']} size={{lg:3, md:4, sm:4, xs:6}}>
                        <HelperCard key={helper['id']} data={helper}/>
                    </Grid2>)
                })}
            </Grid2>
            <Box sx={{display:'flex', flexDirection:'column', gap:1, alignItems:'center', width:'100%'}}>
                <Box sx={{display:'flex', gap:1, alignItems:'center', width:{xs:'100%', sm:'60%'}}}>
                            <TextField fullWidth size="small" placeholder="Optional contact info" value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} />
                            <Button variant="contained" color="primary" onClick={notifyAgencies} sx={{ whiteSpace: 'nowrap' }} disabled={sending || allNotified}>{sending ? 'Sending...' : (allNotified ? 'All Notified' : 'Notify Agencies')}</Button>
                </Box>
                <Link href="#/search" textAlign="center" variant="h6">Add more Helpers</Link>
            </Box>
        </Box>
        
    </>)
}

export default HelperShortlist