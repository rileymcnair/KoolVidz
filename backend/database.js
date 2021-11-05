const { Client } = require('pg')

const DATABASE_USER = 'postgres'
const DATABASE_HOST = 'localhost'
const DATABASE_NAME = 'koolvidz'
const DATABASE_PORT = 5432

class DB {
  async connect () {
    this.client = new Client({
      user: DATABASE_USER,
      host: DATABASE_HOST,
      database: DATABASE_NAME,
      password: '', // Do not commit!
      port: DATABASE_PORT
    })

    await this.client.connect()
  }

  async get () {
    const res = await this.client.query('SELECT NOW()')
    console.log(res)
  }

  async close () {
    await this.client.end()
  }
}

module.exports = DB
