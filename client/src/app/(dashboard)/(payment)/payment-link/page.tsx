"use client";
import React, { useState } from 'react';

interface FormValues {
  amount: string;
  description: string;
  expiryDate: string;
  customLink: string;
  fullName: string;
  email: string;
  feesOption: string;
  currency: string;
}

const PaymentForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    amount: '',
    description: '',
    expiryDate: '',
    customLink: '',
    fullName: '',
    email: '',
    feesOption: 'I will bear the fees',
    currency: 'GHS',
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are filled before proceeding
    const { amount, description, expiryDate, customLink, fullName, email } = formValues;
    if (!amount || !description || !expiryDate || !customLink || !fullName || !email) {
      alert('All fields are required.');
      return;
    }

    setIsGenerating(true);

    // Simulate a loading delay (e.g., API call)
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 2000); // 2 second delay to simulate loading
  };

  const handleBackToEdit = () => {
    setShowPreview(false); // Go back to the form
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start bg-gray-50 p-6 min-h-screen">
      {/* Left Side: Payment Form */}
      {!showPreview && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/2 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold mb-4">New Payment Link</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-700">Amount (Required)</label>
            <div className="relative mb-4">
              <select
                name="currency"
                className="absolute left-0 top-0 bottom-0 bg-gray-100 border border-gray-300 rounded-l-md px-4 py-2"
                value={formValues.currency}
                onChange={handleChange}
              >
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="NGN">NGN</option>
                <option value="GBP">GBP</option>
              </select>
              <input
                type="text"
                name="amount"
                className="pl-20 w-full border border-gray-300 rounded-r-md py-2 focus:outline-none focus:ring focus:border-blue-300"
                value={formValues.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </div>

            <label className="block mb-2 text-sm font-medium text-gray-700">Description (Required)</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
              value={formValues.description}
              onChange={handleChange}
              placeholder="This is a payment link for your monthly Kwasi Express subscription. Thanks for patronizing us!"
              required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Expiry Date (Required)</label>
            <input
              type="date"
              name="expiryDate"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
              value={formValues.expiryDate}
              onChange={handleChange}
              required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Custom Link Name (Required)</label>
            <div className="relative mb-4">
              <span className="absolute left-0 top-0 bottom-0 bg-gray-100 border border-gray-300 rounded-l-md px-4 py-2">
                https://nestsite.checkout.pay/
              </span>
              <input
                type="text"
                name="customLink"
                className="pl-48 w-full border border-gray-300 rounded-r-md py-2 focus:outline-none focus:ring focus:border-blue-300"
                value={formValues.customLink}
                onChange={handleChange}
                placeholder="Enter custom link"
                required
              />
            </div>

            <label className="block mb-2 text-sm font-medium text-gray-700">Who bears the fees on this payment link's transactions?</label>
            <select
              name="feesOption"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
              value={formValues.feesOption}
              onChange={handleChange}
            >
              <option value="I will bear the fees">I will bear the fees</option>
              <option value="Customer will bear the fees">Customer will bear the fees</option>
            </select>

            <label className="block mb-2 text-sm font-medium text-gray-700">Full Name (Required)</label>
            <input
              type="text"
              name="fullName"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
              value={formValues.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Email (Required)</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <button
              type="submit"
              className={`w-full py-2 rounded-md text-white ${isGenerating ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} transition duration-200`}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Create Payment Link'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Right Side: Payment Preview */}
      {showPreview && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-gray-500">Secured by Nestsite</span>
            <img src="/path-to-secure-icon.png" alt="Secure" />
          </div>

          <h3 className="text-xl font-semibold mb-2">{formValues.customLink}</h3>
          <p className="text-sm mb-4">{formValues.description}</p>

          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-lg font-semibold text-center">Pay {formValues.currency} {formValues.amount || '350.00'}</p>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
              value={formValues.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
              value={formValues.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Proceed</button>
          
          <button
            onClick={handleBackToEdit}
            className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Back to Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
