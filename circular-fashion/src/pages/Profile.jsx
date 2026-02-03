import "./Profile.css";

function Profile() {
  const username = localStorage.getItem("username");

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        <p className="welcome-text">
            Welcome back {username ? `, ${username}` : ""}
        </p>
        <div className="profile-info">
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Status:</strong> Logged in</p>
        </div>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          >
            Log out
          </button>
      </div>
    </div>
  );

}

export default Profile;