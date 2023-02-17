const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
        tablo:{ type: Array, required: true },
        cart:{ type: Array, required: true },
        Adres:{ type: Array, required: true },
        user:{ type: String, required: true },
        
});

const Siparis = mongoose.model('siparis', UserSchema)

module.exports = Siparis;