const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");;

const app = express();
const server = http.Server(app);
const PORT = 3000;

class App {

  constructor(opts) {

    this.connection = require('knex')({
      client: 'mysql',
      connection: {
        host : 'thecrew.cc.mysql',
        user : 'thecrew_cc',
        password : 'HackYourFuture',
        database : 'thecrew_cc'
      }
    });

    const _this = this;

    this.connection.raw('select 1+1 as result').then(function () {
      _this.initialiseTables();
    });


    this.start = this.start.bind(this);

    this.app = express();
    this.s = http.Server(this.app);
  }

  async start() {

    app.use( bodyParser.json() );       // to support JSON-encoded bodies

    app.use(cors({credentials: false, origin: '*'}))

    app.get('/', async (req, res, next) => {
      res.send(200, {message: 'why the fuck...'})
    })

    server.listen(3000, () => {
      console.log(`server up and listening on ${PORT}`)
    })

  }

  async initialiseTables() {

    await this.connection.schema.createTableIfNotExists('creatives', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('firstName');
      table.string('lastName');
      table.string('email');
      table.string('readTerms');
      table.string('location');
      table.timestamps(true, true);
    }).then(function() {
      console.log("created creatives");
    });
    await this.connection.schema.createTableIfNotExists('works', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('type');
      table.string('title');
      table.string('description');
      table.timestamps(true, true);
    }).then(function() {
      console.log("created creatives");
    });
  }
}
module.exports = App;
