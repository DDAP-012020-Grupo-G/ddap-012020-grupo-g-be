const Shop = require('../models/shop.model')

module.exports = {
  getAll,
  create,
  update,
  getByProfileId
}

async function create(shopParam) {
  const shop = new Shop(shopParam)

  // save shop
  await shop.save()
  return shop
}

async function update(shop_id, shopParam) {
  const shop = await Shop.findById(shop_id)

  // validate
  if (!shop) throw 'Comercio no encontrado'
  
  // copy userParam properties to user
  Object.assign(shop, shopParam)

  await shop.save()
}

async function getByProfileId(profile_id) {
  return await Shop.findOne({
    profile_id: profile_id
  })
}

async function getAll() {
  return await Shop.find()
}
