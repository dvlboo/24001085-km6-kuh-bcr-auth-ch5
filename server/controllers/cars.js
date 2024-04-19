const { getCars, getCar, createCar, updateCar, deleteCar } = require('../services/cars')

exports.getCars = async (req, res, next) => {
  try {
    const data = await getCars()
    const response = {
      message : "Success",
      data
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

exports.getCar = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await getCar(id)

    const response = {
      message : "Success",
      data
    }

    !data 
      ? res.status(500).json({message : `Car with id ${id} is not found!`, statusCode : 404})
      : res.status(200).json(response)
  } catch (error) {
    next(error)
  }
  
}

exports.createCar = async (req, res, next) => {
  try {
    const { name, rent_per_day, sizes_id } = req.body
    const { photo } = req.files

    if (!name || name == "") {
      return next({
        message: "Name are required!!",
        statusCode : 400
      })
    }
    if (!rent_per_day || rent_per_day == "") {
      return next({
        message: "Rent per Day are required!!",
        statusCode : 400
      })
    }
    if (!sizes_id || sizes_id == "") {
      return next({
        message: "Sizes_id are required!!",
        statusCode : 400
      })
    }
    if (!photo || photo == "") {
      return next({
        message: "Photo are required!!",
        statusCode : 400
      })
    }

    const data = await createCar({
      name,
      rent_per_day,
      sizes_id,
      photo
    })

    const response = {
      message : "Success",
      data
    }

    res.status(201).json(response)

  } catch (error) {
    next(error)
  }
}

exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, rent_per_day, sizes_id } = req.body
    const { photo } = req.files

    if (!name || name == "") {
      return next({
        message: "Name are required!!",
        statusCode : 400
      })
    }
    if (!rent_per_day || rent_per_day == "") {
      return next({
        message: "Rent per Day are required!!",
        statusCode : 400
      })
    }
    if (!sizes_id || sizes_id == "") {
      return next({
        message: "Sizes_id are required!!",
        statusCode : 400
      })
    }
    if (!photo || photo == "") {
      return next({
        message: "Photo are required!!",
        statusCode : 400
      })
    }

    const data = await updateCar(id, { 
      name, 
      rent_per_day, 
      sizes_id, 
      photo 
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

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await deleteCar(id)

    const response = {
      message: "Car deleted successfully",
      data,
    }

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
}