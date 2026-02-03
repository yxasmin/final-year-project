
// Register a new user
export const registerUser = async (userData) => {
  const res = await fetch("http://127.0.0.1:8000/api/register/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  return data;
};

//Login an existing user
export const loginUser = async (userData) => {
  const res = await fetch("http://127.0.0.1:8000/api/login/", {
    method: "POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

