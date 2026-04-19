import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/slices/productSlice";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";

// Formats price as ₹ with Indian locale (e.g. ₹1,23,456). Always shows a number.
const formatPrice = (price) => {
  const numericPrice = typeof price === "number" && !isNaN(price) ? price : 0;
  return `₹${numericPrice.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const isAdmin = authUser?.role === "admin";

  // Client-side price fallback (belt-and-suspenders on top of the API guarantee)
  const price = product?.price ?? 0;
  const priceDisplay = formatPrice(price);

  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartItem = cartItems.find((item) => item.product._id === product._id);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL || "http://localhost:3001"}/products/${product._id}`,
        {
          withCredentials: true,
        },
      );

      dispatch(removeProduct(product._id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete product");
    }
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl">
      <figure
        className="cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-48 w-full object-cover rounded-t-xl"
        />
      </figure>

      <div className="card-body p-4">
        <h3 className="font-semibold text-lg truncate">{product.title}</h3>

        {/* Category badge */}
        {product.category && (
          <span className="badge badge-outline badge-sm text-xs mt-1">
            {product.category}
          </span>
        )}

        {/* Price + View button row */}
        <div className="flex justify-between items-center mt-3">
          {/* Price display */}
          <span className="font-bold text-base text-primary">
            {priceDisplay}
          </span>

          <button
            className="btn btn-sm btn-outline"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            View
          </button>
        </div>

        {/* Cart Controls */}
        {authUser && (
          <div className="mt-4">
            {cartItem ? (
              <div className="flex items-center justify-between bg-base-200 rounded-lg p-1">
                <button
                  className="btn btn-sm btn-ghost text-lg"
                  onClick={(e) => { e.stopPropagation(); dispatch(decreaseQuantity(product._id)); }}
                >
                  -
                </button>
                <span className="font-bold text-sm">{cartItem.quantity} in cart</span>
                <button
                  className="btn btn-sm btn-ghost text-lg"
                  onClick={(e) => { e.stopPropagation(); dispatch(increaseQuantity(product._id)); }}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn btn-sm btn-primary w-full"
                onClick={(e) => { e.stopPropagation(); dispatch(addToCart(product)); }}
              >
                Add to Cart 🛒
              </button>
            )}
          </div>
        )}

        {/* ADMIN CONTROLS */}
        {isAdmin && (
          <div className="flex gap-2 mt-3 w-full">
            <button
              className="btn btn-sm btn-outline flex-1"
              onClick={() =>
                navigate(`/admin/products/update/${product._id}`)
              }
            >
              Edit
            </button>

            <button
              className="btn btn-sm btn-error btn-outline flex-1"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
