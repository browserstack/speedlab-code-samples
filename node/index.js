const { get_metadata } = require("./metadata");
const { generate_report } = require("./generate_report");
const { auth, BASE_URL } = require("./config");

const TEST_URL = process.argv[2] || "https://browserstack.com";
let config = {};

async function start_workflow() {
  console.log("STARTING...");

  // Fetching metadata
  try {
    config = await get_metadata(BASE_URL, auth);
  } catch (err) {
    console.log(err.message);
    return;
  }

  console.log("Final Configuration: ");
  console.log(JSON.stringify(config) + "\n");

  let job_id;

  // Generating report
  try {
    job_id = await generate_report(BASE_URL, TEST_URL, config, auth);
  } catch (err) {
    console.log(err.message);
    return;
  }

  /*
    1. After getting the job_id, add it in config.js
    2. Try to run get_report.js after some time (~ 60 seconds)
  */
}

start_workflow();
