'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost', // tietokantapalvelimen osoite
  port : 3306, // jos oletusportti ei toimi
  user : 'root', // kehitysatarkoituksessa voidaan käyttää root-käyttäjää. Tuotannossa ei saa käyttää root-käyttäjää
  password : 'rootti', // voi olla tyhjäkin, käyttäkää sitä mikä teillä on
  database : 'asiakas' // tai asiakas_woj
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = 
{

    fetchTypesRevised : function()
    {
        return new Promise((resolve, reject) => {
          
          connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
            if ( error ){
              console.log("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
              reject("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
            }
            else
            {
              console.log("Data (rev) = " + JSON.stringify(results));
              resolve(results);
            }    
        })
      })
    
  },

  fetchCustomersRevised: function() {
    return new Promise((resolve, reject) => {

      connection.query('SELECT Avain, Nimi, Osoite, Postinro, Postitmp, Asty_avain FROM asiakas', function(error, results, fields){
        if ( error ){
          console.log("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
          reject("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
        }
        else
        {
          console.log("Data (rev) = " + JSON.stringify(results));
          resolve(results);
        }    
    })
  })
}
}
