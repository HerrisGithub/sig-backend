const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const _ = require('underscore')
const key = 'AIzaSyATGbyfcvW-uanT-Imwayj8KjDg_iHJgIs'
const googleMapsClient = require('@google/maps').createClient({
  key: key
})
const Axios = require('axios')
const cors = require('cors')
const pg = require('pg')
const bodyParser = require('body-parser')
app.use(cors())

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '139.59.116.221',
    user : 'root',
    password : 'root',
    database : 'sig'
  }
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app
  .use(express.static(path.join(__dirname, 'public')))
  .get('/',function(req,res){
    res.send(process)
  })
  .get('/places/:query/:key', (req, res) => {
      Axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+req.params.query+'&key='+req.params.key)
      .then(function(data){
        data = JSON.parse(JSON.stringify(data.data))
        res.send(data)
    })
  })
  .get('/places/type',(req,res)=>{
      res.send([
        'kantor polisi',
        'kantor lurah',
        'kantor pajak',
        'kantor kecamatan',
        'kantor gubernur',
        'kantor walikota',
        'bank indonesia',
        'pelayanan',
        'kementrian',
        'perizinan',
        'kartu tanda penduduk',
        'kantor imigrasi',
        'kantor peyanan administratif'        
      ])
  })
  .get('/local/places/:types',(req,res)=>{
      knex('places').select('*').where({types:req.params.types})
      .then(function(data){
        data = JSON.parse(JSON.stringify(data))
        res.send(data)
      })
      .catch(function(err){
        console.log(err);
        res.statusMessage = "error";
        res.status(409).end()
      })
  })
  .post('/local/places/users',(req,res)=>{
    knex('places').select('*').where({updateBy:req.body.username})
    .then(function(data){
      data = JSON.parse(JSON.stringify(data))
      res.send(data)
    })
    .catch(function(err){
      console.log(err);
      res.statusMessage = "error";
      res.status(409).end()
    })
  })
  .get('/db', function (request, response) {
      //   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      //     client.query('SELECT * FROM test', function(err, result) {
      //       done();
      //       if (err)
      //       { console.error(err); response.send("Error " + err); }
      //       else
      //       { 
      //         response.send({results: result.rows})
      //       }
              
      //     });
      // });
      knex('test').select('*').then(function(data){
        console.log(data)
      })
  })
  .post('/users',function(req,res){
    console.log('masuk')
    knex('users')
    .select('*').where({email:req.body.email}).then(function(data){
      data = JSON.parse(JSON.stringify(data))
      res.send(data)
    }).catch(function(err){
      console.log(err);
      res.statusMessage = "error";
      res.status(409).end()
    })
  })
  .post('/register',function(req,res){
    knex.transaction(function(trx) {
      return knex('users')
       .transacting(trx)
       .insert({
         'username':req.body.username,
         'email':req.body.email,
         'fullname':req.body.fullname,
         'password':req.body.password
       })
       .then(trx.commit)
       .catch(trx.rollback);
    }).then(function(){
       res.send(200);
    }).catch(function(err){
       console.log(err);
       res.statusMessage = "username atau email sudah ada";
       res.status(409).end()
    })
  })
  .post('/login',function(req,res){
    knex('users').count().where({email:req.body.email,password:req.body.password})
    .then(function(data){
        data = JSON.parse(JSON.stringify(data))
        if(data[0].count>0){
          res.send(200)
        }else{
          res.send(409)
        }
    })
  })
  .post('/places',function(req,res){
    knex.transaction(function(trx) {
      return knex('places')
       .transacting(trx)
       .insert({
         'formatted_address':req.body.formatted_address,
         'name':req.body.name,
         'location':req.body.location,
         'types':req.body.types,
         'updateBy':req.body.updateBy
       })
       .then(trx.commit)
       .catch(trx.rollback);
    }).then(function(){
       res.send(200);
    }).catch(function(err){
       console.log(err);
       res.statusMessage = "error";
       res.status(409).end()
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
