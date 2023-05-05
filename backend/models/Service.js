const mongoose = require('mongoose');


const Schema =  mongoose.Schema;
    const schema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
    service:{
        type:String,
    },
    service_price:{
        type:Number,
    },
    email:{
        type:String
    }
})

const Servicedb = mongoose.model('servicedb',schema)

module.exports = Servicedb