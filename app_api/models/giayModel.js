var mongoose = require('mongoose');

var giaySchema = mongoose.Schema({
    ma_sp: { type: String, required: true, unique: true },
    ten_sp: { type: String, required: true },
    so_lop: { type: Number, required: true },
    gia_sp: { type: Number, required: true },
    mo_ta: { type: String, default: ""}
});

mongoose.model('GiayModel', giaySchema);