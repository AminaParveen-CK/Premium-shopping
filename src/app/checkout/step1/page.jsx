'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutStep1() {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Handle form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!shippingInfo.name) newErrors.name = 'Name is required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      router.push('/checkout/step2');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Step 1: Shipping Information</h1>

      <div className="space-y-4">
        <div>
          <label className="block">Full Name</label>
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block">Address</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter your address"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next: Payment Information
          </button>
        </div>
      </div>
    </div>
  );
}
