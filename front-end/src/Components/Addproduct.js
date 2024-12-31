import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from '../LoadingBar'; // Import LoadingBar component

function AddProduct() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  };

  const addProduct = async () => {
    if (!message.trim()) {
      setError(true); // Show error if message is empty
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const formData = {
      message,
      userid: user._id,
      name: user.name,
      time: getCurrentTime(),
    };

    setLoading(true); // Start loading

    try {
      const result = await fetch('https://story-api-pgo4.onrender.com/add-product', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });

      if (result.ok) {
        const data = await result.json();
        // console.log(data);
        navigate('/products'); // Navigate to products page after success
      } else {
        // console.error('Error adding product');
        setError(true); // Set error if the request failed
      }
    } catch (error) {
      // console.error('Error:', error);
      setError(true); // Set error if there's an exception
    } finally {
      
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      {loading ? (
        // Show LoadingBar while the product is being added
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
          <h2>Add Product</h2>
          <textarea
            type="text"
            placeholder="Enter product name"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError(false); // Reset error when user starts typing
            }}
            style={{
              width: '80%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '4px',
              border: error ? '1px solid red' : '1px solid #ccc',
            }}
          />
          {error && <span style={{ color: 'red', marginBottom: '10px' }}>Enter a valid product name</span>}
          <button
            onClick={addProduct}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add Product
          </button>
        </>
      )}
    </div>
  );
}

export default AddProduct;
