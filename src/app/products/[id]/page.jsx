import React from "react";

// Dynamic Product Detail Page
const ProductDetail = async ({ params }) => {
  const { id } = params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    // Check if response is OK
    if (!res.ok) {
      console.error(`API returned status ${res.status}`);
      throw new Error("Failed to fetch product");
    }

    const product = await res.json();

    // Check if product data is valid
    if (!product || Object.keys(product).length === 0) {
      return <div>Product not found</div>;
    }

    return (
    <div className="w-[80%] h-[90vh] m-auto grid grid-cols-1 md:grid-cols-2 p-2">
      <div className="w-[50%} m-4 flex flex-col justify-center">
        <img src={product.image} alt={product.title} className="w-[65%]"/>
        </div>
        <div className="flex flex-col justify-center space-y-5 m-4">
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{product.title}</h1>
        <p style={{ marginTop: "1rem" }}>{product.description}</p>
        <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>₹{product.price}</p>
        
      </div>
    </div>
    );

  } catch (error) {
    console.error("Error fetching product:", error.message);
    return <div>Error fetching product. Please try again.</div>;
  }
};

export default ProductDetail;
