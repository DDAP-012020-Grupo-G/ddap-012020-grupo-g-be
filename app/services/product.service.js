const Product = require('../models/product.model')

module.exports = {
  create,
  update,
  getAll,
  getByShopId,
  // getByProfileId
}

async function create(productParam) {
  const product = new Product(productParam)

  // save product
  await product.save()
  return product
}

async function update(product_id, productParam) {
  const product = await Product.findById(product_id)

  // validate
  if (!product) throw 'Producto no encontrado'
  
  // copy productParam properties to user
  Object.assign(product, productParam)

  await product.save()
}

async function getAll() {
  return await Product.find()
}

async function getByShopId(shop_id) {
  return await Product.find({
    shop_id: shop_id
  })
}

// async function getById(shop_id) {
//   return await Shop.findById(shop_id)
// }
