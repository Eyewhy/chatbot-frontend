import { useState, useEffect } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";

import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import { useAuth } from "../services/authProvider";
import apiRequest from "../api/apirequest";

function ContactAgencySection({ defaultMessage, organizationId }) {
  const [contactMethod, setContactMethod] = useState("");
  const [body, setBody] = useState(defaultMessage || "");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const auth = useAuth();
  const signedIn = auth?.checkLoggedIn?.();

  useEffect(() => {
    if (!body && defaultMessage) {
      setBody(defaultMessage);
    }
  }, [defaultMessage]);

  const handleSend = async () => {
    if (sent || loading) return;
    if (!organizationId) {
      toast("Organization ID is required.");
      return;
    }

    if (!signedIn && (!contactMethod || contactMethod.trim() === "")) {
      toast("Please enter your contact info before sending.");
      return;
    }

    setLoading(true);
    setSent(true);
    const payload = {
      organization_id: organizationId,
      contact_method: contactMethod || undefined,
      body: body || undefined,
    };

    const res = await apiRequest("user/notify_admin/", "POST", payload, true, signedIn);
    setLoading(false);

    if (res !== "error") {
      toast("Contact request sent.");
      setContactMethod("");
    } else {
      setSent(false);
    }
  };

  return (
    <>
      <Typography>Contact Agency</Typography>
      <TextField
        label={signedIn ? "Contact method (optional)" : "Email / Phone"}
        size="small"
        fullWidth
        value={contactMethod}
        onChange={(event) => setContactMethod(event.target.value)}
      />
      <TextField
        label="Message"
        size="small"
        fullWidth
        multiline
        minRows={3}
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="success"
        onClick={handleSend}
        disabled={loading || sent}
        startIcon={<AddIcCallIcon />}
      >
        {loading ? "Sending…" : sent ? "Request Sent" : "Contact Agency"}
      </Button>
    </>
  );
}

export default ContactAgencySection;
