export const validatePrice = (price) => {
  const num = parseFloat(price);
  if (isNaN(num) || num <= 0) {
    return "Price must be a valid number greater than 0";
  }
  return null;
};

export const validateTitle = (title) => {
  if (!title || title.trim().length < 3) {
    return "Title must be at least 3 characters";
  }
  if (title.trim().length > 100) {
    return "Title must not exceed 100 characters";
  }
  return null;
};

export const validateDescription = (description) => {
  if (!description || description.trim().length < 10) {
    return "Description must be at least 10 characters";
  }
  if (description.trim().length > 1000) {
    return "Description must not exceed 1000 characters";
  }
  return null;
};

export const validateCategory = (category, validCategories) => {
  if (!category) {
    return "Category is required";
  }
  if (!validCategories.includes(category)) {
    return "Invalid category selected";
  }
  return null;
};

export const validateImage = (file) => {
  if (!file) {
    return "Image is required";
  }
  
  const validFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!validFormats.includes(file.type)) {
    return "Only JPEG, PNG, GIF, or WebP images are allowed";
  }
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return "Image size must not exceed 5MB";
  }
  
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};
