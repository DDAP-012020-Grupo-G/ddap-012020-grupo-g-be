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
    'Snacks',
    'Bebidas sin alcohol'
  ],
  message: '{VALUE} no es un rubro válido'
}

const shopPromotionSchema = new Schema({
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  title: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  discount: {
    type: Number,
    required: [true, 'El descuento es obligatorio']
  },
  validThrough: {
    type: Array,
    required: [true, 'El rango de fechas es obligatorio'],
    default: []
  },
  product_category_id: {
    type: Number,
    required: [true, 'La categoria de productos es obligatoria']
  },
  products: {
    type: Array,
    required: [true, 'Debe haber al menos un producto'],
    default: []
  }
})

shopPromotionSchema.methods.toJSON = function () {
  let shopPromotion = this
  let shopPromotionObject = shopPromotion.toObject()
  delete shopPromotionObject.__v

  return shopPromotionObject
}

shopPromotionSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('shopPromotion', shopPromotionSchema)
