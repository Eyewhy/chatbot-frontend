import { useState, useEffect, useRef } from "react";
import { Button, Paper, Typography, TextField, Box } from "@mui/material";
import { toast } from "react-toastify";

import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import { useAuth } from "../services/authProvider";
import apiRequest from "../api/apirequest";

function ContactAgencySection({ defaultMessage }) {
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
    if (!signedIn) {
      window.location.href = "#/login";
      return;
    }

    setLoading(true);
    setSent(true);
    const payload = {
      contact_method: contactMethod || undefined,
      body: body || undefined,
    };

    const res = await apiRequest("user/notify_admin/", "POST", payload, true, true);
    setLoading(false);

    if (res !== "error") {
      toast("Contact request sent.");
      setContactMethod("");
    }
  };

  return (
    <>
      <Typography>Contact Agency</Typography>
      <TextField
        label="Contact method (optional)"
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
      {signedIn ? (
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
      ) : (
        <Button fullWidth variant="contained" color="info" onClick={() => (window.location.href = "#/login") } startIcon={<AddIcCallIcon />}>
          Contact Agency
        </Button>
      )}
    </>
  );
}

export default ContactAgencySection;
