const fs = require("fs");

class file_system_tools {
  get_files(directory, filter) {
    return new Promise(async (resolve, reject) => {
      const FILES = [];
      try {
        fs.readdir(directory, function (error, files) {
          if (error) {
            reject(error);
          }
          if (files.length === 0) {
            reject(error);
          }
          if (filter) {
            files.forEach((file, id) => {
              const FILE_EXTENSION = file.substr(file.length - 4);
              if (FILE_EXTENSION == filter) {
                FILES.push(file);
              }
              if (id === FILES.length - 1) resolve(FILES);
            });
          } else {
            resolve(FILES);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  read_text_file(file_name) {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(file_name, "utf8", async (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  write_file(file_name, data) {
    return new Promise(async (resolve, reject) => {
      try {
        fs.writeFile(file_name, data, (error) => {
          if (error) {
            reject(error);
          }
          resolve(true);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  append_file(file_name, data) {
    return new Promise(async(resolve), (reject) => {
      try {
        fs.appendFile(file_name, data, async (error) => {
          if (error) {
            reject(error);
          }
          resolve(true);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = { file_system_tools };
