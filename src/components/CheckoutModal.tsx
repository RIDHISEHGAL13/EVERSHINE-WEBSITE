import React, { useState } from 'react';
import { X, CreditCard, Lock, MapPin, User, Mail, Phone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShippingAddress } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States'
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'UPI' | 'COD'>('Card');

  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  if (!isOpen) return null;

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingAddress.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingAddress.address.trim()) newErrors.address = 'Address is required';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
    if (!shippingAddress.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    if (paymentMethod === 'Card') {
      if (!paymentData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
      }
      if (!paymentData.cvv.match(/^\d{3,4}$/)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      if (!paymentData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
    } else if (paymentMethod === 'UPI') {
      if (!paymentData.upiId || !/^\S+@\S+$/.test(paymentData.upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      processOrder();
    }
  };

  const processOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: 'shipping' | 'payment'
  ) => {
    const { name, value } = e.target;
    
    if (section === 'shipping') {
      setShippingAddress(prev => ({ ...prev, [name]: value }));
    } else {
      let formattedValue = value;
      
      // Format card number
      if (name === 'cardNumber') {
        formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      }
      
      // Format expiry date
      if (name === 'expiryDate') {
        formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      }
      
      // Format CVV
      if (name === 'cvv') {
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
      }
      
      setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetModal = () => {
    setStep(1);
    setOrderComplete(false);
    setErrors({});
    onClose();
  };

  if (orderComplete) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. You will receive an email confirmation shortly.
            </p>
            
            <button
              onClick={resetModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-6 lg:p-8">
              {/* Progress Steps */}
              <div className="flex items-center mb-8">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <MapPin className="h-4 w-4" />
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <CreditCard className="h-4 w-4" />
                </div>
              </div>

              {step === 1 ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={shippingAddress.firstName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={shippingAddress.lastName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.lastName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingAddress.address}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingAddress.city}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.city ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.postalCode ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={paymentMethod}
                      onChange={e => setPaymentMethod(e.target.value as 'Card' | 'UPI' | 'COD')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Card">Credit/Debit Card</option>
                      <option value="UPI">UPI</option>
                      <option value="COD">Cash on Delivery (COD)</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    {paymentMethod === 'Card' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentData.cardNumber}
                              onChange={e => handleInputChange(e, 'payment')}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'}`}
                            />
                            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                          {errors.cardNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={paymentData.expiryDate}
                              onChange={e => handleInputChange(e, 'payment')}
                              placeholder="MM/YY"
                              maxLength={5}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'}`}
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={paymentData.cvv}
                              onChange={e => handleInputChange(e, 'payment')}
                              placeholder="123"
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? 'border-red-300' : 'border-gray-300'}`}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={paymentData.cardName}
                            onChange={e => handleInputChange(e, 'payment')}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardName ? 'border-red-300' : 'border-gray-300'}`}
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                          )}
                        </div>
                      </>
                    )}
                    {paymentMethod === 'UPI' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                        <input
                          type="text"
                          name="upiId"
                          value={paymentData.upiId || ''}
                          onChange={e => handleInputChange(e, 'payment')}
                          placeholder="example@upi"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.upiId ? 'border-red-300' : 'border-gray-300'}`}
                        />
                        {errors.upiId && (
                          <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>
                        )}
                      </div>
                    )}
                    {paymentMethod === 'COD' && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                        You will pay with cash when your order is delivered.
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                    <Lock className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-700">
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Back
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : step === 1 ? (
                    'Continue to Payment'
                  ) : (
                    'Complete Order'
                  )}
                </button>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="bg-gray-50 p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{(item.product.price * 83 * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{(total * 83).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹{(total * 0.1 * 83).toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{(total * 1.1 * 83).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}