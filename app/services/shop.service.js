const Shop = require('../models/shop.model')

module.exports = {
  getAll,
  create
}

async function create(shopParam) {
  const shop = new Shop(shopParam)

  // save shop
  await shop.save()
  return shop
}

async function getAll() {
  return await Shop.find()
}
