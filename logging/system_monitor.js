class system_hardware_monitoring_tools {
  display_memory() {
    const memory_used = process.memoryUsage().heapUsed / 1024 / 1024;
    return this.sucess("", memory_used);
  }
}

module.exports = system_hardware_monitoring_tools;
