'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutStep2() {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Handle form changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!paymentInfo.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert('Checkout Complete! Thank you for your purchase.');
      router.push('/'); // Redirect to home page after successful order
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Step 2: Payment Information</h1>

      <div className="space-y-4">
        <div>
          <label className="block">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter your card number"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
        </div>
        <div>
          <label className="block">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="MM/YY"
          />
          {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
