const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
  profile_id: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  shop_id: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  price: {
    type: Number
  },
  products: {
    type: Array,
    required: [true, 'Debe haber al menos un producto'],
    default: []
  }
})
  
module.exports = model('order', orderSchema)
  
