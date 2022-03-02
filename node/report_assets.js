const axios = require("axios");

const ENDPOINTS = {
  report_assets: "/report/", // + {report_id}/{asset}
};

async function get_report_assets(base_url, job_id, params, auth) {
  // GET /report/{id}/har
  console.log(
    `Getting HAR logs for desktop... \n GET: ${
      ENDPOINTS.report_assets + job_id
    }/har`
  );
  let url = base_url + ENDPOINTS.report_assets + `${job_id}/har`;
  await get_report_assets_call(url, params, auth);
  console.log("HAR logs fetched" + "\n");

  // GET /report/{id}/filmstrips
  console.log(
    `Getting film strips for desktop...\n GET: ${
      ENDPOINTS.report_assets + job_id
    }/filmstrips`
  );
  url = base_url + ENDPOINTS.report_assets + `${job_id}/filmstrips`;
  await get_report_assets_call(
    url,
    {
      ...params,
      event: "fcp",
    },
    auth
  );
  console.log("Film strip fetched" + "\n");

  // GET /report/{id}/audit
  console.log(
    `Getting audit data for desktop...\n GET: ${
      ENDPOINTS.report_assets + job_id
    }/audit`
  );
  url = base_url + ENDPOINTS.report_assets + `${job_id}/audit`;
  await get_report_assets_call(url, {}, auth);
  console.log("Audit data fetched" + "\n");
}

function get_report_assets_call(url, params, auth) {
  return axios.get(url, {
    headers: {
      Accept: "application/json",
    },
    auth,
    params,
  });
}

module.exports = {
  get_report_assets,
};
