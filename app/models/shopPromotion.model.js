const { model, Schema } = require('mongoose')

const shopPromotionSchema = new Schema({
  shop_id: {
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory'
  },
  products: {
    type: Array,
    required: [true, 'Debe haber al menos un producto'],
    default: []
  }
})

module.exports = model('shopPromotion', shopPromotionSchema)
