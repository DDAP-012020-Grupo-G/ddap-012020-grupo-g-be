const { model, Schema } = require('mongoose')
const Product = require('./product.model')

const orderSchema = new Schema({
  profile_id: {
    type: Schema.Types.ObjectId,
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
  
module.exports = model('order', orderSchema)
  
