require('dotenv').config();
const express = require('express');
var Airtable = require('airtable');
var bodyParser = require('body-parser')

//separate env file for protecting api keys 
var airtableKey = process.env.REACT_APP_AIRTABLE_KEY
var base = new Airtable({apiKey: airtableKey}).base('appLgqt3Za2Pz2LD8');
//move to process env 

const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID_TEST
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN_TEST
const client = require('twilio')(accountSid, authToken)

const app = express();
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/hello-world', (req, res) => {
  res.send({ welcome_message: "Let's work on the project" });
});


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

app.post('/application', (req, res) => {

  data = req.body
  base('Lads').create([
    {
      "fields": {
        "Name": `${data.name}`,
        "Status": "Applied",
        "Casa ID": `${data.uuid}`
      }
    },
  ], function(err, records) {
    if (err) {
      console.error(err);
      res.sendStatus(500)
      res.send(err); 
      return;
    }
    else{
      sendTextMessage()
      res.sendStatus(200)
      res.send("")
    }
  });  


  //what if we await createairtable row for a return of success, 
  //then if success, we send a text & res.sendStatus(200)
}, 
)


// const createAirTableRow = (data) => {
//   base('Leads').create([
//     {
//       "fields": {
//         "Name": `${data.name}`,
//         "Status": "Applied",
//         "Casa ID": `${data.uuid}`
//       }
//     },
//   ], function(err, records) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     else{
//       sendTextMessage()
//       console.log(records)
//       return records 
//     }
//   });  
// }



const sendTextMessage = () => {
  client.messages.create({
    body: "Someone applied (from NodeJS)!", 
    messagingServiceSid: 'MG6c5fb7771050fea74987d3808fba5893',
    to: '+17148868307',
  }, function(err) {
    if (err) {
      console.log(err); 
      return; 
    }
  })
}


app.listen(port, () => console.log(`Listening on port ${port}`));
