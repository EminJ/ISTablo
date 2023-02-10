const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
        title: { type: String, required: true },
        explanation: { type: String, required: true },
        category: { type: Array, required: true },
        type: { type: Array, required: true },
        images: { type: Array, required: true },
        size: { type: Array, required: true },
        color:{ type: Array, required: true },
        price:{ type: Number, required: true },
});

const Tablo = mongoose.model('tablo', UserSchema)

module.exports = Tablo;