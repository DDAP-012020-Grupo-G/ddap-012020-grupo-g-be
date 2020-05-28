const userService = require('../services/user.service')

const Profile = require('../models/profile.model')

module.exports = {
  getByUserId,
  create,
  update
}

async function getByUserId(user_id) {
  return await Profile.findOne({
    user_id: user_id
  })
}

async function create({ user_id, firstName, lastName}) {
  const profile = new Profile({
    user_id,
    firstName,
    lastName
  })

  // save profile
  await profile.save()
}

async function update(user_id, profileParam) {
  const profile = await this.getByUserId(user_id)

  // validate
  if (!profile) throw 'Perfil no encontrado'
  
  // copy userParam properties to user
  Object.assign(profile, profileParam)

  await profile.save()
}
