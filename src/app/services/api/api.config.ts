// api.config.ts
/**
 * This file should contain all the API endpoints of javacinno
 */
export const API_CONFIG = {
  baseUrl: "http://127.0.0.1:8081",
  endpoints: {
    products: '/api/v1/products/',
    cashier: '/api/v1/cashier/',

  }
};


export type EndpointKey = keyof typeof API_CONFIG.endpoints;