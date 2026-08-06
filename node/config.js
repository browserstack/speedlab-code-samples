const BASE_URL = "https://api.browserstack.com/speedlab/beta";

const auth = {
  username: "browserstack_access_key",
  password: "browserstack_selenium_key",
};

const desktops_count = 1
const devices_count = 1
const JOB_ID = "";

module.exports = {
  auth,
  desktops_count,
  devices_count,
  BASE_URL,
  JOB_ID
};
