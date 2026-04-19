import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const formatPrice = (price) => {
  const numericPrice = typeof price === "number" && !isNaN(price) ? price : 0;
  return `₹${numericPrice.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const validCartItems = cartItems.filter((item) => item && item.product && item.product._id);

  const subtotal = validCartItems.reduce((acc, item) => acc + ((item.product.price || 0) * (item.quantity || 1)), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  // Protect route
  useEffect(() => {
    if (validCartItems.length === 0 && !success) {
      navigate("/");
    }
  }, [validCartItems.length, success, navigate]);

  const handlePayment = () => {
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      dispatch(clearCart());
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
        <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
          <div className="card-body text-center py-12">
            <div className="text-7xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-success mb-2">Payment Successful!</h2>
            <p className="text-gray-500 mb-8">
              Thank you for your purchase. Your order has been placed and is being processed.
            </p>
            <button className="btn btn-primary w-full" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 md:p-10 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        
        {/* Payment Methods Section */}
        <div className="flex-1">
          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl border-b border-base-300 pb-4 mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                {/* Credit Card Option */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-base-300 hover:border-gray-400'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="radio radio-primary" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">Credit / Debit Card</h3>
                    <p className="text-sm text-gray-500">Secure encrypted payment</p>
                  </div>
                  <span className="text-2xl">💳</span>
                </label>

                {/* UPI Option */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-base-300 hover:border-gray-400'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="radio radio-primary" 
                    checked={paymentMethod === 'upi'} 
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">UPI</h3>
                    <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
                  </div>
                  <span className="text-3xl">📱</span>
                </label>

                {/* Cash on Delivery Option */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-base-300 hover:border-gray-400'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="radio radio-primary" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">Cash on Delivery</h3>
                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                  </div>
                  <span className="text-2xl">💵</span>
                </label>
              </div>

            </div>
          </div>
        </div>

        {/* Amount Summary Sidebar */}
        <div className="w-full md:w-96">
          <div className="card bg-base-100 shadow-md border border-base-300 sticky top-24">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4 border-b border-base-300 pb-2">Amount to Pay</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({validCartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="divider my-1"></div>
                <div className="flex justify-between">
                  <span className="font-bold text-xl">Grand Total</span>
                  <span className="font-bold text-2xl text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                className="btn btn-primary w-full text-lg h-14 shadow-lg shadow-primary/30"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Processing...
                  </>
                ) : (
                  paymentMethod === 'cod' ? 'Confirm Order' : `Pay ${formatPrice(total)}`
                )}
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                🔒 Secure 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
