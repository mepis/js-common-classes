const COMMON = require("./common.js");

class system_monitor extends COMMON {
  // ############################
  // System Monitor Class
  // ---
  // Provides mechanisms to return various system stats.
  // ############################

  display_memory() {
    // ############################
    // display_memory - public
    // ---
    // Queries Node for current amount of ram being consumed by script
    // ---
    // NA
    // ---
    // Returns: int - memory in Mb
    // ############################

    const memory_used = process.memoryUsage().heapUsed / 1024 / 1024;
    if (this.debug) this.write_to_console(memory_used, "display_memory");
    return this.sucess("", memory_used);
  }
}

module.exports = system_monitor;
