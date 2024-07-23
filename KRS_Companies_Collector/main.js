const fetchData = require('./scripts/fetchData');
const processData = require('./scripts/processData');
const xlsx = require('xlsx');

async function main() {
    const rawData = await fetchData();
    // console.log('Odczytane dane z API:', rawData); // Wykonsolowanie wszystkich danych z API
    if (!rawData) {
        console.error('Nie odczytano danych');
        return;
    }

    const processedData = processData(rawData);
    if (!processedData.length) {
        console.error('Brak danych do oczytu');
        return;
    }

    const ws = xlsx.utils.json_to_sheet(processedData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Companies');

    xlsx.writeFile(wb, 'KRS_Companies.xlsx');
    console.log('Dane pomyślnie zapisane w KRS_Companies.xlsx');
}

main();
