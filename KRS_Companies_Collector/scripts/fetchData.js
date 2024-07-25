const axios = require('axios');
const yaml = require('yaml');
const fs = require('fs');

const config = yaml.parse(fs.readFileSync('config/config.yaml', 'utf8'));

async function fetchData() {
    const krsList = [];

    const odKRS = 262800;
    const doKRS = 262810;

    for (let i = odKRS; i < doKRS; i++) {
        const krsNumber = (0 + i).toString().padStart(10, '0');
        try {
            const response = await axios.get(`${config.apiUrlBase}${krsNumber}?rejestr=p&format=json`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.status === 200) {
                krsList.push(krsNumber);
                console.log(`Dodano KRS ${krsNumber}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn(`Brak danych dla KRS ${krsNumber}: ${error.message}`);
            } else {
                console.error(`Błąd przy pobieraniu KRS ${krsNumber}: ${error.message}`);
            }
        }
    }

    fs.writeFileSync('krsList.json', JSON.stringify(krsList, null, 2));
    console.log('Lista KRS zapisana w krsList.json');
}

module.exports = fetchData;
