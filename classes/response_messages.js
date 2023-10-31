// ############################
// Common Class
// ---
// Provides common functions for all classes. All classes extend this function.
// ############################

function error(message) {
  // ############################
  // error - static
  // ---
  // Constructs error message for class function responses.
  // ---
  // message: string - Message returned with error response
  // ---
  // Returns: NA
  // ############################

  return { success: false, message: message };
}

function success(message, data) {
  // ############################
  // success - static
  // ---
  // Constructs success message for class function responses.
  // ---
  // message: string - Message returned with success response
  // data: any - Data returned with success response, can be null
  // ---
  // Returns: NA
  // ############################

  return { success: false, message: message, data: data };
}

module.exports = { error, success };
