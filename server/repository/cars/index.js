const { cars, sizes } = require('../../../models')
const { uploader } = require('../../../src/helper/cloudinary')
const { getData, setData, deleteData } = require("../../../src/helper/redis")
const crypto = require('crypto')
const path = require('path')

exports.getCars = async () => {
  const data = await cars.findAll({
    include: {
      model : sizes
    }
  })
  return data
}

exports.getCar = async (id) => {
  const key = `cars:${id}`

  // get from redis
  let data = await getData(key)
  if (data) {
    return data
  }

  // get from db
  data = await cars.findAll({
    where: {
      id,
    },
    include: {
      model: sizes,
    },
  })
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300)

    return data[0]
  }

  throw new Error(`Cras is Not Found!`)

}

exports.createCar = async (payload) => {
  if (payload.photo) {
    const { photo } = payload

    photo.publicId = crypto.randomBytes(16).toString('hex')

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`
    
    const imageUpload = await uploader(photo)
    payload.photo = imageUpload.secure_url
  }

  // save to db
  const data = await cars.create(payload)

  // save to redis
  const key = `cars:${data.id}`
  await setData(key, data, 300)

  return data
}

exports.updateCar = async (id, payload) => {
  const key = `cars:${id}`

  if (payload.photo) {
    const { photo } = payload

    photo.publicId = crypto.randomBytes(16).toString('hex')

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`

    const imageUpload = await uploader(photo)
    payload.photo = imageUpload.secure_url
  }

  // update to postgres
  await cars.update(payload, {
    where: {
      id,
    },
  })

  // get from postgres
  const data = await cars.findAll({
    where: {
      id,
    },
    include: {
      model: sizes,
    },
  })
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300)

    return data[0]
  }

  return data
}

exports.deleteCar = async (id) => {
  const key = `cars:${id}`

  // delete from postgres
  await cars.destroy({ where: { id } })

  // delete from redis
  await deleteData(key)

  return null
}