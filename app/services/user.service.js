const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const profileService = require('../services/profile.service')
const log4js = require('log4js')
const logger = log4js.getLogger('services')
const User = require('../models/user.model')

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
}

async function authenticate({ email, password }) {
  const user = await User.findOne({ email })
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject()
    const token = jwt.sign({ sub: user.id }, process.env.TOKEN, {
      expiresIn: process.env.TOKEN_TIMEOUT
    })
    logger.info(`User with email ${email} logged in succesfully.`)
    return {
      ...userWithoutHash,
      token
    }
  }
}

async function getAll() {
  return await User.find().select('-hash')
}

async function getById(id) {
  return await User.findById(id).select('-hash')
}

async function existsUserWithEmail(email) {
  return await User.findOne({ email })
}

async function create(userParam) {
  // validate
  if (await existsUserWithEmail(userParam.email)) {
    logger.error(`Attempt to register account with email ${userParam.email} but an account with that email already exists.`)
    throw 'El email [' + userParam.email + '] ya existe'
  }
  if (!userParam.password) {
    throw 'La contraseña es requerida'
  }

  const user = new User(userParam)

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10)
  }
  await user.save()

  await profileService.create({
    user_id: user.id,
    firstName: userParam.firstName,
    lastName: userParam.lastName
  })
  logger.info(`Created a new account with email ${userParam.email}.`)
  return user
}

async function update(id, userParam) {
  const user = await User.findById(id)

  // validate
  if (!user) throw 'Usuario no encontrado'
  if (user.email !== userParam.email && (await this.existsUserWithEmail(userParam.email))) {
    throw 'El email [' + userParam.email + '] ya existe'
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10)
  }

  // copy userParam properties to user
  Object.assign(user, userParam)

  await user.save() 
  logger.info(`Account with email ${userParam.email} has updated its data.`)
}

async function _delete(id) {
  await User.findOneAndDelete(id)
}
