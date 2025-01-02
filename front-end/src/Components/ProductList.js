import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "../LoadingBar"; // Import LoadingBar

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const [productToDelete, setProductToDelete] = useState(null); // Track product to delete

  useEffect(() => {
    getProducts(); // Fetch products when the component mounts
  }, []);

  const getProducts = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`https://story-api-pgo4.onrender.com/products/${userid}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setLoading(false); // Set loading to false when data is fetched
    setProducts(result); // Set products data
  };

  const deleteproduct = async (id) => {
    let result = await fetch(`https://story-api-pgo4.onrender.com/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      setShowPopup(false); // Close the popup after deletion
      getProducts(); // Refresh the product list
    }
  };

  const handleOpenPopup = (productId) => {
    setProductToDelete(productId); // Set the product ID to be deleted
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
    setProductToDelete(null); // Reset the product to delete
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
          <h1>My posts</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {products.length > 0 ? (
              products.map((item, index) => (
                <div
                 
                  style={{
                    border: "1px solid #ccc",
                    margin: "10px",
                    padding: "10px",
                    textAlign: "center",
                    height: "auto",
                    width: "80%",
                    // maxHeight:'250px',
                    // overflow:'auto',
                    // scrollbarWidth: "none", 
                    // msOverflowStyle: "none"
                  }}
                  key={index}
                >
                  {showPopup && productToDelete === item._id && (
                    <div style={styles.overlay}>
                      <div style={styles.popup}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                          }}
                        >
                          <button
                            className="exit-popbutton"
                            onClick={handleClosePopup}
                          >
                            <svg height="20px" viewBox="0 0 384 512">
                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                            </svg>
                          </button>
                        </div>
                        <p className="card-heading">Delete file?</p>
                        <p className="card-description">
                          Do you really want to delete these records? This
                          process cannot be undone.
                        </p>
                        <div className="card-button-wrapper">
                          <button
                            className="card-button secondary"
                            onClick={handleClosePopup}
                          >
                            Cancel
                          </button>
                          <button
                            className="card-button primary"
                            onClick={() => deleteproduct(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div class="main" style={{width:"100%"}}>
                    <div class="card" style={{width:"100%",height:'100%',maxHeight:'250px',overflow:'auto',scrollbarWidth: "none", 
                    msOverflowStyle: "none"}}>
                      <div class="card_content" >
                        <p>{item.message}</p>
                      </div>
                      <div class="card_back"></div>
                    </div>
                    <div class="data">
                      <div class="img"></div>
                      <div class="text">
                        <div class="text_s">@{item.name}</div>
                      </div>
                    </div>
                    <div class="btns">
                      <div class="likes">
                        <svg class="likes_svg" viewBox="-2 0 105 92">
                          <path d="M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z"></path>
                        </svg>
                        <span class="likes_text">{item.likes}</span>
                      </div>
                      <button
                        className="card-button primary"
                        onClick={() => handleOpenPopup(item._id)}
                        style={{
                          height: "30px",
                          background: "#FF3333",
                          color: "white",
                          border: "none",
                          width:'50px'
                        }}
                      >
                      <i class="fa-solid fa-trash" ></i>
                      </button>
                      <button
                        className="card-button primary"
                        style={{
                          height: "30px",
                          background: "#FF3333",
                          color: "white",
                          border: "none",
                          width:'50px'
                        }}
                      ><Link to={`/update/${item._id}`} style={{textDecoration:'none',color:'white'}}><i class="fa-solid fa-pen-to-square"></i></Link>
                      </button>

                      
                      {/* <div class="comments">
                        <svg
                          class="comments_svg"
                          viewBox="-405.9 238 56.3 54.8"
                          title="Comment"
                        >
                          <path d="M-391 291.4c0 1.5 1.2 1.7 1.9 1.2 1.8-1.6 15.9-14.6 15.9-14.6h19.3c3.8 0 4.4-.8 4.4-4.5v-31.1c0-3.7-.8-4.5-4.4-4.5h-47.4c-3.6 0-4.4.9-4.4 4.5v31.1c0 3.7.7 4.4 4.4 4.4h10.4v13.5z"></path>
                        </svg>
                        <span class="comments_text">12</span>
                      </div> */}
                      {/* <div class="views">
                        <svg
                          class="views_svg"
                          viewBox="0 0 30.5 16.5"
                          title="Views"
                        >
                          <path d="M15.3 0C8.9 0 3.3 3.3 0 8.3c3.3 5 8.9 8.3 15.3 8.3s12-3.3 15.3-8.3C27.3 3.3 21.7 0 15.3 0zm0 14.5c-3.4 0-6.2-2.8-6.2-6.2C9 4.8 11.8 2 15.3 2c3.4 0 6.2 2.8 6.2 6.2 0 3.5-2.8 6.3-6.2 6.3z"></path>
                        </svg>
                        <span class="views_text">332</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Results</h1>
            )}
          </div>
          <div style={{ height: "150px" }}>
            <button>refresh</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  popup: {
    background: "#fff",
    padding: "20px",
    width: "250px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default ProductList;
