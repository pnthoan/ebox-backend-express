const ExcelJS = require('exceljs');

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

async function export_to_file(file, data) {
    console.log(file);
    console.log(data);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet A");

    var i = 0;
    for (; i < data.length; i++) {
        // console.log(JSON.stringify(data[i]));
        worksheet.getRow(i + 1).values = data[i];
    }
    await workbook.xlsx.writeFile(file);
}

var filename = process.cwd() + "/data_tmp.xlsx";
var data = read_from_file(filename)
.then(async function(data) {
    // console.log(data);
    var file = process.cwd() + "/data_tmp_out.xlsx";
    await export_to_file(file, data);
})

// User
{
    "username" : "pnthoan",
    "name": "Pham Ngoc Thoan",
    "role": "Admin", // Admin, Member
    "email": "pnthoan@gmail.com",
    "sdt": "0932159064",
    "dia_chi" : "xyz",
    "hash": "",
    "salt": ""
}

// Loai giay
{
    "ma_sp" : "ABC",
    "ten_sp" : "XYZ",
    "so_lop" : 3,
    "gia_sp" : 0.0,
    "mo_ta" : ""
}

// Loai Hop
{
    "loai_hop" : "AAA",
    "cong_thuc" : "(d + r) * c + g",
    "loi_nhuan" : [
        {
            "so_lop" : 3,
            "he_so" : "[[\"Name\",100,200,300,400],[1000,0.1,0.2,0.3,0.4],[2000,1.1,1.2,1.3,1.4],[3000,2.1,2.2,2.3,2.4],[4000,3.1,3.2,3.3,3.4],[5000,4.1,4.2,4.3,4.4]]"
        }
    ]
}

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payloadebox'
});

var ctrlHop = require('../controllers/hop');
var ctrlGiay = require('../controllers/giay');
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentication');
var ctrlCal = require('../controllers/calculate');

// authentication
router.post('/login', ctrlAuth.login);

// user
router.post('/users', auth, ctrlUsers.usersCreate);
router.get('/users', auth, ctrlUsers.userReadAll);
router.get('/users/:userid', auth, ctrlUsers.userReadOne);
router.put('/users/:userid', auth, ctrlUsers.userUpdateOne);
router.delete('/users/:userid', auth, ctrlUsers.userDeleteOne);

// Loai Giay
router.post('/giay', auth, ctrlGiay.giayCreate);
router.get('/giay', auth, ctrlGiay.giayReadAll);
router.get('/giay/:giayid', auth, ctrlGiay.giayReadOne);
router.put('/giay/:giayid', auth, ctrlGiay.giayUpdateOne);
router.delete('/giay/:giayid', auth, ctrlGiay.giayDeleteOne);

// Loai Hop
router.post('/hop', auth, ctrlHop.hopCreate);
router.get('/hop', auth, ctrlHop.hopReadAll);
router.get('/hop/:hopid', auth, ctrlHop.hopReadOne);
router.put('/hop/:hopid', auth, ctrlHop.hopUpdateOne);
router.delete('/hop/:hopid', auth, ctrlHop.hopDeleteOne);

// Calculator
router.get('/calculate', auth, ctrlCal.Calculate);