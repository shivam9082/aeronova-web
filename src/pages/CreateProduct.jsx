import { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("image", image);

      const res = await axios.post(
        "http://localhost:3000/products",
        data,
        { withCredentials: true }
      );

      setMessage(res.data.message);
      setFormData({ title: "", description: "", price: "", category: "" });
      setImage(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-primary/20">
        <div className="card-body space-y-4">
          <h2 className="text-2xl font-bold text-center text-primary">
            Create Product
          </h2>

          {message && (
            <p className="text-green-600 text-center font-medium">{message}</p>
          )}
          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center py-2">
              <img
                src={preview}
                alt="preview"
                className="w-36 h-36 object-cover rounded-xl border border-primary/30 shadow-sm"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="divider my-0" />

            {/* Description */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">
                Description
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="divider my-0" />

            {/* Price */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">
                Price (₹)
              </label>
              <input
                type="text"
                name="price"
                className="input input-bordered w-full"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="divider my-0" />

            {/* Category */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">
                Category
              </label>
              <select
                name="category"
                className="select select-bordered w-full"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="software">Government|Smart City</option>
                <option value="hardware">Sustainable Product</option>
                <option value="service">Industrial Compliance</option>
                <option value="service">Renewable Energy</option>
                <option value="service">Environmental Infrastructure</option>
                <option value="service">Others</option>

              </select>
            </div>

            <div className="divider my-0" />

            {/* Image */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleImageChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
