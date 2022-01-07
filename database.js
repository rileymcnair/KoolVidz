const { Client } = require('pg')
const pgtools = require('pgtools')
require("dotenv").config();
require("dotenv")

const DB_USER = "postgres"
const DB_HOST = "localhost"
const DB_NAME = "koolvidz"
const DB_PORT = 5432
const DB_PASSWORD = "SwitchCS21"

const CONFIG = {
  user: DB_USER,
  password: DB_PASSWORD, 
  port: DB_PORT,
  host: DB_HOST 
}



const devConfig = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const proConfig = process.env.DATABASE_URL; //heroku addons


class DB {
  async create () {
    console.log('creating DB')
    // Drop database if exists
    try {
      const drop_res = await pgtools.dropdb(CONFIG, DB_NAME)
      console.log(drop_res)
    } catch (error) {
      // Do nothing if drop fails
    }

    const create_res = await pgtools.createdb(CONFIG, DB_NAME)
    console.log(create_res)

    await this.connect()
    const table_creation_queries = [
      'create table videos (id serial not null primary key, title text not null, description text not null, views bigint not null default 0, filename text not null)',
      'create table ratings (id serial not null primary key, video_id int not null references videos(id), is_like boolean not null, ip_address text not null)',
      'create table comments (id serial not null primary key, video_id int not null references videos(id), content text not null)'
    ]

    for (const query of table_creation_queries) {
      const res = await this.client.query(query)
      console.log(res)
    }

    await this.close()
  }

  async connect () {
    // this.client = new Client({
    //   ...CONFIG,
    //   database: DATABASE_NAME,
    // })
    if (process.env.NODE_ENV === "production") {
      this.client = new Client({
        connectionString: proConfig,
        ssl: {
          rejectUnauthorized: false,
        }
      })
    } 
    else { /* development environment */
      this.client = new Client({
        connectionString: devConfig,
      })
    }

    await this.client.connect()
  }

  async query (text, values) {
    this.connect()

    const result = await this.query_no_connect(text, values)

    this.close()

    return result
  }

  async query_no_connect (text, values) {
    let result = null
    try {
      result = await this.client.query(text, values)
    } catch (err) {
      console.log(err.stack)
    }

    return result
  }

  async close () {
    await this.client.end()
  }
}

module.exports = DB
