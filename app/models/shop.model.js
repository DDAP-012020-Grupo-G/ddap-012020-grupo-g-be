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

const shopSchema = new Schema({
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  phoneNbr: {
    type: Number,
    required: [true, 'El numero de telefono es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio']
  },
  geo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Geo'
  },
  picUrl: {
    type: String
  },
  shop_category_id: {
    type: String,
    required: [true, 'El rubro es obligatorio'],
    enum: validTypes
  },
  timeSchedule: {
    type: Array,
    default: []
  },
  paymentMethods: {
    type: Array,
    default: []
  },
  address: {
    type: String
  },
  delivery: {
    enabled: {
      type: Boolean,
      default: false
    },
    maxRange: {
      type: Number
    }
  }
})

shopSchema.methods.toJSON = function () {
  let shop = this
  let shopObject = shop.toObject()
  delete shopObject.__v

  return shopObject
}

shopSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('Shop', shopSchema)
