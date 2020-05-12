const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productCategorySchema = new Schema({
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

productCategorySchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('ProductCategory', productCategorySchema)