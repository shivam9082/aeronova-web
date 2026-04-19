import { useSelector, useDispatch } from "react-redux";
import { 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart, 
  clearCart 
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) => {
  const numericPrice = typeof price === "number" && !isNaN(price) ? price : 0;
  return `₹${numericPrice.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

const Cart = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validCartItems = cartItems.filter((item) => item && item.product && item.product._id);

  const subtotal = validCartItems.reduce((acc, item) => acc + ((item.product.price || 0) * (item.quantity || 1)), 0);
  const tax = subtotal * 0.18; // Mock 18% tax
  const total = subtotal + tax;

  if (validCartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-base-200">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{validCartItems.length} Items</h2>
            <button 
              className="btn btn-sm btn-ghost text-red-500"
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your cart?")) {
                  dispatch(clearCart());
                }
              }}
            >
              Clear Cart
            </button>
          </div>

          {validCartItems.map((item) => (
            <div key={item.product._id} className="card bg-base-100 shadow-sm border border-base-300 flex-row overflow-hidden">
              <figure className="w-32 md:w-48 bg-base-200 cursor-pointer" onClick={() => navigate(`/products/${item.product._id}`)}>
                <img 
                  src={item.product.imageUrl} 
                  alt={item.product.title} 
                  className="h-full w-full object-cover" 
                />
              </figure>
              <div className="card-body p-4 w-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg md:text-xl truncate">{item.product.title}</h3>
                  <div className="badge badge-outline mt-1">{item.product.category}</div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
                  <span className="font-bold text-primary text-xl">
                    {formatPrice(item.product.price)}
                  </span>
                  
                  <div className="flex items-center gap-4">
                    {/* Quantity controls */}
                    <div className="flex items-center bg-base-200 rounded-lg p-1">
                      <button 
                        className="btn btn-sm btn-ghost text-lg"
                        onClick={() => dispatch(decreaseQuantity(item.product._id))}
                      >
                        -
                      </button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        className="btn btn-sm btn-ghost text-lg"
                        onClick={() => dispatch(increaseQuantity(item.product._id))}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="btn btn-square btn-sm btn-ghost text-red-500"
                      onClick={() => dispatch(removeFromCart(item.product._id))}
                      title="Remove Item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="card bg-base-100 shadow-md border border-base-300 sticky top-24">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4 border-b border-base-300 pb-2">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (18%)</span>
                  <span className="font-semibold text-gray-900">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-success">Free</span>
                </div>
                <div className="divider my-1"></div>
                <div className="flex justify-between">
                  <span className="font-bold text-xl">Total</span>
                  <span className="font-bold text-xl text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                className="btn btn-primary w-full text-lg h-14 shadow-lg shadow-primary/30"
                onClick={() => navigate("/payment")}
              >
                Proceed to Checkout
              </button>
              
              <button 
                className="btn btn-ghost w-full mt-2"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
