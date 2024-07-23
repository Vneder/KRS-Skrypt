const axios = require('axios');
const yaml = require('yaml');
const fs = require('fs');

const config = yaml.parse(fs.readFileSync('config/config.yaml', 'utf8'));

async function fetchData() {
    try {
        const response = await axios.get(config.apiUrl, {
            headers: {
                'Authorization': `Bearer ${config.apiKey}`,
                'Accept': 'application/json'
            }
        });
        // console.log('Dane odczytane z API:', response.data); // Wykonsolowanie odczytanych wszystkich danych z API
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        console.error('Response data:', error.response ? error.response.data : 'No response data');
        return null;
    }
}

module.exports = fetchData;

// if (require.main === module) {
//     fetchData().then(data => console.log(data));
// }
