class logging_tools {
  write_error_to_console(message, method) {
    const ERROR_PREFIX = "WRITER - ";
    console.log(`${ERROR_PREFIX}${method} : ${message}`);
  }

  write_to_console(message, method) {
    console.log(`${method}: ${message}`);
  }
}

module.exports = { logging_tools };
