const { user } = require('../../../models')
const { uploader } = require('../../../src/helper/cloudinary')
const { getData, setData, deleteData } = require("../../../src/helper/redis");
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const path = require('path')

exports.createUser = async (payload) => {
  // encrypt the pass
  payload.password = bcrypt.hashSync(payload.password, 10)

  if (payload.photo) {
    const { photo } = payload

    photo.publicId = crypto.randomBytes(16).toString('hex')

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`

    const imageUpload = await uploader(photo)
    payload.photo = imageUpload.secure_url
  }

  const data = await user.create(payload)

  const keyID = `users:${data.id}`
  await setData(keyID, data, 300)

  const keyEmail = `users:${data.email}`
  await setData(keyEmail, data, 300)

  return data
}

exports.getUsers = async () => data = await user.findAll()

exports.getUserById = async (id) => {
  const key = `users:${id}`
  let data = await getData (key)
  if (data) {
    return data
  }

  data = await user.findAll({
    where : { id }
  })

  if (data.length > 0) {
    await setData(key, data[0], 300)
    return data[0]
  }

  throw new Error(`Users is Not Found`)
}

exports.getUserByEmail = async (email) => {
  const key = `users:${email}`
  let data = await getData (key)
  if (data) {
    return data
  }

  data = await user.findAll({
    where : { email }
  })

  if (data.length > 0) {
    await setData(key, data[0], 300)
    return data[0]
  }

  throw new Error(`Users is Not Found`)
}

exports.delUser = async (id) => {
  const key = `users:${id}`;
  let data = await getData(key);

  if (data) {
    await deleteData(key);
    return data;
  }

  const deluser = await user.findByPk(id);

  if (deluser) {
    await deluser.destroy();
    return deluser;
  }

  throw new Error(`User with ID ${id} Not Found`);
};