const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'El userId es obligatorio'],
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
  geo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Geo'
  },
  picUrl: {
    type: String
  }
})

module.exports = mongoose.model('Profile', profileSchema)
