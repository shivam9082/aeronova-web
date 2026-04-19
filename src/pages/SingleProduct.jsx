import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setSelectedProduct,
  clearSelectedProduct,
} from "../redux/slices/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

// Formats price as ₹ with Indian locale. Always shows a number.
const formatPrice = (price) => {
  const numericPrice =
    typeof price === "number" && !isNaN(price) ? price : 0;
  return `₹${numericPrice.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.selectedProduct);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartItem = cartItems.find((item) => item.product?._id === product?._id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL || "http://localhost:3001"}/products/${productId}`,
        );
        dispatch(setSelectedProduct(res.data));
      } catch (err) {
        console.error("Product not found");
      }
    };

    fetchProduct();
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, productId]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-6">
      <div className="card w-full max-w-4xl bg-base-100 shadow-2xl border border-base-300">
        {/* Image Section */}
        <figure className="flex justify-center items-center bg-base-200 p-6">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="
              max-h-96
              w-auto
              object-contain
              rounded-xl
              shadow-md
            "
          />
        </figure>

        {/* Content Section */}
        <div className="card-body px-8 py-6 space-y-4">
          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {product.title}
          </h1>

          {/* Category */}
          <div className="badge badge-primary badge-outline w-fit">
            {product.category}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Price */}
          <p className="text-2xl font-semibold text-success">
            {formatPrice(product.price ?? 0)}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {cartItem ? (
              <div className="flex items-center gap-4 bg-base-200 rounded-lg px-4 py-2 w-fit">
                <button
                  className="btn btn-sm btn-ghost text-xl"
                  onClick={() => dispatch(decreaseQuantity(product._id))}
                >
                  -
                </button>
                <span className="font-bold text-lg">{cartItem.quantity} in cart</span>
                <button
                  className="btn btn-sm btn-ghost text-xl"
                  onClick={() => dispatch(increaseQuantity(product._id))}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary px-8"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart 🛒
              </button>
            )}
            
            <button
              className="btn btn-outline"
              onClick={() => navigate('/cart')}
            >
              Go to Cart
            </button>
          </div>
          {/* Price Note */}
          <div className="pt-6 border-t border-base-300">
            <p className="text-sm text-gray-500 italic">
              Prices are indicative and may vary based on quantity, location and
              customization requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
