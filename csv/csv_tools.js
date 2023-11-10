class response_messages {
  constructor() {}
  error(message) {
    return { success: false, message: message };
  }
  success(message, data) {
    return { success: true, message: message, data: data };
  }
}

new response_messages();

class csv_parser extends response_messages {
  filter_csv(csv, filters) {
    return new Promise((resolve, reject) => {
      const CSV_DATA_TYPE = typeof csv;
      const FILTER_DATA_TYPE = Array.isArray(filters);

      if (CSV_DATA_TYPE !== "string")
        reject(this.error("CSV is invalid type, expected string"));
      if (!FILTER_DATA_TYPE)
        reject(this.error("filters is invalid data type, expected array"));

      let matches = ``;
      const ORIGINAL_DATA = csv.split("\n");
      ORIGINAL_DATA.forEach((line) => {
        filters.forEach((filter) => {
          if (line.includes(filter)) {
            matches = `${matches}${line}, \n`;
          }
        });
      });
      resolve(this.success("", matches));
    });
  }

  async convert_csv_to_object(csv) {
    return new Promise(async (resolve) => {
      const DATA_TYPE = typeof csv;
      if (DATA_TYPE === "string") {
        const LINES = await this.normalize_lines(csv.split("\n"));
        const FIXED_LINES = LINES.filter((x) => x !== "" || x !== undefined);
        const HEADER = await this.convert_headers(FIXED_LINES);
        let output = LINES.slice(1).map((line) => {
          const fields = line.split(",");
          const fixed_fields = fields.map((element) => {
            if (element === "") {
              return "-";
            }
            return element;
          });
          const response = Object.fromEntries(
            HEADER.map((h, i) => [h, fixed_fields[i]])
          );
          return response;
        });
        output = await this.fix_bools(output);
        resolve(this.success("", output));
      } else {
        reject(this.error("Invalid data type, expected string"));
      }
    });
  }

  convert_headers(lines) {
    return new Promise((resolve) => {
      let header = lines[0].split(",");
      for (let x = 0; x < header.length; x++) {
        header[x] = header[x].toLowerCase();
        header[x] = header[x].replaceAll(" ", "_");
        header[x] = header[x].replace(/["|']/g, "");
        header[x] = header[x].replaceAll("\r", "");
        if (x === header.length - 1) resolve(header);
      }
    });
  }

  normalize_lines(lines) {
    return new Promise((resolve) => {
      for (let x = 0; x < lines.length; x++) {
        lines[x] = lines[x].replace(/["|']/g, "");
        lines[x] = lines[x].replace(/["\r']/g, "");
        if (x === lines.length - 1) resolve(lines);
      }
    });
  }

  fix_bools(output) {
    return new Promise((resolve) => {
      for (let x = 0; x < output.length; x++) {
        const keys = Object.keys(output[x]);
        if (keys.length > 0) {
          for (let y = 0; y < keys.length; y++) {
            if (output[x][keys[y]] === "TRUE") output[x][keys[y]] = true;
            if (output[x][keys[y]] === "true") output[x][keys[y]] = true;
            if (output[x][keys[y]] === "FALSE") output[x][keys[y]] = false;
            if (output[x][keys[y]] === "false") output[x][keys[y]] = false;
          }
        }
      }
      resolve(output);
    });
  }
}

module.exports = csv_parser;

