// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : '139.59.116.221',
      user : 'root',
      password : 'root',
      database : 'sig'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : '139.59.116.221',
      user : 'root',
      password : 'root',
      database : 'sig'
    },
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
      host : '139.59.116.221',
      user : 'root',
      password : 'root',
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
