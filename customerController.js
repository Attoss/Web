'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
host : 'localhost',
port : 3307,
user : 'root',
password : 'root',
database : 'asiakas',

});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
        if ( error ){
          console.log("Virhe"+error);
          res.status(500);
          res.json({"status": "ei toiminut"})

        }
        else
        {
        console.log("Data =" +JSON.stringify(results));
        res.json(results);
        }
    });

    },

    fetchAll: function(req, res){

      console.log("Body =" + JSON.stringify(req.body));
      console.log("Params =" + JSON.stringify(req.query));
      console.log(req.query.nimi);

      res.send("Kutsuttiin fetchAll");
    },

    create: function(req, res){

      console.log("Data =" + JSON.stringify(req.body));
      console.log(req.query.nimi);
      res.send("Kutsuttiin create");
    },

    update: function(req, res){
      
      res.send("ei toimi saatana");
    },

    delete : function (req, res) {
      console.log("Body =" + JSON.stringify(req.body));
      console.log("Params =" + JSON.stringify(req.params));
        res.send("Kutsuttiin delete");
    }
}
