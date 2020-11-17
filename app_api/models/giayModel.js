var mongoose = require('mongoose');

var giaySchema = mongoose.Schema({
    ma_giay: { type: String, required: true, unique: true },
    ten_giay: { type: String, required: true },
    so_lop: { type: Number, required: true },
    don_gia: { type: Number, required: true },
    mo_ta: { type: String, default: ""}
});

mongoose.model('GiayModel', giaySchema);