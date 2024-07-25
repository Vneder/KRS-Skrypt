function processData(rawDataArray) {
    return rawDataArray.map(rawData => {
        if (!rawData || !rawData.odpis || !rawData.odpis.dane || !rawData.odpis.dane.dzial1) {
            // console.error('Nie znaleziono danych');
            return null;
        }

        const ogolne = rawData.odpis.naglowekA;
        const dzial1 = rawData.odpis.dane.dzial1;
        const dzial3 = rawData.odpis.dane.dzial3;
        const danePodmiotu = dzial1.danePodmiotu;
        const siedzibaIAdres = dzial1.siedzibaIAdres;
        const przedmiotDzialalnosci = dzial3.przedmiotDzialalnosci;

        const krsNumber = danePodmiotu && danePodmiotu.identyfikatory ? danePodmiotu.identyfikatory.krs : 'N/A';

        // Sprawdzanie brakujących pól i dokładne raportowanie
        const missingFields = [];
        if (!danePodmiotu) {
            missingFields.push('danePodmiotu');
        } else {
            if (!danePodmiotu.nazwa) missingFields.push('danePodmiotu.nazwa');
            if (!danePodmiotu.identyfikatory || !danePodmiotu.identyfikatory.nip) missingFields.push('danePodmiotu.identyfikatory.nip');
        }
        if (!siedzibaIAdres) {
            missingFields.push('siedzibaIAdres');
        } else {
            if (!siedzibaIAdres.siedziba) missingFields.push('siedzibaIAdres.siedziba');
            if (!siedzibaIAdres.adres) missingFields.push('siedzibaIAdres.adres');
        }
        if (!przedmiotDzialalnosci) missingFields.push('przedmiotDzialalnosci');
        if (!ogolne.dataRejestracjiWKRS) missingFields.push('dataRejestracjiWKRS');
        if (przedmiotDzialalnosci && !przedmiotDzialalnosci.przedmiotPrzewazajacejDzialalnosci) missingFields.push('przedmiotDzialalnosci.przedmiotPrzewazajacejDzialalnosci');

        if (missingFields.length > 0) {
            console.error(`Brakujące dane w rekordzie ${krsNumber}: ${missingFields.join(', ')}`);
            return null;
        }

        return {
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
    }).filter(data => data !== null);
}

module.exports = processData;

if (require.main === module) {
    const fetchData = require('./fetchData');
    fetchData().then(rawDataArray => {
        const data = processData(rawDataArray);
        console.log(data);
    });
}
