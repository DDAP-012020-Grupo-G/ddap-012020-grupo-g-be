const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es obligatorio']
  },
  hash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()
  delete userObject.__v

  return userObject
}

userSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('User', userSchema)
