const fs = require("fs");
const COMMON = require("./common.js");

class fs_tools extends COMMON {
  // ############################
  // File System Tools Class
  // ---
  // Provides common tools for reading and writing to the file system.
  // ############################

  get_files(directory, filter) {
    // ############################
    // get_files - public
    // ---
    // Retrieves file names of all files in designated directory.
    // ---
    // directory: string - Directory path storing files
    // filter: string - Retrieve files only with designed file extension (e.g., '.txt','.csv', etc.)
    // ---
    // Returns: array - array of strings
    // ############################

    return new Promise(async (resolve, reject) => {
      const FILES = [];
      try {
        fs.readdir(directory, function (err, files) {
          if (err) {
            if (this.debug) this.write_to_console(err, "get_files");
            reject(this.error(err));
          }
          if (files.length === 0) {
            if (this.debug) this.write_to_console(err, "get_files");
            reject(this.error(err));
          }
          if (filter) {
            files.forEach((file, id) => {
              const FILE_EXTENSION = file.substr(file.length - 4);
              if (FILE_EXTENSION == filter) {
                FILES.push(file);
              }
              if (id === FILES.length - 1) resolve(this.success("", FILES));
            });
          } else {
            resolve(this.success("", files));
          }
        });
      } catch (err) {
        if (this.debug) this.write_to_console(err, "get_files");
        reject(this.error(err));
      }
    });
  }

  read_text_file(file_name) {
    // ############################
    // read_text_file - public
    // ---
    // Reads utf8 encoded text-based files (eg. .txt, .csv, etc.).
    // ---
    // file_name: string - Name of the file to open, prepend directory to file name
    // ---
    // Returns: string - file data
    // ############################

    return new Promise((resolve, reject) => {
      try {
        fs.readFile(file_name, "utf8", async (err, data) => {
          if (err) {
            if (this.debug) this.write_to_console(err, "read_text_file");
            reject(this.error(err));
          }
          resolve(this.success("", data));
        });
      } catch (err) {
        if (this.debug) this.write_to_console(err, "read_text_file");
        reject(this.error(err));
      }
    });
  }

  write_file(file_name, data) {
    // ############################
    // write_file - public
    // ---
    // Writes data to a file.
    // ---
    // file_name: string - Filename of file, include directory path prependend to filename
    // data: any - Data to write to file
    // ---
    // Returns: NA
    // ############################

    return new Promise(async (resolve, reject) => {
      try {
        fs.writeFile(file_name, data, (err) => {
          if (err) {
            if (this.debug) this.write_to_console(err, "write_file");
            reject(this.error(err));
          }
          resolve(this.success("", {}));
        });
      } catch (err) {
        if (this.debug) this.write_to_console(err, "write_file");
        reject(this.error(err));
      }
    });
  }

  append_file(file_name, data) {
    // ############################
    // append_file - public
    // ---
    // Appends data to existing file. If file does not exist, a new file will be created.
    // ---
    // file_name: string - Filename of file, include directory path prependend to filename
    // data: any - Data to write to file
    // ---
    // Returns: NA
    // ############################

    return new Promise(async(resolve), (reject) => {
      try {
        fs.appendFile(file_name, data, async (err) => {
          if (err) {
            if (this.debug) this.write_to_console(err, "append_file");
            reject(this.error(err));
          }
          resolve(this.success("", {}));
        });
      } catch (err) {
        if (this.debug) this.write_to_console(err, "append_file");
        reject(this.error(err));
      }
    });
  }
}

module.exports = fs_tools;
