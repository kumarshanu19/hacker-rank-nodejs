// Uncomment the code below to use Sequelize ORM
// const {Sequelize} = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
const mongoose = require('mongoose');
const schema = mongoose.Schema

// Insert your model definition below
const tableSchema = new schema({
    id:{
        type:Number,
        required: true
    },
    type: String,
    user_id: Number,
    symbol:String,
    shares: Number,
    price: Number,
    timestamp: {
        type: Number,
        default: Date.now(),
    }
  })

  module.exports =mongoose.model('stock',tableSchema)