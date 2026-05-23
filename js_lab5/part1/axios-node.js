const axios = require('axios');

async function run() {
    console.log("--- Запросы из Node.js ---");
    const resVk = await axios.get('https://vk.com');
    console.log("VK status:", resVk.status);

    const resGeo = await axios.get('https://json.geoiplookup.io/');
    console.log("GeoIP data:", resGeo.data.ip);
}
run();