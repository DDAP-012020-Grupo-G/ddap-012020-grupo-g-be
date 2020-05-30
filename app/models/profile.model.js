const { model, Schema } = require('mongoose')

const profileSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'El id del usuario es obligatorio'],
    ref: 'User'
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phoneNbr: {
    type: String
  },
  address: {
    type: String
  },
  geo_id: {
    type: Schema.Types.ObjectId,
    ref: 'Geo'
  },
  picUrl: {
    type: String
  }
})

module.exports = model('Profile', profileSchema)
