var mongoose = require('mongoose');
const fs = require('fs');
var path = require('path')

'use strict'

// polyfills required by exceljs
require('core-js/modules/es.promise');
require('core-js/modules/es.string.includes');
require('core-js/modules/es.object.assign');
require('core-js/modules/es.object.keys');
require('core-js/modules/es.symbol');
require('core-js/modules/es.symbol.async-iterator');
require('regenerator-runtime/runtime');

var Excel = require('exceljs/dist/es5');
// var DonHang = mongoose.model('DonHangModel');
// var Item = mongoose.model('ItemModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

function deleteFile()
{
    try {
        var dir = process.cwd() + '/public/'
        fs.readdir(dir, (err, files) => {
            files = files.map(function (fileName) {
                return {
                    name: fileName,
                    time: fs.statSync(dir + fileName).mtime.getTime()
                };
            })
            .sort(function (a, b) {return b.time - a.time;})
            .map(function (v) {return v.name; })
            .filter(el => path.extname(el) === '.xlsx')

            if (files.length >= 100) {
                files = files.slice(100)
                files.forEach(file => {
                    fs.unlinkSync(process.cwd() + '/public/' + file);
                });
            }
        });
    } catch (error) {
        return
    }
}

function FillCell(worksheet, cells, alignment, font, fill, border)
{
    var cell
    cells.forEach(ele => {
        cell = worksheet.getCell(ele.name)
        if (ele.value !== undefined) cell.value = ele.value

        if (alignment === undefined || alignment === null) return
        if (Object.keys(alignment).length !== 0)
            cell.alignment = alignment

        if (font === undefined || font === null) return
        if (Object.keys(font).length !== 0) {
            font.name = 'Times New Roman'
            cell.font = font
        }

        if (fill === undefined || fill === null) return
        if (Object.keys(fill).length !== 0)
            cell.fill = fill

        if (border === undefined || border === null) return
        if (Object.keys(border).length !== 0)
            cell.border = border
    })
}

function CreateStaticContent(worksheet)
{
    FillCell(worksheet,
        [{name: 'A1'}, {name: 'A2'}],
        {vertical: 'middle', horizontal: 'left' },
        {size: 14}
    )
}

function MergeCellHeader(worksheet)
{
    worksheet.mergeCells('E1:L1');
    worksheet.mergeCells('A4:L4');
    worksheet.mergeCells('A6:B6');
    worksheet.mergeCells('A7:B7');
    worksheet.mergeCells('A8:B8');
    worksheet.mergeCells('A9:B9');
    worksheet.mergeCells('C6:L6');
    worksheet.mergeCells('C7:L7');
    worksheet.mergeCells('C8:L8');
    worksheet.mergeCells('C9:L9');

    worksheet.mergeCells('A11:A12');
    worksheet.mergeCells('D11:F11');
    worksheet.mergeCells('H11:H12');
    worksheet.mergeCells('I11:I12');
    worksheet.mergeCells('J11:J12');
    worksheet.mergeCells('K11:K12');
    worksheet.mergeCells('L11:L12');
}

async function CreateDonHang(filename, content) {
    // create workbook by api.
    var workbook = new Excel.Workbook();

    // must create one more sheet.
    var worksheet = workbook.addWorksheet("Don Hang");

    MergeCellHeader(worksheet)
    CreateStaticContent(worksheet)
    // dhLongThanhDat(worksheet, content)

    // you can create xlsx file now.
    return await workbook.xlsx.writeFile(filename)
    .then(function() {
        return filename
    });
}

module.exports.orderCreate = async function (req, res) {
    var today = new Date();
    var filename = today.getFullYear().toString() + (today.getMonth() + 1) +
               today.getDate() + today.getHours() +
               today.getMinutes() + today.getSeconds() + '_order.xlsx'
    var body = req.body

    await CreateDonHang(process.cwd() + '/public/' + filename, body)
    .then(() => {
        sendJSONresponse(res, 200, {"filename": filename});
        return
    })
    .catch(err => {
        sendJSONresponse(res, 404, "orderCreate");
        return
    })
}