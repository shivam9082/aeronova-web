import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/products/${productId}`
        );
        setFormData({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          category: res.data.category,
        });
        setPreview(res.data.imageUrl);
      } catch {
        setError("Failed to load product");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) =>
        data.append(key, formData[key])
      );
      if (image) data.append("image", image);

      await axios.put(
        `http://localhost:3000/products/${productId}`,
        data,
        { withCredentials: true }
      );

      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            Update Product
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 mx-auto object-cover rounded-lg"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Title"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Price"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
              <option value="service">Service</option>
            </select>

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
            />

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
