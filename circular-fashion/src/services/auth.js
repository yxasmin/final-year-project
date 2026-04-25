// Register a new user
import api from "../api";

export const registerUser = async (userData) => {
  const res = await api.post("/register/", userData);
  const data = await res.json();
  return data;
};

//Login an existing user
export const loginUser = async (userData) => {
  const res = await api.post("/login/", userData);
  const data = await res.json();
  return data;
  };

