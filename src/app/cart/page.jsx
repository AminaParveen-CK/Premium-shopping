'use client';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, incrementQty,decrementQty} = useContext(CartContext);

  const router = useRouter();

  if (cartItems.length === 0) {
    return <p>Your cart is empty!</p>;
  }
  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);


  const handleCheckout = () => {
    router.push('/checkout/step1');
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow the drop
    e.target.classList.add("border-blue-500", "bg-blue-100"); 
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // Get the dragged product from dataTransfer
    e.target.classList.remove("border-blue-500", "bg-blue-100");
    const product = JSON.parse(e.dataTransfer.getData('product'));
    addToCart(product); // Add the dropped product to the cart
  };

  return (

    <div className="max-w-6xl mx-auto mt-8 p-4 bg-white text-black dark:bg-gray-900 dark:text-white" 
         onDrop={handleDrop}
         onDragOver={handleDragOver} >
    <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.title}
              className="h-20 object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">${item.price}</p>
              <div className="flex items-center space-x-2 mt-1">
                <button onClick={() => decrementQty(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded">
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
           
            <Trash/>
        
          </button>
        </div>
      ))}
    </div>

    <div className="flex justify-between items-center mt-8">
      <button
        onClick={clearCart}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
      >
        Clear Cart
      </button>
      <div className="font-semibold text-xl">
        Total: ${total.toFixed(2)}
      </div>
    </div>

     {/* Checkout Button */}
     <div className="mt-6 text-center">
        <button onClick={handleCheckout} className="px-6 py-3 bg-blue-950 text-white rounded hover:bg-gray-700">
          Proceed to Checkout
        </button>
      </div>

  </div>

  );
}
