const { createClient } = require('redis')

const client = async () => {
    const clients = createClient({
        password: process.env.REDIS_PASS,
        socket: { 
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    })

    await clients.connect()
    return clients;
}

module.exports = client