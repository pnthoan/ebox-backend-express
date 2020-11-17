var fs = require('fs');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.uploadFile = async function (req, res) {
    var data = req.body.data.data
    var file_name =  req.body.file
    const b64Data = data.split(',')[1]
    const blobUrl = Buffer.from(b64Data, 'base64');

    await fs.writeFile(file_name, blobUrl, err => {
        if (err) {
            sendJSONresponse(res, 500, "Oops! Something went wrong!");
        }

        const output = "./public/uploads/" + file_name;
        const targetPath = path.join(__dirname, output);

        fs.rename(file_name, targetPath, err => {
            if (err) {
                sendJSONresponse(res, 500, "Oops! Something went wrong!");
            } else {
                sendJSONresponse(res, 200, "Successfully Written to File.");
            }
        });
    });
};