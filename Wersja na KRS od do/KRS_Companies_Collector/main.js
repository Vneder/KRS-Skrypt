const fetchData = require('./scripts/fetchData');
const processData = require('./scripts/processData');
const xlsx = require('xlsx');

async function main() {
    const rawDataArray = await fetchData();
    if (!rawDataArray || !Array.isArray(rawDataArray) || rawDataArray.length === 0) {
        console.error('Nie zadziałało :(');
        return;
    }

    const processedData = processData(rawDataArray);
    if (!processedData.length) {
        console.error('Brak danych do oczytu');
        return;
    }

    const ws = xlsx.utils.json_to_sheet(processedData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'ListaFirm');

    xlsx.writeFile(wb, 'KRS_BazaFirm.xlsx');
    console.log('Dane pomyślnie zapisane w KRS_BazaFirm.xlsx');
}

main();
