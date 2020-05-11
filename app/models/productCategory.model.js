const {
  model,
  Schema
} = require('mongoose')
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

const productCategorySchema = new Schema({
  code: {
    type: String,
    required: [true, 'El codigo es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  }
})

productCategorySchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('ProductCategory', productCategorySchema)