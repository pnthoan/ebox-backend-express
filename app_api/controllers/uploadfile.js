var fs = require('fs');
var path = require('path');
const ExcelJS = require('exceljs');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

async function read_from_file(file) {
    const workbook = new ExcelJS.Workbook();
    return await workbook.xlsx.readFile(file)
    .then(function() {
        var data = [];
        const ws = workbook.worksheets[0];
        ws.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            data.push(row.values.slice(1, row.values.length));
        });

        return data;
    });
}

module.exports.uploadFile = async function (req, res) {
    // console.log(req)
    var data = req.body.data.data
    var file_name =  req.body.file
    const b64Data = data.split(',')[1]
    const blobUrl = Buffer.from(b64Data, 'base64');

    await fs.writeFile(file_name, blobUrl, err => {
        if (err) {
            sendJSONresponse(res, 500, "Oops! Something went wrong!");
        }

        const output = "../../public/uploads/" + file_name;
        const targetPath = path.join(__dirname, output);

        console.log(targetPath)
        fs.rename(file_name, targetPath, async err => {
            if (err) {
                sendJSONresponse(res, 500, "Oops! Something went wrong!");
            } else {
                await read_from_file(targetPath)
                .then(data => {
                    sendJSONresponse(res, 200, data);
                })
                .catch(err => {
                    console.log(err)
                    sendJSONresponse(res, 500, "Oops! Something went wrong!");
                })
            }
        });
    });
};
