import { useState } from "react";
import axios from "axios";
import {
  validateTitle,
  validateDescription,
  validatePrice,
  validateCategory,
  validateImage,
} from "../utils/formValidation";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const CATEGORIES = [
  "Government|Smart City",
  "Sustainable Product",
  "Industrial Compliance",
  "Renewable Energy",
  "Environmental Infrastructure",
  "Others",
];

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
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageError = validateImage(file);

    if (imageError) {
      setError(imageError);
      setImage(null);
      setPreview(null);
    } else {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const validateForm = () => {
    const errors = {};

    const titleError = validateTitle(formData.title);
    if (titleError) errors.title = titleError;

    const descError = validateDescription(formData.description);
    if (descError) errors.description = descError;

    const priceError = validatePrice(formData.price);
    if (priceError) errors.price = priceError;

    const categoryError = validateCategory(formData.category, CATEGORIES);
    if (categoryError) errors.category = categoryError;

    if (!image) {
      errors.image = "Image is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("image", image);

      const res = await axios.post(`${API_URL}/products`, data, {
        withCredentials: true,
      });

      setMessage(res.data.message);
      setFormData({ title: "", description: "", price: "", category: "" });
      setImage(null);
      setPreview(null);
      setValidationErrors({});
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
              <label className="label font-medium pb-0">Product Title</label>
              <input
                type="text"
                name="title"
                className={`input input-bordered w-full ${validationErrors.title ? "input-error" : ""}`}
                value={formData.title}
                onChange={handleChange}
                required
              />
              {validationErrors.title && (
                <span className="text-error text-sm">
                  {validationErrors.title}
                </span>
              )}
            </div>

            <div className="divider my-0" />

            {/* Description */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">Description</label>
              <textarea
                name="description"
                className={`textarea textarea-bordered w-full ${validationErrors.description ? "textarea-error" : ""}`}
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
              {validationErrors.description && (
                <span className="text-error text-sm">
                  {validationErrors.description}
                </span>
              )}
            </div>

            <div className="divider my-0" />

            {/* Price */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">Price (₹)</label>
              <input
                type="text"
                name="price"
                className={`input input-bordered w-full ${validationErrors.price ? "input-error" : ""}`}
                value={formData.price}
                onChange={handleChange}
                required
              />
              {validationErrors.price && (
                <span className="text-error text-sm">
                  {validationErrors.price}
                </span>
              )}
            </div>

            <div className="divider my-0" />

            {/* Category */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">Category</label>
              <select
                name="category"
                className={`select select-bordered w-full ${validationErrors.category ? "select-error" : ""}`}
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Government|Smart City">
                  Government|Smart City
                </option>
                <option value="Sustainable Product">Sustainable Product</option>
                <option value="Industrial Compliance">
                  Industrial Compliance
                </option>
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="Environmental Infrastructure">
                  Environmental Infrastructure
                </option>
                <option value="Others">Others</option>
              </select>
              {validationErrors.category && (
                <span className="text-error text-sm">
                  {validationErrors.category}
                </span>
              )}
            </div>

            <div className="divider my-0" />

            {/* Image */}
            <div className="space-y-2">
              <label className="label font-medium pb-0">Product Image</label>
              <input
                type="file"
                accept="image/*"
                className={`file-input file-input-bordered w-full ${validationErrors.image ? "file-input-error" : ""}`}
                onChange={handleImageChange}
                required
              />
              {validationErrors.image && (
                <span className="text-error text-sm">
                  {validationErrors.image}
                </span>
              )}
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
