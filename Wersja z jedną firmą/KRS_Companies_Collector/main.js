const fetchData = require('./scripts/fetchData');
const processData = require('./scripts/processData');
const saveToExcel = require('./scripts/saveToExcel');

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

    await saveToExcel(processedData, 'KRS_Companies.xlsx');
    console.log('Dane pomyślnie zapisane w KRS_Companies.xlsx');
}

main();
