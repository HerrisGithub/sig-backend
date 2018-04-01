// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '139.59.116.46',
      user : 'root',
      password : '',
      database : 'sig'
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      host : '139.59.116.46',
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
  },

  production: {
    client: 'mysql',
    connection: {
      host : '139.59.116.46',
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
