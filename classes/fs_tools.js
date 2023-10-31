const fs = require("fs");
const RESPONSE_MESSAGES = require("./response_messages.js");

// ############################
// File System Tools Class
// ---
// Provides common tools for reading and writing to the file system.
// ############################

function get_files(directory, filter) {
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
          reject(RESPONSE_MESSAGES.error(err));
        }
        if (files.length === 0) {
          reject(RESPONSE_MESSAGES.error(err));
        }
        if (filter) {
          files.forEach((file, id) => {
            const FILE_EXTENSION = file.substr(file.length - 4);
            if (FILE_EXTENSION == filter) {
              FILES.push(file);
            }
            if (id === FILES.length - 1)
              resolve(RESPONSE_MESSAGES.success("", FILES));
          });
        } else {
          resolve(RESPONSE_MESSAGES.success("", files));
        }
      });
    } catch (err) {
      reject(RESPONSE_MESSAGES.error(err));
    }
  });
}

function read_text_file(file_name) {
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
          reject(RESPONSE_MESSAGES.error(err));
        }
        resolve(RESPONSE_MESSAGES.success("", data));
      });
    } catch (err) {
      reject(RESPONSE_MESSAGES.error(err));
    }
  });
}

function write_file(file_name, data) {
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
          reject(RESPONSE_MESSAGES.error(err));
        }
        resolve(RESPONSE_MESSAGES.success("", {}));
      });
    } catch (err) {
      reject(RESPONSE_MESSAGES.error(err));
    }
  });
}

function append_file(file_name, data) {
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
          reject(RESPONSE_MESSAGES.error(err));
        }
        resolve(RESPONSE_MESSAGES.success("", {}));
      });
    } catch (err) {
      reject(RESPONSE_MESSAGES.error(err));
    }
  });
}

module.exports = { get_files, read_text_file, write_file, append_file };
