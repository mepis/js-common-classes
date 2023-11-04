class csv_parser {
  filter_csv(csv, filters) {
    let matches = ``;
    const ORIGINAL_DATA = csv.split("\n");
    ORIGINAL_DATA.forEach((line) => {
      filters.forEach((filter) => {
        if (line.includes(filter)) {
          matches = `${matches}${line}, \n`;
        }
      });
    });
    return matches;
  }

  async convert_csv_to_object(csv) {
    return new Promise(async (resolve) => {
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
      resolve(output);
    });
  }

  static convert_headers(lines) {
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

  static normalize_lines(lines) {
    return new Promise((resolve) => {
      for (let x = 0; x < lines.length; x++) {
        lines[x] = lines[x].replace(/["|']/g, "");
        lines[x] = lines[x].replace(/["\r']/g, "");
        if (x === lines.length - 1) resolve(lines);
      }
    });
  }

  static fix_bools(output) {
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

module.exports = { csv_parser };
