const axios = require('axios');
const yaml = require('yaml');
const fs = require('fs');

const config = yaml.parse(fs.readFileSync('config/config.yaml', 'utf8'));

async function fetchData() {
    const companiesData = [];

    for (let i = 262807; i < 263807; i++) {
        const krsNumber = (0 + i).toString().padStart(10, '0');
        try {
            const response = await axios.get(`https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/${krsNumber}?rejestr=p&format=json`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            companiesData.push(response.data);
        } catch (error) {
            console.error(`Brak danych dla KRS ${krsNumber}: ${error.message}`);
        }
    }

    return companiesData;
}

module.exports = fetchData;
