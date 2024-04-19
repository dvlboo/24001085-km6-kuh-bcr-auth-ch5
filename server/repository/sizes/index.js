const { cars, sizes } = require('../../../models')
const { getData, setData, deleteData } = require('../../../src/helper/redis')

exports.getSizes = async () => {
  const data = await sizes.findAll({
    include: {
      model: cars
    }
  })
  return data
}

exports.getSize = async (id) => {
  const key = `sizes:${id}`
  
  // get from redis
  let data = await getData(key)
  if (data) {
    return data
  }

  // get from db
  data = await sizes.findAll({
    where: { id },
    include: {
      model: cars
    }
  })

  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300)

    return data[0]
  }

  throw new Error(`Sizes is Not Found`)
}

exports.createSize = async (payload) => {
  // save to db
  const data = await sizes.create(payload)

  // save to redis
  const key = `sizes:${data.id}`
  await setData(key, data, 300)

  return data
}

exports.updateSize = async (id, payload) => {
  const key = `sizes:${id}`

  // update to postgres
  await sizes.update(payload, {
    where:{ id },
  })

  // get form postgres
  const data = await sizes.findAll({
    where:{ id },
    include:{
      model: cars
    }
  })
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300)

    return data[0]
  }
  return data
}

exports.deleteSize = async (id) => {
  const key = `sizes:${id}`

  // del from postgres
  await sizes.destroy({where:{ id }})

  // del form redis
  await deleteData(key)
  
  return null
}