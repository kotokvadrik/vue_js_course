import axios from 'axios';

async function makeRequests() {
    console.log("--- Запросы из браузера ---");
    try {
        const vk = await axios.get('https://vk.com');
        console.log("VK success", vk.status);
    } catch (e) {
        console.error("VK error (CORS):", e.message);
    }

    try {
        const geo = await axios.get('https://json.geoiplookup.io/');
        console.log("GeoIP success", geo.data);
    } catch (e) {
        console.error("GeoIP error:", e.message);
    }
}
makeRequests();