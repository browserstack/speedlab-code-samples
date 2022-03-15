const axios = require("axios");
const { BASE_URL, auth, JOB_ID } = require("./config");
const { get_report_assets } = require("./report_assets");
const { print_results } = require("./utils")

const ENDPOINTS = {
  get_report: "/report/", // + {report_id},
};

async function get_report(base_url, job_id, auth) {
  if (JOB_ID == "") {
    console.log("Please enter job_id in config.js");
    return;
  }

  // GET /report/{id}
  try {
    console.log(
      `Trying to fetch report with id ${job_id}... \n GET: ${
        ENDPOINTS.get_report + job_id
      }`
    );
    const res = await get_report_call(
      base_url + ENDPOINTS.get_report + job_id,
      auth
    );
    if (res.data.status == "complete") {
      console.log("Report generated successfully");
      console.log("Status: " + res.status + "\n");
      result = res.data;
      print_results(result);
      await get_report_assets(
        base_url,
        job_id,
        result.test_configuration,
        auth
      );
    } else {
      console.log("Report status: Pending, Trying again after some time");
    }
  } catch (err) {
    console.log(err.message);
    return;
  }
}

function get_report_call(url, auth) {
  return axios.get(url, {
    headers: {
      Accept: "application/json",
    },
    auth,
  });
}

get_report(BASE_URL, JOB_ID, auth);
