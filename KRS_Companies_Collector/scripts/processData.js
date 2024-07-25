const axios = require('axios');
const yaml = require('yaml');
const fs = require('fs');
const xlsx = require('xlsx');

const config = yaml.parse(fs.readFileSync('config/config.yaml', 'utf8'));

async function processData() {
    const krsList = JSON.parse(fs.readFileSync('krsList.json', 'utf8'));
    const companiesData = [];

    for (const krsNumber of krsList) {
        try {
            const response = await axios.get(`${config.apiUrlBase}${krsNumber}?rejestr=p&format=json`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const rawData = response.data;
            if (!rawData || !rawData.odpis || !rawData.odpis.dane || !rawData.odpis.dane.dzial1) {
                continue;
            }

            const ogolne = rawData.odpis.naglowekA;
            const dzial1 = rawData.odpis.dane.dzial1;
            const dzial3 = rawData.odpis.dane.dzial3;
            const danePodmiotu = dzial1.danePodmiotu;
            const siedzibaIAdres = dzial1.siedzibaIAdres;
            const przedmiotDzialalnosci = dzial3.przedmiotDzialalnosci;

            const companyData = {
                Nazwa: danePodmiotu.nazwa,
                Email: siedzibaIAdres.adresPocztyElektronicznej,
                Nip: danePodmiotu.identyfikatory.nip,
                Wojewodztwo: siedzibaIAdres.siedziba.wojewodztwo,
                Miejscowosc: siedzibaIAdres.siedziba.miejscowosc,
                Ulica: siedzibaIAdres.adres.ulica,
                nrDomu: siedzibaIAdres.adres.nrDomu,
                kodPocztowy: siedzibaIAdres.adres.kodPocztowy,
                Kraj: siedzibaIAdres.adres.kraj,
                datarejestracjiWKRS: ogolne.dataRejestracjiWKRS,
                przedmiotPrzewazajacejDzialalnosci: przedmiotDzialalnosci.przedmiotPrzewazajacejDzialalnosci.map(pd => pd.opis).join(', ')
            };

            companiesData.push(companyData);
        } catch (error) {
            console.error(`Błąd przy pobieraniu danych dla KRS ${krsNumber}: ${error.message}`);
        }
    }

    if (companiesData.length > 0) {
        const ws = xlsx.utils.json_to_sheet(companiesData);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'ListaFirm');

        xlsx.writeFile(wb, 'KRS_BazaFirm.xlsx');
        console.log('Dane firm zapisane w KRS_BazaFirm.xlsx');
        console.log(`Zapisano ${companiesData.length} rekordów.`);
    } else {
        console.error('Brak danych do zapisania.');
    }
}

module.exports = processData;
