// api.config.ts
/**
 * This file should contain all the API endpoints of javacinno
 */
export const API_CONFIG = {
  // localhost
  baseUrl: "http://127.0.0.1:8081",
  // deployed
  // baseUrl: "https://javacinno.onrender.com",
  endpoints: {
    products: '/api/v1/products/',
    cashier: '/api/v1/cashier/',
    transaction: '/api/v1/transaction/',
    sales: '/api/v1/sales/transaction/',
    createSales: '/api/v1/sales/',

  }
};


export type EndpointKey = keyof typeof API_CONFIG.endpoints;
