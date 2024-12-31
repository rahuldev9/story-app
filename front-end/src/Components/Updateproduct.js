import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBar from "../LoadingBar"; // Import the LoadingBar component

function UpdateProduct() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading
  const params = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  // Function to fetch product details
  const getProductDetails = async () => {
    setLoading(true); // Start loading
    try {
      let result = await fetch(`http://localhost:4500/product/${params.id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error fetching product details", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to update the product
  const updateProduct = async (e) => {
    e.preventDefault(); // Prevent form submission if validation fails
    
    if (!message.trim()) {
        setError(true); // Show error if message is empty
        return;
    }

    const formData = new FormData();
    formData.append("message", message);
    setLoading(true); // Start loading
    try {
      let result = await fetch(`http://localhost:4500/product/${params.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.warn(result);
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setError(true);
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
      {loading ? (
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
        <>
          <h2>Update Product</h2>
          <div className="form-container" style={{ width: '80%' }}>
            <form className="form" onSubmit={updateProduct}>
              <div className="form-group">
                <label htmlFor="textarea">You can Edit now</label>
                <textarea
                  name="textarea"
                  id="textarea"
                  cols="50"
                  value={message}
                  type="text"
                  placeholder="Type Something...."
                  onChange={(e) => setMessage(e.target.value)}
                  rows="8"
                  style={{ width: "80%", display: "flex", alignSelf: "center" }}
                ></textarea>
              </div>
              <button className="form-submit-btn" type="submit">
                Submit
              </button>
              {error && <span style={{ color: 'red', marginBottom: '10px' }}>Message is empty</span>}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateProduct;
