// ############################
// System Monitor Class
// ---
// Provides mechanisms to return various system stats.
// ############################

function display_memory() {
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
  return this.sucess("", memory_used);
}

module.exports = display_memory;
