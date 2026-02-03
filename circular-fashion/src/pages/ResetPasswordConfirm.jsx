import { useState, useEffect } from "react";
import {useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ResetPasswordConfirm() {
  const [password, setPassword] = useState("");
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
 
 //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Set New Password</h2>
        <p className="auth-subtitle">
          Enter your new password below</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit">Reset Password</button>
        </form>
        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}

        {/* Back to login link */}
        <p className="back-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}