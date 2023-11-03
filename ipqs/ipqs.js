const AXIOS = require("axios");
const RESPONSE_MESSAGES = require("./../response_messages.js");

class ipqs extends RESPONSE_MESSAGES {
  static IPQS_BASE_URL = "https://www.ipqualityscore.com/api/json/";
  api_key = "";
  response_type = "";

  constructor(api_key, response_type) {
    this.api_key = api_key;
    this.response_type = response_type;
  }

  set() {
    api_key = (key) => {
      this.api_key = key;
    };
    response_type = (response_type) => {
      this.response_type = response_type;
    };
  }

  get() {
    api_key = () => {
      return this.api_key;
    };
    response_type = () => {
      return this.response_type;
    };
  }

  async get_ip(ip) {
    return new Promise(async (resolve, reject) => {
      if (!this.is_api_key_valid(this.api_key))
        reject(this.error("Invalid API Key"));
      if (this.response_type === "json" || this.response_type === "xml")
        reject(this.error("Response format not set"));
      try {
        const URL = `${this.IPQS_BASE_URL}/ip/${this.api_key}/${ip}`;
        const IP_DATA = await this.call_ipqs(URL);
        if (IP_DATA.succes) {
          resolve(this.succes("", IP_DATA));
        } else {
          reject(this.error(IP_DATA.message));
        }
      } catch (error) {
        reject("Error calling API");
      }
    });
  }

  static is_api_key_valid(api_key) {
    if (api_key !== "" && api_key.length === 32) {
      return true;
    } else {
      return false;
    }
  }

  static call_ipqs(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const RESPONSE = AXIOS.get(url);
        const DATA = RESPONSE.data;
        resolve(DATA);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = { ipqs };
