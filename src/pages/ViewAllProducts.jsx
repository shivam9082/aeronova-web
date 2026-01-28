import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ViewAllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product.products);
  const authUser = useSelector((state) => state.auth.user);
  const isAdmin = authUser?.role === "admin";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        dispatch(setProducts(res.data));
      } catch (err) {
        console.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={() => navigate(`/products/${product._id}`)}
          />
        ))}

        {/* Admin Create Product Box */}
        {isAdmin && (
          <div
            onClick={() => navigate("/admin/products/create")}
            className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl cursor-pointer border-2 border-dashed border-primary hover:border-solid min-h-48 flex items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-5xl mb-3">➕</div>
              <h3 className="text-xl font-semibold text-primary">
                Create Product
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Add a new product to your catalog
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllProducts;
