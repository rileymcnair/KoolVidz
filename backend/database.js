const { Client } = require('pg')
const pgtools = require('pgtools')

const DATABASE_USER = 'postgres'
const DATABASE_HOST = 'localhost'
const DATABASE_NAME = 'koolvidz'
const DATABASE_PORT = 5432
const CONFIG = {
  user: DATABASE_USER,
  password: '', // Do not commit!
  port: DATABASE_PORT,
  host: DATABASE_HOST 
}

class DB {
  async create () {
    // Drop database if exists
    try {
      const drop_res = await pgtools.dropdb(CONFIG, DATABASE_NAME)
      console.log(drop_res)
    } catch (error) {
      // Do nothing if drop fails
    }

    try {
      const create_res = await pgtools.createdb(CONFIG, DATABASE_NAME)
      console.log(create_res)

      await this.connect()
      const table_creation_queries = [
        'create table videos (id serial not null primary key, title text not null, description text not null, views bigint not null)',
        'create table ratings (id serial not null primary key, video_id int not null references videos(id), is_like boolean not null, ip_address text not null)',
        'create table comments (id serial not null primary key, video_id int not null references videos(id), content text not null)'
      ]

      for (const query of table_creation_queries) {
        const res = await this.client.query(query)
        console.log(res)
      }

      await this.close()
    } catch (error) {
      console.log(error)
    }
  }

  async connect () {
    this.client = new Client({
      ...CONFIG,
      database: DATABASE_NAME,
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
