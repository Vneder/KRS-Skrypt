const ExcelJS = require('exceljs');
const path = require('path');

async function saveToExcel(data, filepath = 'data/firmy.xlsx') {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Firmy');

    worksheet.columns = [
        { header: 'Company Name', key: 'company_name', width: 30 },
        { header: 'Creation Date', key: 'creation_date', width: 20 },
        { header: 'Activity', key: 'activity', width: 30 }
    ];

    worksheet.addRows(data);
    worksheet.autoFilter = 'A1:C1';

    await workbook.xlsx.writeFile(filepath);
    console.log('Dane zapisane w excelu pomyślnie');
}

module.exports = saveToExcel;

if (require.main === module) {
    const fetchData = require('./fetchData');
    const processData = require('./processData');
    fetchData().then(rawData => {
        const data = processData(rawData);
        saveToExcel(data);
    });
}
