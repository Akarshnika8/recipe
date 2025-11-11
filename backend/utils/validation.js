// Email validation
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Password validation
const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

// Name validation
const validateName = (name) => {
  return name && name.trim().length > 0 && name.length <= 100;
};

// Recipe title validation
const validateTitle = (title) => {
  return title && title.trim().length > 0 && title.length <= 150;
};

// Recipe description validation
const validateDescription = (description) => {
  return description && description.trim().length > 0 && description.length <= 1000;
};

// Ingredients validation
const validateIngredients = (ingredients) => {
  return (
    Array.isArray(ingredients) &&
    ingredients.length > 0 &&
    ingredients.every(ing => typeof ing === 'string' && ing.trim().length > 0)
  );
};

// Validate signup input
const validateSignupInput = (name, email, password) => {
  const errors = [];

  if (!validateName(name)) {
    errors.push('Name is required and must be less than 100 characters');
  }

  if (!validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!validatePassword(password)) {
    errors.push('Password must be at least 6 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate login input
const validateLoginInput = (email, password) => {
  const errors = [];

  if (!validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate recipe input
const validateRecipeInput = (title, description, ingredients) => {
  const errors = [];

  if (!validateTitle(title)) {
    errors.push('Title is required and must be less than 150 characters');
  }

  if (!validateDescription(description)) {
    errors.push('Description is required and must be less than 1000 characters');
  }

  if (!validateIngredients(ingredients)) {
    errors.push('At least one ingredient is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateTitle,
  validateDescription,
  validateIngredients,
  validateSignupInput,
  validateLoginInput,
  validateRecipeInput
};
