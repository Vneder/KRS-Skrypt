function processData(rawData) {
    // console.log('Raw data:', JSON.stringify(rawData, null, 2)); // Wykonsolowanie wszystkich pobranych danych z API

    if (!rawData || !rawData.odpis || !rawData.odpis.dane || !rawData.odpis.dane.dzial1) {
        console.error('Nie znaleziono danych');
        return [];
    }

    const ogolne = rawData.odpis.naglowekA;
    const dzial1 = rawData.odpis.dane.dzial1;
    const dzial3 = rawData.odpis.dane.dzial3;
    const danePodmiotu = dzial1.danePodmiotu;
    const siedzibaIAdres = dzial1.siedzibaIAdres;
    const przedmiotDzialalnosci = dzial3.przedmiotDzialalnosci;

    console.log('Odczytane dane:', { // Wykonsolowanie informacji do terminala o odczytanych danych
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
    });

    return [{
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
    }];
}

module.exports = processData;

if (require.main === module) {
    const fetchData = require('./fetchData');
    fetchData().then(rawData => {
        const data = processData(rawData);
        console.log(data);
    });
}
