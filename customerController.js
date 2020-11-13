'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
host : 'localhost', // tietokantapalvelimen osoite
port : 3307 , //mysql oletus
user : 'root', //testauskäyttäjänimi
password : 'root', // voi olla joskus tyhjä
database : 'asiakas' // asiakas db
});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
        if ( error ){
          console.log("Virhe haettaessa dataa asiakas taulusta: " + error);
          res.status(500);
          res.json({"status" : "ei toiminut"});
        }
        else
        {
        console.log("Data = " + JSON.stringify(results));
        res.json(results);
        }
    });

    },

    /*fetchAll: function(req, res){
        connection.query('SELECT avain, nimi, osoite, postinro, luontipvm, asty_avain FROM asiakas', function(error, results, fields){
      
        if ( error ){
          console.log("Virhe haettaessa dataa asiakas taulusta: " + error);
          res.status(500);
          res.json({"status" : "ei toiminut"});
        }
        else
        {
        console.log("Data = " + JSON.stringify(results));
        res.json(results);
        }
        //console.log("Body= " +JSON.stringify(req.body));
        //console.log("Params = " + JSON.stringify(req.query));
        //console.log(req.query.nimi);
        //res.send("Kutsuttiin fetchAll");
      });
    },*/

    fetchCustomers: function(req, res){
      console.log(req.query.asty_avain);
      var sql = 'SELECT avain, nimi, osoite, postinro, postitmp, luontipvm, asty_avain FROM asiakas WHERE 1 = 1';
      if(req.query.nimi != null)
      sql = sql + " and nimi like '" + req.query.nimi + "%'";
      if(req.query.osoite != null)
      sql = sql + " and osoite like '" + req.query.osoite + "%'";
      if(req.query.asty_avain != null && req.query.asty_avain != "")
      sql += " and asty_avain like " + req.query.asty_avain;

      connection.query(sql, function(error, results, fields){
      
      if ( error ){
        console.log("Virhe haettaessa dataa asiakas taulusta: " + error);
        res.status(500);
        res.json({"status" : "ei toiminut"});
      }
      else
      {
      console.log("Data = " + JSON.stringify(results));
      res.json(results);
      }

    });
  },

    create: function(req, res){
      
      var sql = "'INSERT INTO asiakas (nimi, osoite, postinro, postitmp, luontipvm, asty_avain) VALUES ("+"'"+req.query.nimi+"','" +req.query.osoite+"','"+req.query.postinro+"','"+req.query.postitmp+"','"+"curdate()"+"','"+req.query.asty_avain+"')";

      connection.query(sql, function(error, results, fields){
      
      if ( error ){
        console.log("Virhe haettaessa dataa asiakas taulusta: " + error);
        res.status(500);
        res.json({"status" : "ei toiminut"});
      }
      else
      {
      console.log("Data = " + JSON.stringify(results));
      res.json(results);
      }

    });
      console.log("Data= " + JSON.stringify(req.body));
      console.log(req.body.nimi);
      res.send("Kutsuttiin create");
    },

    update: function(req, res){

    },

    delete : function (req, res) {    

      var sql = "DELETE FROM asiakas WHERE avain=" + JSON.stringify(req.params.id);
      
      connection.query(sql, function(error, results, fields){
      
        if ( error ){
          console.log("Virhe haettaessa dataa asiakas taulusta: " + error);
          res.status(500);
          res.json({"status" : "ei toiminut"});
        }
        else
        {
        console.log("Data = " + JSON.stringify(results));
        res.json(results);
        }
  
      });
      /*console.log("Body = " + JSON.stringify(req.body));
      console.log("Params= " + JSON.stringify(req.params));
      res.send("Kutsuttiin delete");*/
    }
}
