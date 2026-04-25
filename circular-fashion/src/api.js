const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

//Attempt to refresh using stored refresh token
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if(!refreshToken) return null;

    const res = await fetch(`${BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({refresh: refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    localStorage.setItem("accessToken", data.access);
    return data.access;
}

async function apiFetch(endpoint, options = {}) {
    let token = localStorage.getItem("accessToken");

    const makeRequest = (t) =>
      fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type" : "application/json",
            ...(t ? { Authorization: `Bearer ${t}`} : {}),
            ...options.headers,        
        },
      });
    
    let res = await makeRequest(token);

    //if 401, try refreshing the token once and retry
    if(res.status === 401 && endpoint !== "/login/") {
      const newToken = await refreshAccessToken();
      if(newToken) {
        res = await makeRequest(newToken);
      } else {
        //failed refresh clear tokens and return null
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
      }
    }
    
    return res;
  }

  export const api = {
    get: (endpoint) => apiFetch(endpoint),
    post: (endpoint, body) => apiFetch(endpoint, {method: "POST", body: JSON.stringify(body) }),
    delete: (endpoint, body) => apiFetch(endpoint, { method: "DELETE", body: JSON.stringify(body) }),
  };

  export default api;

