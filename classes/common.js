class common {
  // ############################
  // Common Class
  // ---
  // Provides common functions for all classes. All classes extend this function.
  // ############################
  static debug = false;
  static error_prefix = "WRITER - ";

  constructor(debug) {
    // ############################
    // Constructor
    // debug: boolean - Enables console logging for errors and messages
    // ############################
    this.debug = debug;
  }

  static error(message) {
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

  static success(message, data) {
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

  static write_to_console(message, method) {
    // ############################
    // write_to_console - static
    // ---
    // Writes messasge to console log if debug equals true.
    // ---
    // message: string - Message written to console, often the an error message produce by a reject or catch response
    // method: string - Class function that produce the console log message
    // ---
    // Returns: NA
    // ############################

    console.log(`${this.error_prefix}${method} : ${message}`);
  }
}

module.exports = common;
