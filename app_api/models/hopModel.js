var mongoose = require('mongoose');

var loiNhuanSchema = new mongoose.Schema({
    so_lop : {
        type: String,
        default: "",
    },
    he_so: {
        type: String,
        default: "",
    }
});

var hopSchema = mongoose.Schema({
    loai_hop: {
        type: String,
        unique: true,
        required: true
    },
    cong_thuc: {
        type: String,
        required: true
    },
    loi_nhuan: [loiNhuanSchema],
    created_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('HopModel', hopSchema);