// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { auth, db,collection } from "@/firebase/config"; // Firebase config
// import {collection, doc, setDoc, getDoc } from "firebase/firestore";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {

//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (auth.currentUser) {
//         // Fetch from Firestore if user is logged in
//         const cartRef = doc(db, "carts", auth.currentUser.uid);
//         const cartSnapshot = await getDoc(cartRef);

//         if (cartSnapshot.exists) {
//           setCartItems(cartSnapshot.data().items || []);
//         } else {
//           setCartItems([]);
//         }
//       } else {
//         // If not logged in, fetch cart from localStorage
//         const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//         setCartItems(savedCart);
//       }
//     };

//     fetchCart();
//   }, [auth.currentUser]);

//   const addToCart = (product) => {
//     const existingItem = cartItems.find((item) => item.id === product.id);
//     if (existingItem) {
//       setCartItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }

//     if (auth.currentUser) {
//       // Save to Firestore if user is logged in
//       const cartRef = doc(db, "carts", auth.currentUser.uid); // Reference the user's cart document
//       setDoc(cartRef, { items: cartItems }, { merge: true }) // Use merge to update without overwriting
//         .then(() => {
//           console.log("Cart saved successfully to Firestore!");
//         })
//         .catch((error) => {
//           console.error("Error saving cart to Firestore:", error);
//         });
//     } else {
//       // Save to localStorage if user is not logged in
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//     }
//   };

//   const incrementQty = (id) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(updatedCartItems);
  
//     if (auth.currentUser) {
//       const userCartRef = doc(db, "carts", auth.currentUser.uid);
//       setDoc(userCartRef, { items: updatedCartItems }, { merge: true });
//     } else {
//       localStorage.setItem("cart", JSON.stringify(updatedCartItems));
//     }
//   };
  

//   const decrementQty = (id) => {
//     setCartItems((prevItems) =>
//       prevItems
//         .map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );

//     if (auth.currentUser) {
//       // Save to Firestore if user is logged in
//       db.collection("carts").doc(auth.currentUser.uid).set({
//         items: cartItems,
//       });
//     } else {
//       // Save to localStorage if user is not logged in
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//     }
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

//     if (auth.currentUser) {
//       // Remove from Firestore if user is logged in
//       db.collection("carts").doc(auth.currentUser.uid).set({
//         items: cartItems.filter((item) => item.id !== id),
//       });
//     } else {
//       // Remove from localStorage if user is not logged in
//       localStorage.setItem("cart", JSON.stringify(cartItems.filter((item) => item.id !== id)));
//     }
//   };

//   const clearCart = () => {
//     setCartItems([]);

//     if (auth.currentUser) {
//       // Clear cart from Firestore if user is logged in
//       db.collection("carts").doc(auth.currentUser.uid).set({ items: [] });
//     } else {
//       // Clear cart from localStorage if user is not logged in
//       localStorage.removeItem("cart");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         incrementQty,
//         decrementQty,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


// // import { createContext, useContext, useEffect, useState } from "react";
// // import { db, auth } from "firebase/config"; // Import db and auth from your Firebase config
// //  // Import Firestore functions

// // const CartContext = createContext();

// // export const CartProvider = ({ children }) => {
// //   const [cartItems, setCartItems] = useState([]);
  
// //   // Fetch cart from Firestore on mount
// //   useEffect(() => {
// //     if (auth.currentUser) {
// //       const fetchCart = async () => {
// //         try {
// //           const cartRef = doc(db, "carts", auth.currentUser.uid);
// //           const cartSnapshot = await getDoc(cartRef);
          
// //           if (cartSnapshot.exists()) {
// //             setCartItems(cartSnapshot.data().items || []);
// //           }
// //         } catch (error) {
// //           console.error("Error fetching cart:", error);
// //         }
// //       };
// //       fetchCart();
// //     } else {
// //       const savedCart = localStorage.getItem("cart");
// //       if (savedCart) {
// //         setCartItems(JSON.parse(savedCart));
// //       }
// //     }
// //   }, []);

// //   const addToCart = async (product) => {
// //     const existingItem = cartItems.find((item) => item.id === product.id);
    
// //     if (existingItem) {
// //       setCartItems((prevItems) =>
// //         prevItems.map((item) =>
// //           item.id === product.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         )
// //       );
// //     } else {
// //       setCartItems([...cartItems, { ...product, quantity: 1 }]);
// //     }

// //     if (auth.currentUser) {
// //       // Save to Firestore if the user is logged in
// //       try {
// //         const cartRef = doc(db, "carts", auth.currentUser.uid); // Get the reference to the user's cart
// //         await setDoc(cartRef, { items: cartItems }, { merge: true }); // Merge to update the cart
// //         console.log("Cart saved successfully to Firestore!");
// //       } catch (error) {
// //         console.error("Error saving cart to Firestore:", error);
// //       }
// //     } else {
// //       // Save to localStorage if the user is not logged in
// //       localStorage.setItem("cart", JSON.stringify(cartItems));
// //     }
// //   };

// //   const removeFromCart = (productId) => {
// //     setCartItems(cartItems.filter((item) => item.id !== productId));

// //     if (auth.currentUser) {
// //       // Remove from Firestore if user is logged in
// //       const cartRef = doc(db, "carts", auth.currentUser.uid);
// //       setDoc(cartRef, { items: cartItems }, { merge: true });
// //     } else {
// //       // Remove from localStorage if user is not logged in
// //       localStorage.setItem("cart", JSON.stringify(cartItems));
// //     }
// //   };

// //   const clearCart = () => {
// //     setCartItems([]);

// //     if (auth.currentUser) {
// //       // Clear Firestore if user is logged in
// //       const cartRef = doc(db, "carts", auth.currentUser.uid);
// //       setDoc(cartRef, { items: [] });
// //     } else {
// //       // Clear localStorage if user is not logged in
// //       localStorage.removeItem("cart");
// //     }
// //   };

// //   return (
// //     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => useContext(CartContext);

"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/firebase/config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;

      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnapshot = await getDoc(cartRef);

        if (cartSnapshot.exists()) {
          setCartItems(cartSnapshot.data().items || []);
        } else {
          setCartItems([]);
        }
      } else {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
      }
    };

    fetchCart();
  }, []); // Only on mount

  const updateCartStorage = async (newCart) => {
    if (auth.currentUser) {
      const cartRef = doc(db, "carts", auth.currentUser.uid);
      await setDoc(cartRef, { items: newCart }, { merge: true });
    } else {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const addToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    await updateCartStorage(updatedCart);
  };

  const incrementQty = async (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    await updateCartStorage(updatedCartItems);
  };

  const decrementQty = async (id) => {
    const updatedCartItems = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCartItems);
    await updateCartStorage(updatedCartItems);
  };

  const removeFromCart = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    await updateCartStorage(updatedCart);
  };

  const clearCart = async () => {
    setCartItems([]);
    await updateCartStorage([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQty,
        decrementQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
