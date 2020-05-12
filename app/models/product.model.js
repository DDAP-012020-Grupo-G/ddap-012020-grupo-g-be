const { model, Schema } = require('mongoose')

const productSchema = new Schema({
  shop_id: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  brand: {
    type: String,
    required: [true, 'La marca es obligatoria']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio']
  },
  picUrl: {
    type: String
  },
  product_category_id: {
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: [true, 'El rubro es obligatorio'],
  }
})

module.exports = model('product', productSchema)