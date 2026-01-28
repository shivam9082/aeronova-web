import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setSelectedProduct,
  clearSelectedProduct,
} from "../redux/slices/productSlice";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(
    (state) => state.product.selectedProduct
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/products/${productId}`
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
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-2xl font-semibold text-success">
            ₹ {product.price}
          </p>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button className="btn btn-primary px-8">
              Buy Now
            </button>
            <button className="btn btn-outline">
              Interested
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
