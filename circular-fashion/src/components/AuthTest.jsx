import { useState } from "react";

export default function AuthTest() {
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
     const res = await fetch("http://127.0.0.1:8000/api/register/", {
       method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify({ 
        username: "testuser2", 
        password: "Test1234", 
        email: "test@example.com"
      }),

       });
       
       const data = await res.json();
       setMessage(JSON.stringify(data));
    };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
           username: "testuser2",
           password: "Test1234"
          }),
      });

      const data = await res.json();
      setMessage(JSON.stringify(data));
      if (data.access) {
         localStorage.setItem("accessToken", data.access);
      }
    } catch (err) {
      setMessage("Error:" + err.message);
    }
  };


const handleProfile = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://127.0.0.1:8000/api/profile/", {
      headers: { Authorization: `Bearer ${token}`},
    });
    const data = await res.json();
    setMessage(JSON.stringify(data));
  } catch (err) {
    setMessage("Error:" + err.message);
  }
};


return (
    <div>
      <h2>Test Django Auth APIs</h2>
      <button onClick={handleRegister} style ={{marginRight: "10px"}}>Register</button>
      <button onClick={handleLogin} style = {{marginRight: "10px"}}>Login</button>
      <button onClick={handleProfile}>Profile (Protected)</button>
    <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
      <strong>Response:</strong> {message}
    </div>
    </div>
);
}