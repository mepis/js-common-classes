class response_messages {
  constructor() {}
  error(message) {
    return { success: false, message: message };
  }
  success(message, data) {
    return { success: true, message: message, data: data };
  }
}

class system_hardware_monitoring_tools extends response_messages {
  display_memory() {
    return new Promise((resolve, reject) => {
      try {
        const memory_used = process.memoryUsage().heapUsed / 1024 / 1024;
        resolve(this.sucess("", memory_used));
      } catch (error) {
        reject(this.error(error));
      }
    });
  }
}

module.exports = system_hardware_monitoring_tools;
