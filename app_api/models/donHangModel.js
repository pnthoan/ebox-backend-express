var mongoose = require('mongoose');

var DHSchema = mongoose.Schema({
    khach_hang: { type: String, required: true},
    lien_he: { type: String, default: ""},
    dia_chi: { type: String, default: ""},
    email: { type: String, default: ""},

    user: { type: String, required: true},
    created_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('DonHangModel', DHSchema);