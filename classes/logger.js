function write_error_to_console(message, method) {
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
  const ERROR_PREFIX = "WRITER - ";
  console.log(`${ERROR_PREFIX}${method} : ${message}`);
}

function write_to_console(message, method) {
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
  console.log(`${method}: ${message}`);
}

module.exports = { write_error_to_console, write_to_console };
