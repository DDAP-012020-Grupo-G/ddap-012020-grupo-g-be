const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const validTypes = {
  values: [
    'Frutas y verduras',
    'Carnes rojas y blancas',
    'Pescadería',
    'Panificados y pastelería',
    'Bebidas alcoholicas',
    'Cafeteria',
    'Comida rapida',
    'Snacks',
    'Bebidas sin alcohol'
  ],
  message: '{VALUE} no es un rubro válido'
}

const productSchema = new Schema({
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: String,
    required: [true, 'El rubro es obligatorio'],
    enum: validTypes
  }
})

productSchema.methods.toJSON = function () {
  let product = this
  let productObject = product.toObject()
  delete productObject.__v

  return productObject
}

productSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('product', productSchema)
