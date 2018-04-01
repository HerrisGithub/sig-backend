
exports.up = function(knex, Promise) {
    return knex.schema.createTable('places', table=>{
        table.increments('id');
		table.string('formatted_address');
		table.string('name');
        table.string('location');
        table.string('types');
        table.string('updateBy').references('users.username')
        
		table.timestamp('created_at').defaultTo(knex.fn.now(	));
		table.timestamp('updated_at').defaultTo(knex.fn.now());
   })
  	.then(function(){
  		console.log('Table Places Berhasil ditambahkan!');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTable('places', table=>{
    })
    .then(function (){
        console.log('Table Places Berhasil dihapus!');
    });
};
