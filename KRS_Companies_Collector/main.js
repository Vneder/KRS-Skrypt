const fetchData = require('./scripts/fetchData');
const processData = require('./scripts/processData');

async function main() {
    // Krok 1: Pobierz listę KRS i zapisz do pliku
    await fetchData();

    // Krok 2: Przetwórz dane z listy KRS i zapisz do pliku Excel
    await processData();
}

main();
