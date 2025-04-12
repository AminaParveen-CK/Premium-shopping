"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/firebase/config"; // Firebase config
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"; // Firestore functions
import { useWishlist } from "@/context/WishlistContext"; // Use Wishlist Context

export default function ProfilePage() {
  const { wishlistItems, removeFromWishlist } = useWishlist(); // Make sure this is working now
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch order history and wishlist when the component mounts
  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (auth.currentUser) {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => doc.data());
        setOrderHistory(orders);
      }
    };

    const fetchWishlist = async () => {
      if (auth.currentUser) {
        const wishlistRef = doc(db, "wishlists", auth.currentUser.uid);
        const wishlistSnapshot = await getDoc(wishlistRef);
        if (wishlistSnapshot.exists()) {
          setWishlistItems(wishlistSnapshot.data().items || []);
        }
      }
    };

    if (auth.currentUser) {
      fetchOrderHistory();
      fetchWishlist();
    }

    setLoading(false);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
      {loading ? (
        <p>Loading your wishlist...</p>
      ) : wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlistItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div className="flex space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <span>{item.name}</span>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Order History</h2>
      {loading ? (
        <p>Loading your orders...</p>
      ) : orderHistory.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <ul className="space-y-4">
          {orderHistory.map((order, index) => (
            <li key={index} className="border-b py-4">
              <div>
                <span className="font-semibold">Order #{index + 1}</span>
              </div>
              <div className="space-y-2 mt-2">
                <span className="block">Total: ${order.total}</span>
                <span className="block">Date: {new Date(order.date.seconds * 1000).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
