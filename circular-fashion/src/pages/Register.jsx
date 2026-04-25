import "./Auth.css";
import { useState } from "react";
import { registerUser} from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
});

const[message, setMessage] = useState("");
const[error, setError] = useState("");

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value});
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  const data = await registerUser(form);
  
  if (data?.access) {
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    localStorage.setItem("username", data.username);

  navigate("/profile");
  } else {
    setError("Registration failed. Please try again.");
  }
};

return(
  <div className="auth-container">
    <div className="auth-card">
      <h2>Create Account</h2>
      <p className="auth-subtitle">
        Join Rot8te and start shopping sustainably
      </p>
      <form onSubmit={handleSubmit}>
        <input 
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />

      <input
      name="email"
      type="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      required
    />

    <input
      name="password"
      type="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      required
    />

    <button type="submit">Register</button>
    </form>

    {message && <p className="auth-message success">{message}</p>}
    {error && <p className="auth-message error">{error}</p>}

    
     <p className="auth-switch">
      Already have an account?{" "}
      <Link to="/login">Log in</Link>
     </p>
    </div>
   </div>
);
}
