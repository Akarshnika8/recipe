
const SECURITY_CONFIG = {
  JWT_EXPIRY: '7d',
  BCRYPT_SALT_ROUNDS: 10,
  PASSWORD_MIN_LENGTH: 6,
  MAX_REQUEST_SIZE: '10mb'
};


const MESSAGES = {
  
  AUTH: {
    SIGNUP_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'Login successful',
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_EXISTS: 'Email already registered',
    TOKEN_MISSING: 'No token provided. Authorization required.',
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID: 'Invalid token',
    AUTH_ERROR: 'Authentication error'
  },

  
  RECIPE: {
    CREATED: 'Recipe created successfully',
    FETCHED: 'Recipe fetched successfully',
    RECIPES_FETCHED: 'Recipes fetched successfully',
    UPDATED: 'Recipe updated successfully',
    DELETED: 'Recipe deleted successfully',
    NOT_FOUND: 'Recipe not found',
    NOT_AUTHORIZED: 'You are not authorized to perform this action',
    UPDATE_NOT_AUTHORIZED: 'You are not authorized to update this recipe',
    DELETE_NOT_AUTHORIZED: 'You are not authorized to delete this recipe'
  },


  VALIDATION: {
    MISSING_FIELDS: 'Please provide all required fields',
    INVALID_EMAIL: 'Please provide a valid email',
    INVALID_PASSWORD: 'Password must be at least 6 characters',
    INVALID_NAME: 'Please provide a valid name',
    INVALID_TITLE: 'Please provide a valid recipe title',
    INVALID_DESCRIPTION: 'Please provide a valid recipe description',
    INVALID_INGREDIENTS: 'Please provide at least one ingredient'
  },

  
  GENERAL: {
    SUCCESS: 'Operation successful',
    ERROR: 'An error occurred',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Internal server error'
  }
};


const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500
};


const VALIDATION_RULES = {
  NAME: {
    MIN: 2,
    MAX: 100
  },
  EMAIL: {
    REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  PASSWORD: {
    MIN: 6
  },
  TITLE: {
    MIN: 3,
    MAX: 150
  },
  DESCRIPTION: {
    MIN: 10,
    MAX: 1000
  },
  INGREDIENTS: {
    MIN: 1,
    MAX: 50
  }
};

module.exports = {
  SECURITY_CONFIG,
  MESSAGES,
  STATUS_CODES,
  VALIDATION_RULES
};
