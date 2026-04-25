import { useState, useEffect } from "react";
import {useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function ResetPasswordConfirm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const[searchParams] = useSearchParams();
  const navigate = useNavigate();

 //Get UID and token from URL 
 useEffect(() => {
  const urlUid = searchParams.get("uid");
  const urlToken = searchParams.get("token");

  if(urlUid && urlToken) {
    setUid(decodeURIComponent(urlUid));
    setToken(decodeURIComponent(urlToken));

  } else {
    setError("Invalid or missing reset link.");
  }
 }, [searchParams]);
  
// handleSubmit to send new password to Django backend
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");

  // Check passwords match before sending
  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }
  
  try {
    const res = await api.post("/password-reset-confirm/", {uid, token, password});
    const data = await res.json();

    if(res.ok) {
      setMessage("Password reset successful! Redirecting to login..." );
      setTimeout(() => navigate("/login"), 2000);

    } else {
      setError(data.error || "Something went wrong. Please try again.");

    }
  } catch (err) {
    setError("Network error. Please try again.");
  }
};

return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Set New Password</h2>
      <p className="auth-subtitle">Enter your new password below</p>
      <form onSubmit={handleSubmit}>
        <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} required />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
      </form>

      {message && <p className="auth-message success">{message}</p>}
      {error && <p className="auth-message error">{error}</p>}
      <p className="back-login">
        <Link to="/login">
        Back to Login
        </Link>
      </p>
    </div>
  </div>
);
}

 