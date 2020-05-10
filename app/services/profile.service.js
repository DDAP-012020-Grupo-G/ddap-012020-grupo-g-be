const Profile = require('../models/profile.model')

module.exports = {
  getByUserId,
  create
}

async function getByUserId(user_id) {
  return await Profile.findOne({
    user_id: user_id
  })
}

async function create(id) {
  const profile = new Profile({
    user_id: id
  })

  // save profile
  await profile.save()
}
