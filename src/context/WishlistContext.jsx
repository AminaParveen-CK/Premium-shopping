"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/firebase/config"; // Import Firebase config
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (auth.currentUser) {
        // Fetch from Firestore if user is logged in
        const wishlistRef = doc(db, "wishlist", auth.currentUser.uid);
        const wishlistSnapshot = await getDoc(wishlistRef);

        if (wishlistSnapshot.exists()) {
          setWishlistItems(wishlistSnapshot.data().items || []);
        } else {
          setWishlistItems([]);
        }
      } else {
        // If not logged in, fetch wishlist from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistItems(savedWishlist);
      }
    };

    fetchWishlist();
  }, [auth.currentUser]);

  const addToWishlist = (product) => {
    const existingItem = wishlistItems.find((item) => item.id === product.id);
    if (!existingItem) {
      const updatedWishlist = [...wishlistItems, product];
      setWishlistItems(updatedWishlist);

      if (auth.currentUser) {
        // Save to Firestore if user is logged in
        const wishlistRef = doc(db, "wishlist", auth.currentUser.uid);
        setDoc(wishlistRef, { items: updatedWishlist }, { merge: true });
      } else {
        // Save to localStorage if user is not logged in
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
    }
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);

    if (auth.currentUser) {
      // Remove from Firestore if user is logged in
      const wishlistRef = doc(db, "wishlist", auth.currentUser.uid);
      setDoc(wishlistRef, { items: updatedWishlist }, { merge: true });
    } else {
      // Remove from localStorage if user is not logged in
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
