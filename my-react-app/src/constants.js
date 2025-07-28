// Application-wide constants that define various configuration values
// These help maintain consistency across the app and make it easier to modify settings

// Pagination settings for todo lists
export const TODOS_PER_PAGE = 10;
export const API_ID_THRESHOLD = 150;

// Sorting options for todo items
export const SORT_MODES = {
  DEFAULT: 'id',
  ALPHA: 'alpha',
};

// Display settings for todo text
export const TODO_DISPLAY = {
  MAX_TEXT_LENGTH: 90, // Maximum characters to show before truncating
};

// Color scheme for different todo statuses
export const STATUS_COLORS = {
  COMPLETED: '#10b981', // Green for completed todos
  PENDING: '#f59e0b',   // Orange for pending todos
};

// Standard icon sizes used throughout the application
export const ICON_SIZES = {
  SMALL: 14,
  MEDIUM: 16,
  LARGE: 20,
  XLARGE: 24,
};

// Configuration for charts and visualizations
export const CHART_CONFIG = {
  PIE_CHART_LINE_WIDTH: 40,
};

// Time-related settings
export const TIME_CONFIG = {
  TIME_OFFSET_MS: 1000, // Time offset in milliseconds
};

// Test data for development and demo purposes
export const TEST_DATA = {
  DEFAULT_USERNAME: 'emilys',
  DEFAULT_PASSWORD: 'emilyspass',
};
