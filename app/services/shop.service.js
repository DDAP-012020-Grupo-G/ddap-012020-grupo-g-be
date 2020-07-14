const Shop = require('../models/shop.model')
const log4js = require('log4js')
const logger = log4js.getLogger('services')

module.exports = {
  getAll,
  getById,
  create,
  update,
  getByProfileId
}

async function create(shopParam) {
  const shop = new Shop(shopParam)

  // save shop
  await shop.save()
  logger.info(`Created a new shop with name ${shopParam.name}`)
  return shop
}

async function update(shop_id, shopParam) {
  const shop = await Shop.findById(shop_id)

  // validate
  if (!shop) throw 'Comercio no encontrado'
  
  // copy userParam properties to user
  Object.assign(shop, shopParam)

  await shop.save()
  logger.info(`Shop with name ${shopParam.name} has updated its data.`)
}

async function getByProfileId(profile_id) {
  logger.info(`User with profile id ${profile_id} requested his own shop.`)
  return await Shop.findOne({
    profile_id: profile_id
  })
}

async function getById(shop_id) {
  logger.info(`Someone has entered into shop with id ${shop_id}.`)
  return await Shop.findById(shop_id)
}

async function getAll() {
  return await Shop.find()
}
