// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'sig'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
