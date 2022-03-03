# SpeedLab-API-demo
Demonstrates the workflow of SpeedLab APIs

# How to run scripts
  ## Node
  1. Inside node directory: `npm install`
  2. In `config.js` replace `browserstack_access_key` with `YOUR_USERNAME` and `browserstack_selenium_key` with `YOUR_ACCESS_KEY`
  3. To run the test: `node index.js [TEST_URL]`
  4. You will get a `job_id` from this script. Add it in `config.js`
  5. To see the report status and result, run `node get_report.js` after some time ( ~60 seconds). Make sure you add the correct `job_id` in `config.js` to get proper results.