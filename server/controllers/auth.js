const { register, login, profile, superLogin, editRoles, getUsers, delUser } = require('../services/auth')

exports.register = async (req, res, next) => {
  try {
    //get body
    const { name, password, email } = req.body

    // get files
    const { photo } = req.files

    if (name == "" ||!name) {
      return next({
        message : "Name Must Be Filled!",
        statusCode : 400
      })
    }
    if (password == "" ||!password) {
      return next({
        message : "Password Must Be Filled!",
        statusCode : 400
      })
    }
    if (email == "" ||!email) {
      return next({
        message : "Email Must Be Filled!",
        statusCode : 400
      })
    }

    const data = await register({
      name, password, email, photo
    })

    const response = {
      message : "Success",
      data
    }

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    
    if(!email || email == '' || !password || password == '') {
      return next({
        message : 'Email and Password are Required',
        statusCode: 400
      })
    }

    const data = await login ({email, password})
    
    const response = {
      message : "Login Success",
      data
    }

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
}

exports.profile = async (req, res, next) => {
  try {
    // get user by id
    const data = await profile(req.user.id)

    const response = {
      message : "Success",
      data
    }

    res.status(200).json(response)
    
  } catch (error) {
    next(error)
  }
}

// superadmin
exports.superLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    
    if(!email || email == '' || !password || password == '') {
      return next({
        message : 'Email and Password are Required',
        statusCode: 400
      })
    }

    const data = await superLogin ({email, password})
    
    const response = {
      message : `Login as Superadmin Success`,
      data
    }

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
}

exports.editRoles = async (req, res, next) => {
  try {
    const {email , roles} = req.body

    if(!email || email == '' || !roles || roles == '') {
      return next({
        message : 'Email and Roles are Required',
        statusCode: 400
      })
    }

    if (roles !== 'admin' && roles !== 'user') {
      return next({
        message : 'Roles must be admin or user',
        statusCode: 401
      })
    }

    const data = await editRoles ({email, roles})

    const response = {
      message : `User Role Updated Successfully`,
      data
    }

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const data = await getUsers()
    const response = {
      message : "Success",
      data
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

exports.delUser = async (req, res, next) => {
  try {
    // get user by id
    const { id } = req.params

    const data = await delUser(id)

    const response = {
      message : "Deleted User Succesfully",
      data
    }

    res.status(200).json(response)
    
  } catch (error) {
    next(error)
  }
}