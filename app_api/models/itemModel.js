var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
    loaihop: { type: String, required: true},
    loaigiay: { type: String, default: ""},
    dai: { type: Number, default: 0},
    rong: { type: Number, default: 0},
    cao: { type: Number, default: 0},
    soluong: { type: Number, default: 0},
    soluongmau: { type: Number, default: 0},
    gia: { type: Number, default: 0},
    ghichu: { type: String, default: ""},
    isprint: { type: Boolean, default: false},
    iskhuon: { type: Boolean, default: false},

    id_refer: { type: String, default: ""},

    user: { type: String, required: true},
    created_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('ItemModel', ItemSchema);