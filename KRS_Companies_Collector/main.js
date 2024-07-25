const fetchData = require('./scripts/fetchData');
const processData = require('./scripts/processData');

async function main() {
    // Pobranie aktywnych wpisów KRS i zapis do pliku krsList.json
    await fetchData();

    // Przetworzenie danych i zapis do excela
    await processData();
}

main();
