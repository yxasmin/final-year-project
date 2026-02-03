import "./Auth.css";
import { useState } from "react";
import { loginUser} from "../services/auth"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    username: "",
    password: "",
});

const [message, setMessage] = useState("");

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value});
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = await loginUser(form);

  if (data?.access) {
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("username", form.username);
    navigate("/profile");
  } else{
    setMessage("Invalid username or password");
  }
};

return (
   <div className="auth-container">
    <div className="auth-card">
      <h2>Welcome Back</h2>
      <p className="auth-subtitle">Log in to your account</p>

       <Link to="/reset-password" className="forgot-link">
       Forgot password?
       </Link>
      <form onSubmit={handleSubmit}>
        <input 
          name="username"
          placeholder="Username"
          value={form.username}
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

            <button type="submit">Login</button>
            </form>

            {message && <p className="auth-error">{message}</p>}

         
              
              <p className="auth-switch">
                Don't have an account? {" "}
                <Link to="/register">Register</Link>
              </p>
            </div>
         </div>
      );
    }
