const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const orderSchema = new Schema({
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  price: {
    type: Number
  },
  cart: {
    type: Array,
    required: [true, 'Debe haber al menos un producto'],
    default: []
  }
})

orderSchema.methods.toJSON = function () {
    let order = this
    let orderObject = order.toObject()
    delete orderObject.__v
  
    return orderObject
  }
  
  orderSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
  })
  
  module.exports = model('order', orderSchema)
  
