const { getSizes, getSize, createSize, updateSize, deleteSize } = require('../services/sizes')

exports.getSizes = async (req, res, next) => {
  try {
    const data = await getSizes()
    const response = {
      message : "Success",
      data
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

exports.getSize = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await getSize(id)
  
    const response = {
      message : "Success",
      data
    }

    !data 
      ? res.status(500).json({message : `Size with id ${id} is not found!`, statusCode : 404})
      : res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

exports.createSize = async (req, res, next) => {
  try {
    const { size_category, capacity } = req.body

    if (!size_category || size_category == "") {
      return next({
        message: "Size Category are required!!",
        statusCode : 400
      })
    }
    if (!capacity || capacity == "") {
      return next({
        message: "Capacity are required!!",
        statusCode : 400
      })
    }

    const data = await createSize({ size_category, capacity })

    const response = {
      message : "Success",
      data
    }

    res.status(201).json(response)

  } catch (error) {
    next(error)
  }
}

exports.updateSize = async (req, res, next) => {
  try {
    const { id } = req.params
    const { size_category, capacity } = req.body

    if (!size_category || size_category == "") {
      return next({
        message: "Size Category are required!!",
        statusCode : 400
      })
    }
    if (!capacity || capacity == "") {
      return next({
        message: "Capacity are required!!",
        statusCode : 400
      })
    }

    const data = await updateSize(id, { size_category, capacity })

    const response = {
      message : "Success",
      data
    }

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
}

exports.deleteSize = async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await deleteSize(id)

    const response = {
      message: "Size deleted successfully",
      data,
    }

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }
}