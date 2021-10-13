require('dotenv').config();
const express = require('express');
var Airtable = require('airtable');

console.log(process.env)
var airtableKey = process.env.REACT_APP_AIRTABLE_KEY
var base = new Airtable({apiKey: airtableKey}).base('appLgqt3Za2Pz2LD8');
//move to process env 

const app = express();
const port = 5000;

app.get('/hello-world', (req, res) => {
  res.send({ welcome_message: "Let's work on the project" });
});

//app,get for the main page that gets the airtable data 
//filter here or via airtable api (need to research)

//to do : connect to casa and api authentication, process.env for api keys, 
//basic figma designs 


app.get('/rental-data', (req, res) => {

  availableCasas = []

    base('Casas').select({
      //Selecting only casas in the 'ready' view 
        view: "Ready view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        // Need to make sure that the records are all consolidated before sending 

        records.forEach(function(record) {
            availableCasas.push(record.fields)
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { 
          console.error(err);
          res.send(err); 
          return
        }
        else{
          res.send(availableCasas)
        }
      }
      
      );
})

app.listen(port, () => console.log(`Listening on port ${port}`));
