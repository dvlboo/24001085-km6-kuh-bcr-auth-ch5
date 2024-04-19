const { createUser, getUserByEmail, getUserById } = require('../../repository/user')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = async (payload) => {
  const user = await createUser(payload)

  // biar ga kebaca respon
  delete user.dataValues.password

  // create token
  const jwtPayload = {
    id : user.id
  }

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn : '1h'
  })

  const data = {
    user,
    token
  }

  return data
}

exports.login = async (payload) => {
  const user = await getUserByEmail(payload.email)

  if (!user) {
    throw new Error(`User with email : ${payload.email} Not Found`)
  }
  
  const passwordMatch = await bcrypt.compare(payload.password, user?.password)

  if(!passwordMatch) {
    throw new Error (`Invalid Password`)
  }

  // create token
  const jwtPayload = {
    id : user.id
  }

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn : '1h'
  })
  
  // delete password
  user?.dataValues?.password 
    ? delete user?.dataValues?.password
    : delete user?.password

  const data = {
    user,
    token
  }

  return data
}

exports.profile = async (id) => {
  let data = await getUserById(id)
  if (!data) {
    throw new Error(`User is not Found`)
  }

  // delete password
  if (data?.dataValues?.password) {
    delete data?.dataValues?.password
  } else {
    delete data?.password
  }

  return data
}