const axios = require("axios");

const ENDPOINTS = {
  generate_report: "/report/",
};

async function generate_report(base_url, test_url, config, auth) {
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

  return job_id;
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

module.exports = {
  generate_report,
};
