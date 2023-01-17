const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        siparisler:{ type: Array},
        kartbilgileri:{ type: Array},
        sepet:{ type: Array},
        favoriler:{ type: Array},
        adres:{ type: Array}
},{
  timestamps: true,
});

const Users = mongoose.model('users', UserSchema)

module.exports = Users;