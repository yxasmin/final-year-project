import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPasswordRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/password-reset/", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage(data.message || "If the email exists, a reset link has been sent.");
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
           <h2>Reset Password</h2>
           <p className="auth-subtitle">
            Enter your email to recieve a password reset link
           </p>

           <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="password"
              id="password"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
       </form>

       {message && <p className="auth-message success">{message}</p>}
       {error && <p className="auth-message error">{error}</p>}

       <div className="auth-links">
         <Link to="/login">Back to Login</Link>
       </div>
     </div>
    </div>
    );
}