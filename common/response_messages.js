class response_messages {
  constructor() {}
  error(message) {
    return { success: false, message: message };
  }

  success(message, data) {
    return { success: true, message: message, data: data };
  }
}

module.exports = { response_messages };
