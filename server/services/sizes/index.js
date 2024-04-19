const {getSizes , getSize, createSize, updateSize, deleteSize} = require('../../repository/sizes')

exports.getSizes = async () => data = await getSizes()
exports.getSize = async (id) => data = await getSize(id)
exports.createSize = async (payload) => data = await createSize(payload)
exports.updateSize = async (id, payload) => data = await updateSize(id, payload)
exports.deleteSize = async (id) => data = await deleteSize(id)