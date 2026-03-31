import $ from 'jquery';

// jQuery-based form validation utility
const formValidation = {
  // Show error message for a field
  showError: (fieldId, message) => {
    const $field = $(`#${fieldId}`);
    const $formGroup = $field.closest('.mb-3, .mb-4');
    
    // Remove any existing error
    $formGroup.find('.validation-error').remove();
    $field.removeClass('is-invalid');
    
    // Add error styling
    $field.addClass('is-invalid');
    
    // Create and append error message
    const $errorDiv = $('<div>', {
      class: 'validation-error',
      css: {
        color: '#ff6b6b',
        fontSize: '0.85rem',
        marginTop: '0.375rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem'
      }
    });
    
    const $icon = $('<span>', { text: '⚠' });
    const $text = $('<span>', { text: message });
    $errorDiv.append($icon, $text);
    
    $formGroup.append($errorDiv);
    
    // Shake animation
    $field.css('animation', 'shake 0.3s ease');
    setTimeout(() => $field.css('animation', ''), 300);
  },

  // Clear error for a field
  clearError: (fieldId) => {
    const $field = $(`#${fieldId}`);
    const $formGroup = $field.closest('.mb-3, .mb-4');
    $formGroup.find('.validation-error').remove();
    $field.removeClass('is-invalid');
  },

  // Clear all errors in a form
  clearAllErrors: (formSelector) => {
    const $form = $(formSelector);
    $form.find('.validation-error').remove();
    $form.find('.is-invalid').removeClass('is-invalid');
  },

  // Show global form error
  showFormError: (message) => {
    // Remove existing form error
    $('.form-global-error').remove();
    
    const $errorDiv = $('<div>', {
      class: 'alert alert-danger form-global-error',
      css: {
        marginBottom: '1rem'
      },
      text: message
    });
    
    $('form').prepend($errorDiv);
  },

  // Clear global form error
  clearFormError: () => {
    $('.form-global-error').remove();
  },

  // Validate required field
  validateRequired: (fieldId, fieldName) => {
    const value = $(`#${fieldId}`).val()?.trim();
    if (!value) {
      formValidation.showError(fieldId, `${fieldName} is required`);
      return false;
    }
    formValidation.clearError(fieldId);
    return true;
  },

  // Validate email format
  validateEmail: (fieldId) => {
    const value = $(`#${fieldId}`).val()?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value) {
      formValidation.showError(fieldId, 'Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      formValidation.showError(fieldId, 'Please enter a valid email address');
      return false;
    }
    formValidation.clearError(fieldId);
    return true;
  },

  // Validate password length
  validatePassword: (fieldId, minLength = 6) => {
    const value = $(`#${fieldId}`).val();
    
    if (!value) {
      formValidation.showError(fieldId, 'Password is required');
      return false;
    }
    if (value.length < minLength) {
      formValidation.showError(fieldId, `Password must be at least ${minLength} characters`);
      return false;
    }
    formValidation.clearError(fieldId);
    return true;
  },

  // Show success message
  showSuccess: (message) => {
    // Remove existing success message
    $('.form-success-message').remove();
    
    const $successDiv = $('<div>', {
      class: 'form-success-message',
      css: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: 'rgba(40, 167, 69, 0.95)',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        animation: 'slideIn 0.3s ease'
      }
    });
    
    const $icon = $('<span>', { text: '✓' });
    const $text = $('<span>', { text: message });
    $successDiv.append($icon, $text);
    
    $('body').append($successDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      $successDiv.css('animation', 'slideOut 0.3s ease');
      setTimeout(() => $successDiv.remove(), 300);
    }, 3000);
  },

  // Show error toast (for API errors)
  showErrorToast: (message) => {
    // Remove existing error toast
    $('.form-error-toast').remove();
    
    const $errorDiv = $('<div>', {
      class: 'form-error-toast',
      css: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: 'rgba(220, 53, 69, 0.95)',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        animation: 'slideIn 0.3s ease'
      }
    });
    
    const $icon = $('<span>', { text: '✕' });
    const $text = $('<span>', { text: message });
    $errorDiv.append($icon, $text);
    
    $('body').append($errorDiv);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      $errorDiv.css('animation', 'slideOut 0.3s ease');
      setTimeout(() => $errorDiv.remove(), 300);
    }, 4000);
  }
};

// Add CSS animations for toasts
$(() => {
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      .is-invalid {
        border-color: #ff6b6b !important;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2) !important;
      }
    `)
    .appendTo('head');
});

export default formValidation;