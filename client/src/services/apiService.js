import $ from 'jquery';

const API_BASE = 'http://localhost:3000/api';

const request = (method, endpoint, data = null, options = {}) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${API_BASE}${endpoint}`,
      method: method,
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null,
      xhrFields: { 
        withCredentials: true  
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

const apiService = {
  get: (endpoint, options = {}) => request('GET', endpoint, null, options),
  post: (endpoint, data, options = {}) => request('POST', endpoint, data, options),
  patch: (endpoint, data = {}, options = {}) => request('PATCH', endpoint, data, options),
  put: (endpoint, data, options = {}) => request('PUT', endpoint, data, options),
  delete: (endpoint, options = {}) => request('DELETE', endpoint, null, options),
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