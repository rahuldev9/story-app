import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../LoadingBar"; // Import the LoadingBar component

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(); // Fetch products when component mounts
  }, []);

  const getProducts = async () => {
    try {
      const result = await fetch("https://story-api-pgo4.onrender.com/home", {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await result.json();
      setProducts(data);  // Set products after data is fetched
      setLoading(false);   // Stop loading once data is fetched
    } catch (err) {
      console.error("Error fetching products:", err);
    //   setLoading(false); // Stop loading even if there's an error
    }
  };

  // Toggle like/dislike for a product
  const toggleLike = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id; // Get logged-in user ID
      const result = await fetch(
        `http://localhost:4500/like-product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await result.json();
      // Update the product's like count and likedBy list
      setProducts(
        products.map((product) =>
          product._id === productId
            ? { ...product, likes: data.likes, likedBy: data.likedBy }
            : product
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        const result = await fetch(`https://story-api-pgo4.onrender.com/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        const data = await result.json();
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        // console.error("Error searching products:", err);
      }
    } else {
      getProducts(); // Re-fetch all products when search is cleared
    }
  };

  return (
    <div className="cards" style={{ textAlign: "center", marginTop: "50px" }}>
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
        <>
          <input
            id="query"
            className="input"
            type="search"
            placeholder="Search..."
            name="searchbar"
            onChange={searchHandle}
            style={{ width: "70%" }}
          />

          <div
            className="cards"
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            <div style={{height:'150px'}}>
                <button>refresh</button>
            </div>
            {products.length > 0 ? (
              
              products.map((item) => (
                
                <div
                  className="card red"
                  style={{
                    margin: "10px",
                    padding: "10px",
                    height: "auto",
                    width: "80%",
                    maxHeight:'250px',
                    overflow:'auto',
                    scrollbarWidth: "none", 
                    msOverflowStyle: "none"
                  }}
                  onDoubleClick={() => toggleLike(item._id)}
                  key={item._id}
                >
                  <p >{item.message}</p>
                  <div className="card-content">
                    <button
                      className="like"
                      onClick={() => toggleLike(item._id)}
                    >
                      <i
                        className="fa-solid fa-heart"
                        style={{
                          color: item.likedBy.includes(
                            JSON.parse(localStorage.getItem("user"))._id
                          )
                            ? "#c1121f"
                            : "#000000",
                        }}
                      ></i>
                      <p>{item.likes}</p>
                    </button>
                    <p className="card-para">@{item.name}</p>
                    <p className="card-para">{item.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Results</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
