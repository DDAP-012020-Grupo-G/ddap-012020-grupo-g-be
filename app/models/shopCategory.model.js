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

const shopCategorySchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: [true, 'El codigo es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  }
})

shopCategorySchema.methods.toJSON = function () {
  let shopCategory = this
  let shopCategoryObject = shopCategory.toObject()
  delete shopCategoryObject.__v

  return shopCategoryObject
}

shopCategorySchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('shopCategory', shopCategorySchema)
