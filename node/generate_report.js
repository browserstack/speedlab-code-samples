const axios = require("axios");
const { sleep } = require("./utils");

const ENDPOINTS = {
  generate_report: "/report/",
  get_report: "/report/", // + {report_id},
};

async function generate_report(base_url, test_url, config, auth) {
  let result;

  // POST /report/
  console.log(
    `Generating report for ${test_url} ...\n POST: ${ENDPOINTS.generate_report}`
  );
  const res = await generate_report_call(
    base_url + ENDPOINTS.generate_report,
    {
      url: test_url,
      ...config,
    },
    auth
  );
  let job_id = res.data.report_id;
  console.log(`Job id is: ${job_id} \n`);

  // Checking every 15 seconds whether report generation is completed or not
  while (true) {
    // GET /report/{id}
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
      console.log("Report fetched successfully");
      console.log("Status: " + res.status + "\n");
      result = res.data;
      break;
    } else {
      console.log("Report status: Pending [Waiting 15 sec]...");
    }
    await sleep(15000);
  }

  return [job_id, result];
}

function generate_report_call(url, data, auth) {
  return axios.post(url, data, {
    auth,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

function get_report_call(url, auth) {
  return axios.get(url, {
    headers: {
      Accept: "application/json",
    },
    auth,
  });
}

module.exports = {
  generate_report,
};
