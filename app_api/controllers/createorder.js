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
        [{name: 'E1', value: 'TP.HCM, ngày......tháng...... năm......'}],
        {vertical: 'middle', horizontal: 'right' }, {size: 12}
    )

    FillCell(worksheet,
        [{name: 'A4', value: 'BÁO GIÁ'}],
        {horizontal: 'center', wrapText: true}, {size: 32, bold: true}
    )

    FillCell(worksheet,
        [{name: 'A6', value: 'Facebook:'}],
        {vertical: 'middle', horizontal: 'left' }, {size: 12, bold: true}
    )
    FillCell(worksheet,
        [{name: 'A7', value: 'Liên hệ:'}],
        {vertical: 'middle', horizontal: 'left' }, {size: 12, bold: true}
    )
    FillCell(worksheet,
        [{name: 'A8', value: 'Địa chỉ:'}],
        {vertical: 'middle', horizontal: 'left' }, {size: 12, bold: true}
    )
    FillCell(worksheet,
        [{name: 'A9', value: 'Web:'}],
        {vertical: 'middle', horizontal: 'left' }, {size: 12, bold: true}
    )

    FillCell(worksheet,
        [{name: 'C6', value: 'eBOX-Hộp Giấy Giá Rẻ'}],
        {vertical: 'middle', horizontal: 'left' }, {size: 12}
    )

    FillCell(worksheet,
        [{name: 'C7', value: '0903 233 833'}],
        {vertical: 'middle', horizontal: 'left' }, {size: 12}
    )

    FillCell(worksheet,
        [{name: 'C8', value: '6/11 Phạm Văn Hai, phường 2, quận Tân Bình, TP.HCM'}],
        {vertical: 'middle', horizontal: 'left' }, {size: 12}
    )

    FillCell(worksheet,
        [{name: 'C9', value: 'hopgiaygiare.com'}],
        {vertical: 'middle', horizontal: 'left' }, {size: 12}
    )

    // header
    FillCell(worksheet,
        [{name: 'A11', value: 'STT'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    FillCell(worksheet,
        [{name: 'B11', value: 'Loại'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'B12', value: 'Hộp'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    FillCell(worksheet,
        [{name: 'C11', value: 'Loại'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'C12', value: 'Giấy'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    FillCell(worksheet,
        [{name: 'D11', value: 'Quy cách'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'D12', value: 'Dài'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'E12', value: 'Rộng'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'F12', value: 'Cao'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    FillCell(worksheet,
        [{name: 'G11', value: 'Số'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'G12', value: 'lượng'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    FillCell(worksheet,
        [{name: 'H11', value: 'In'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'I11', value: 'Khuôn'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'J11', value: 'Đơn giá'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'K11', value: 'Thành tiền'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'L11', value: 'Ghi chú'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
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

function FillContent(worksheet, content)
{
    let tong_tien = 0
    index = 13

    content.items.forEach(ele => {
        let thanh_tien = ele.gia * ele.soluong
        tong_tien = tong_tien + thanh_tien
        let data = [
            {name: 'A' + index, value: index - 12},
            {name: 'B' + index, value: ele.loaihop},
            {name: 'C' + index, value: ele.loaigiay},
            {name: 'D' + index, value: ele.dai},
            {name: 'E' + index, value: ele.rong},
            {name: 'F' + index, value: ele.cao},
            {name: 'G' + index, value: ele.soluong},
            {name: 'H' + index, value: ele.isprint ? 'Có' : 'Không'},
            {name: 'I' + index, value: ele.iskhuon ? 'Có' : 'Không'},
            {name: 'J' + index, value: ele.gia},
            {name: 'K' + index, value: thanh_tien},
            {name: 'L' + index, value: ele.ghichu},
        ]
        FillCell(worksheet,
            data,
            {vertical: 'middle', horizontal: 'center', wrapText: true},
            {size: 12},
            {},
            {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
        )
        index++
    })

    worksheet.mergeCells('A' + index + ':J' + index);
    FillCell(worksheet,
        [{name: 'A' + index, value: 'TỔNG TIỀN'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'K' + index, value: tong_tien}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'L' + index, value: ''}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    // Create footer
    index++
    worksheet.mergeCells('A' + index + ':B' + index);
    worksheet.mergeCells('C' + index + ':L' + index);
    FillCell(worksheet,
        [{name: 'A' + index, value: 'Khách hàng:'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'C' + index, value: content.khach_hang}],
        {vertical: 'middle', horizontal: 'left', wrapText: true},
        {size: 12},
        {},
        {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    index++
    worksheet.mergeCells('A' + index + ':B' + index);
    worksheet.mergeCells('C' + index + ':L' + index);
    FillCell(worksheet,
        [{name: 'A' + index, value: 'Liên hệ:'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'C' + index, value: content.lien_he}],
        {vertical: 'middle', horizontal: 'left', wrapText: true},
        {size: 12},
        {},
        {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    index++
    worksheet.mergeCells('A' + index + ':B' + index);
    worksheet.mergeCells('C' + index + ':L' + index);
    FillCell(worksheet,
        [{name: 'A' + index, value: 'Mail:'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'C' + index, value: content.dia_chi}],
        {vertical: 'middle', horizontal: 'left', wrapText: true},
        {size: 12},
        {},
        {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )

    index++
    worksheet.mergeCells('A' + index + ':B' + index);
    worksheet.mergeCells('C' + index + ':L' + index);
    FillCell(worksheet,
        [{name: 'A' + index, value: 'Địa chỉ:'}],
        {vertical: 'middle', horizontal: 'center' }, {size: 12, bold: true},
        {}, {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
    FillCell(worksheet,
        [{name: 'C' + index, value: content.email}],
        {vertical: 'middle', horizontal: 'left', wrapText: true},
        {size: 12},
        {},
        {top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
    )
}
async function CreateDonHang(filename, content) {
    // create workbook by api.
    var workbook = new Excel.Workbook();

    // must create one more sheet.
    var worksheet = workbook.addWorksheet("Don Hang");

    MergeCellHeader(worksheet)
    CreateStaticContent(worksheet)
    FillContent(worksheet, content)

    var imageID = workbook.addImage({
        filename: process.cwd() + '/public/logoebox.png',
        extension: 'png',
    });

    worksheet.addImage(imageID, 'B2:C3');
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