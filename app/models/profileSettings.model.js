const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const profileSettingsSchema = new Schema({
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  thresholds: {
    type: Array,
    default: []
  },
  savedCarts: {
    type: Array,
    default: []
  }
})

profileSettingsSchema.methods.toJSON = function () {
  let profileSettings = this
  let profileSettingsObject = profileSettings.toObject()
  delete profileSettingsObject.__v

  return profileSettingsObject
}

profileSettingsSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = model('ProfileSettings', profileSettingsSchema)
