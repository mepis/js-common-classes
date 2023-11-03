// ############################
// Common Class
// ---
// Provides common functions for all classes. All classes extend this function.
// ############################
class response_messages {
  constructor() {}
  error(message) {
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

  success(message, data) {
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

    return { success: true, message: message, data: data };
  }
}

module.exports = { response_messages };
