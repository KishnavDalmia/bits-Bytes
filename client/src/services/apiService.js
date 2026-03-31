import $ from 'jquery';

const API_BASE = 'http://localhost:3000/api';

/**
 * jQuery-based API Service
 * Wraps jQuery AJAX with Promise support and standardized error handling
 */
const request = (method, endpoint, data = null, options = {}) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${API_BASE}${endpoint}`,
      method: method,
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null,
      xhrFields: { 
        withCredentials: true  // Enable cookies/credentials
      },
      crossDomain: true,
      timeout: options.timeout || 30000,
      success: (response, textStatus, jqXHR) => {
        resolve({
          data: response,
          status: jqXHR.status,
          statusText: textStatus
        });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        const error = {
          status: jqXHR.status,
          statusText: textStatus,
          message: jqXHR.responseJSON?.message || errorThrown || 'Request failed',
          data: jqXHR.responseJSON || null
        };
        reject(error);
      }
    });
  });
};

/**
 * API Service Object
 * Provides RESTful methods for HTTP requests
 */
const apiService = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint (e.g., '/orders/pending')
   * @param {object} options - Optional configuration
   * @returns {Promise} Resolves with response data
   */
  get: (endpoint, options = {}) => request('GET', endpoint, null, options),

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Optional configuration
   * @returns {Promise} Resolves with response data
   */
  post: (endpoint, data, options = {}) => request('POST', endpoint, data, options),

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Optional configuration
   * @returns {Promise} Resolves with response data
   */
  patch: (endpoint, data = {}, options = {}) => request('PATCH', endpoint, data, options),

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Optional configuration
   * @returns {Promise} Resolves with response data
   */
  put: (endpoint, data, options = {}) => request('PUT', endpoint, data, options),

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Optional configuration
   * @returns {Promise} Resolves with response data
   */
  delete: (endpoint, options = {}) => request('DELETE', endpoint, null, options),

  /**
   * Custom request with full options
   * @param {object} config - Full jQuery AJAX configuration
   * @returns {Promise} Resolves with response data
   */
  request: (config) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        contentType: 'application/json',
        xhrFields: { withCredentials: true },
        crossDomain: true,
        ...config,
        url: config.url.startsWith('http') ? config.url : `${API_BASE}${config.url}`,
        success: (response, textStatus, jqXHR) => {
          resolve({
            data: response,
            status: jqXHR.status,
            statusText: textStatus
          });
        },
        error: (jqXHR, textStatus, errorThrown) => {
          const error = {
            status: jqXHR.status,
            statusText: textStatus,
            message: jqXHR.responseJSON?.message || errorThrown || 'Request failed',
            data: jqXHR.responseJSON || null
          };
          reject(error);
        }
      });
    });
  }
};

export default apiService;