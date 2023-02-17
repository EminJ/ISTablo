const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
        title: { type: String, required: true },
        explanation: { type: String, required: true },
        category: { type: String, required: true },
        type: { type: String, required: true },
        images: { type: Array, required: true },
        size: { type: Array, required: true },
        color:{ type: Array, required: true },
        price:{ type: Number, required: true },
        tabloid:{ type: Number, required: true },
});

const Tablo = mongoose.model('tablo', UserSchema)

module.exports = Tablo;