const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const validTypes = {
  values: ['CUSTOMER', 'SHOP'],
  message: '{VALUE} no es un tipo válido'
}

const geoSchema = new Schema({
  address: {
    type: String,
    unique: true,
    required: [true, 'La dirección es obligatoria']
  },
  type: {
    type: String,
    required: [true, 'El tipo es obligatorio'],
    enum: validTypes
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

geoSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('Geo', geoSchema)
