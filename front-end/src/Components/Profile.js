import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "../LoadingBar"; // Import LoadingBar

function Profile() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(
    auth && auth.profileImage
      ? `http://localhost:4500/${auth.profileImage}`
      : null
  );
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const [showFileInput, setShowFileInput] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for profile image upload

  // Handle file selection and preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl); // Set preview for immediate display
    }
  };

  // Handle profile image upload
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    setLoading(true); // Start loading state

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const response = await fetch(
        `https://story-api-pgo4.onrender.com/profile/${auth._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update the user profile in local storage and state
        const updatedUser = data.user;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setAuth(updatedUser);
        // Update preview and message
        setPreview(`http://localhost:4500/${updatedUser.profileImage}`);
        setMessage(data.message || "Profile image updated successfully.");
      } else {
        setMessage(
          data.message || "Error uploading profile image. Please try again."
        );
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setMessage("Error uploading profile image. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the operation is complete
    }
  };

  return (
    <div>
      {loading ? (
        // When loading is true, show the LoadingBar centered
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <LoadingBar />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            marginTop: "20px",
          }}
        >
          {auth ? (
            <div>
              <div className="procard">
                <div className="proimage">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <p>No profile image available</p>
                  )}
                </div>
                <div className="procard-info">
                  <span>@{auth.name}</span>
                  <p>{auth.email}</p>
                </div>
                <a href="#" className="probutton">
                  Follow
                </a>
              </div>
              {!showFileInput ? (
                <>
                  <button
                    onClick={() => setShowFileInput(true)}
                    style={{ marginTop: "20px" }}
                    className="inpdddut"
                  >
                    Change Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="incontainer">
                    <label htmlFor="arquivo">Choose a file:</label>
                    <input
                      accept=".jpg, .jpeg, .png, .gif, .pdf"
                      className="inpdddut"
                      name="arquivo"
                      id="arquivo"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <button className="inpdddut" type="submit">
                      Update Profile
                    </button>
                  </div>
                  {message && <p>{message}</p>}
                </form>
              )}
              <h4>
                <Link onClick={logout} to="/signup">
                  Logout
                </Link>
              </h4>
            </div>
          ) : (
            <p>No user logged in</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
