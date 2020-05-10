const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productCategorySchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  code: {
    type: String,
    required: [true, 'El codigo es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  }
})

productCategorySchema.methods.toJSON = function () {
  let productCategory = this
  let productCategoryObject = productCategory.toObject()
  delete productCategoryObject.__v

  return productCategoryObject
}

productCategorySchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('ProductCategory', productCategorySchema)
