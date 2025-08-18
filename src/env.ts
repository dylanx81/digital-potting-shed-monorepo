// Simple environment configuration for garden app
export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  AUTH_SECRET: process.env.AUTH_SECRET || "dev-secret",
};
