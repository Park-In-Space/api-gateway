var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const cors = require( 'cors' )
var soap = require('soap');
var fs = require('fs');
const http  = require('http');
const { resolve } = require('path');
const url = `http://10.88.6.112:3000/locations`
const axios = require('axios')

async function getLocation(args) {
  var result = []
  let res = await axios.get(`${url}/${args.message}.json`);
  let data = res.data
  let response = "latitude: "+ data.latitude +" longitude: "+ data.longitude 
  result.push(response);
  return {
      result: result
  }
}

// the service
var serviceObject = {

  LocationService: {
      LocationServiceSoapp_soaport: {
          Location: getLocation
      }
  }
};

var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app_soap
var app_soap = express();

// root handler
app_soap.get('/', function (req, res) {
res.send('Node Soap!');
})

// Launch the server and listen
var port = 8000;
app_soap.listen(port, function () {
console.log('Listening on port ' + port);
var wsdl_path = "/wsdl";
soap.listen(app_soap, wsdl_path, serviceObject, xml);
console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");

});
 
var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema.schema,
  rootValue: schema.root,
  graphiql: true,
}));


app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');