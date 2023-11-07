const fs = require("fs");

class response_messages {
  constructor() {}
  error(message) {
    return { success: false, message: message };
  }
  success(message, data) {
    return { success: true, message: message, data: data };
  }
}
class file_system_tools extends response_messages {
  get_files(directory, filter) {
    return new Promise(async (resolve, reject) => {
      const FILES = [];
      try {
        fs.readdir(directory, function (error, files) {
          if (error) {
            reject(this.error(error));
          }
          if (files.length === 0) {
            reject(this.error(error));
          }
          if (filter) {
            files.forEach((file, id) => {
              const FILE_EXTENSION = file.substr(file.length - 4);
              if (FILE_EXTENSION == filter) {
                FILES.push(file);
              }
              if (id === FILES.length - 1) resolve(this.success("", files));
            });
          } else {
            resolve(this.success("", files));
          }
        });
      } catch (error) {
        reject(this.error(error));
      }
    });
  }

  read_text_file(file_name) {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(file_name, "utf8", async (error, data) => {
          if (error) {
            reject(this.error(error));
          }
          resolve(this.success("", data));
        });
      } catch (error) {
        reject(this.error(error));
      }
    });
  }

  write_file(file_name, data) {
    return new Promise(async (resolve, reject) => {
      try {
        fs.writeFile(file_name, data, (error) => {
          if (error) {
            reject(this.error(error));
          }
          resolve(this.success());
        });
      } catch (error) {
        reject(this.error(error));
      }
    });
  }

  append_file(file_name, data) {
    return new Promise(async(resolve), (reject) => {
      try {
        fs.appendFile(file_name, data, async (error) => {
          if (error) {
            reject(this.error(error));
          }
          resolve(this.success());
        });
      } catch (error) {
        reject(this.error(error));
      }
    });
  }
}

module.exports = file_system_tools;
