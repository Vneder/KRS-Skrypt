const ExcelJS = require('exceljs');

async function saveToExcel(data, filepath = 'data/firmy.xlsx') {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Firmy');

    worksheet.columns = [
        { header: 'Nazwa', key: 'Nazwa', width: 80 },
        { header: 'Email', key: 'Email', width: 30 },
        { header: 'Nip', key: 'Nip', width: 16 },
        { header: 'Wojewodztwo', key: 'Wojewodztwo', width: 20 },
        { header: 'Miejscowosc', key: 'Miejscowosc', width: 20 },
        { header: 'Ulica', key: 'Ulica', width: 20 },
        { header: 'nrDomu', key: 'nrDomu', width: 10 },
        { header: 'kodPocztowy', key: 'kodPocztowy', width: 10 },
        { header: 'Kraj', key: 'Kraj', width: 20 },
        { header: 'Data rejestracji w KRS', key: 'datarejestracjiWKRS', width: 20 },
        { header: 'Przedmiot przewazajacej dzialalnosci', key: 'przedmiotPrzewazajacejDzialalnosci', width: 80 }
    ];

    worksheet.addRows(data);
    worksheet.autoFilter = 'A1:K1';

    await workbook.xlsx.writeFile(filepath);
    console.log('Dane zapisane w excelu pomyślnie');
}

module.exports = saveToExcel;
