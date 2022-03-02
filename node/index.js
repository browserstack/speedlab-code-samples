const { get_metadata } = require("./metadata");
const { generate_report } = require("./generate_report");
const { get_report_assets } = require("./report_assets");

const BASE_URL = "https://api.browserstack.com/speedlab/beta";
const TEST_URL = process.argv[2] || "https://browserstack.com";

const auth = {
  username: "browserstack_access_key",
  password: "browserstack_selenium_key",
};

async function start_workflow() {
  console.log("STARTING...");

  let config = {};

  // Fetching metadata
  try {
    config = await get_metadata(BASE_URL, auth);
  } catch (err) {
    console.log(err.message);
    return;
  }

  console.log("Final Configuration: ");
  console.log(JSON.stringify(config) + "\n");

  let job_id, result;

  // Generating report
  try {
    [job_id, result] = await generate_report(BASE_URL, TEST_URL, config, auth);
  } catch (err) {
    console.log(err.message);
    return;
  }

  const params = {
    os: config["desktops"][0].os,
    os_version: config["desktops"][0].os_version,
    browser_name: config["desktops"][0].browser_name,
    browser_version: config["desktops"][0].browser_version,
  };

  // Fetching report assets
  try {
    await get_report_assets(BASE_URL, job_id, params, auth);
  } catch (err) {
    console.log(err.message);
    return;
  }

  // Results
  console.log(`SOME RESULTS FOR ${TEST_URL}:\n`);

  console.log(
    `${result.results[0].os} - ${
      result.results[0].device || result.results[0].os_version
    } - ${result.results[0].browser_name}`
  );
  console.log("Visual metrics: ", result.results[0].report[0].visual_metrics);
  console.log(
    "Navigation timings",
    result.results[0].report[0].navigation_timings,
    "\n"
  );

  console.log(
    `${result.results[1].os} - ${
      result.results[1].device || result.results[1].os_version
    } - ${result.results[1].browser_name}`
  );
  console.log("Visual metrics: ", result.results[1].report[0].visual_metrics);
  console.log(
    "Navigation timings",
    result.results[1].report[0].navigation_timings,
    "\n"
  );
}

start_workflow();
