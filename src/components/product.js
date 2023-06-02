import React, { useState, useEffect } from "react";
import "./App.css";

const ProductBox = ({ imageUrl, name, price, description }) => {
  const handleEdit = () => {
    // Handle edit functionality here
    const updatedName = prompt("Enter new name:", name);
    const updatedPrice = prompt("Enter new price:", price);
    const updatedDescription = prompt("Enter new description:", description);

    if (updatedName && updatedPrice && updatedDescription) {
      const updatedProduct = {
        name: updatedName,
        price: updatedPrice,
        description: updatedDescription,
      };

      // Send updated product data to the server
      fetch(`http://localhost/store/edit.php?id=${name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Product updated successfully:", data);
          // Add logic to handle the updated product data as needed
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
  };

  const handleDelete = () => {
    // Handle delete functionality here
    fetch(`http://localhost/store/delete.php?id=${name}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product deleted successfully:", data);
        // Add logic to handle the deleted product data as needed
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="product-box">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p>{description}</p>
      <button className="edit-button" onClick={handleEdit}>
        Edit
      </button>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

const AppIn = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product details from the API
    fetch("http://localhost/store/fetch.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <div className="product-container">
        {products.map((product, index) => (
          <ProductBox
            key={index}
            imageUrl={"http://localhost/store/" + product.imgURL}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AppIn;
