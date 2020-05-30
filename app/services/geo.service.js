const Geo = require('../models/geo.model')
const axios = require("axios");

module.exports = {
  getAll,
  create,
  update,
  getById
}

async function create(geoParam) {
  const query = geoParam.address.replace(' ', '%20')
  const url = `https://us1.locationiq.com/v1/search.php?key=3cf1abcf0e5d6e&q=${query}&format=json`

  try {
    const response = await axios.get(url)
    const data = response.data
    const firstLocation = data[0]

    const coordinates = [firstLocation.lat, firstLocation.lon]

    const geo = new Geo({ coordinates, ...geoParam })
    
    // save geo
    await geo.save()

    return geo
  } catch (error) {
    throw 'Dirección inválida'
  }
}

async function update(shop_id, shopParam) {
  const shop = await Shop.findById(shop_id)

  // validate
  if (!shop) throw 'Comercio no encontrado'
  
  // copy userParam properties to user
  Object.assign(shop, shopParam)

  await shop.save()
}

async function getById(geo_id) {
  return await Geo.findById(geo_id)
}

async function getAll() {
  return await Shop.find()
}
