const { getCars, getCar, createCar, updateCar, deleteCar } = require('../../repository/cars')

exports.getCars = async () => data = await getCars()
exports.getCar = async (id) => data = await getCar(id)
exports.createCar = async (payload) => data = await createCar(payload)
exports.updateCar = async (id, payload) => data = await updateCar(id, payload)
exports.deleteCar = async (id) => data = await deleteCar(id)