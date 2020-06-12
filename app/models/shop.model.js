const { model, Schema } = require('mongoose')

const shopSchema = new Schema({
  profile_id: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  desc: {
    type: String
  },
  rating: {
    type: Number
  },
  phoneNbr: {
    type: String,
    required: [true, 'El numero de telefono es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio']
  },
  address: {
    type: String,
    required: [true, 'La dirección es obligatoria']
  },
  geo_id: {
    type: Schema.Types.ObjectId,
    ref: 'Geo'
  },
  picUrl: {
    type: String
  },
  color: {
    type: String
  },
  shop_category_id: {
    type: Schema.Types.ObjectId,
    ref: 'ShopCategory'
  },
  timeSchedule: {
    type: Array,
    default: []
  },
  paymentMethods: {
    type: Array,
    default: []
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

module.exports = model('Shop', shopSchema)
