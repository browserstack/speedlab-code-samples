const axios = require("axios");
const { get_random_items } = require("./utils");
const {devices_count,desktops_count} =require("./config")

const ENDPOINTS = {
  desktop_meta: "/meta/desktops",
  devices_meta: "/meta/devices",
  regions: "/meta/regions",
  networks: "/meta/networks",
};

async function get_metadata(base_url, auth) {
  const METADATA = {};

  let x = Math.random();
  if (x < 0.5) {
    // GET /meta/desktops
    console.log(`Fetching desktop metadata....\n GET: ${ENDPOINTS.desktop_meta}`);
    const desktop_metadata = await get_metadata_call(
      base_url + ENDPOINTS.desktop_meta,
      auth
    );
    console.log("Desktop data fetched! Selecting random desktops\n");
    METADATA["desktop"] = get_random_items(desktop_metadata.data.desktops, desktops_count)[0]
  }
  else {
    // GET /meta/devices
    console.log(`Fetching devices metadata... \n GET: ${ENDPOINTS.devices_meta}`);
    const devices_metadata = await get_metadata_call(
      base_url + ENDPOINTS.devices_meta,
      auth
    );
    console.log("Devices data fetched! Selecting random device\n");
    METADATA["device"] = get_random_items(devices_metadata.data.devices, devices_count)[0]
  }
  // GET /meta/regions
  console.log(`Fetching regions... \n GET: ${ENDPOINTS.regions}`);
  const regions = await get_metadata_call(base_url + ENDPOINTS.regions, auth);
  console.log("Regions fetched! Selecting random region\n");
  METADATA["region"] = get_random_items(regions.data.regions, 1)[0];

  // GET /meta/networks
  console.log(`Fetching networks... \n GET: ${ENDPOINTS.networks}`);
  const networks = await get_metadata_call(base_url + ENDPOINTS.networks, auth);
  console.log(
    "Networks fetched! Selecting random network for mobile and desktops\n"
  );
  METADATA["desktop_network"] = get_random_items(networks.data.networks.desktop, 1)[0].value;
  METADATA["device_network"] = get_random_items(networks.data.networks.mobile, 1)[0].value;

  return METADATA;
}

function get_metadata_call(url, auth) {
  return axios.get(url, {
    headers: {
      Accept: "application/json",
    },
    auth,
  });
}

module.exports = {
  get_metadata,
};
