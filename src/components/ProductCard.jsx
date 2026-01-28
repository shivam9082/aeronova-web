import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/slices/productSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const isAdmin = authUser?.role === "admin"; // ✅ ROLE BASED CHECK
  //const authUser = useSelector((state) => state.auth.user);

  console.log("AUTH USER FROM REDUX 👉", authUser);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/products/${product._id}`, {
        withCredentials: true,
      });

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

        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold">₹{product.price}</span>

          <button
            className="btn btn-sm btn-outline"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            View
          </button>
        </div>

        {/* 🔐 ADMIN CONTROLS */}
        {isAdmin && (
          <div className="flex gap-2 mt-3 w-full">
            <button
              className="btn btn-sm btn-outline flex-1"
              onClick={() => navigate(`/admin/products/update/${product._id}`)}
            >
              Edit
            </button>

            <button
              className="btn btn-sm btn-outline flex-1"
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
