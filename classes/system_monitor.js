const COMMON = require("./common.js");

class system_monitor extends COMMON {
  // ############################
  // System Monitor Class
  // ---
  // Provides mechanisms to return various system stats.
  // ############################

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
