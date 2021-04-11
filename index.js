var express = require('express');
var app = express();
var router = require('./routers/router')
var bodyParser = require('body-parser');
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const gql = require('graphql-tag')
const { buildASTSchema } = require('graphql')


app.use(cors())

const schema = buildASTSchema(gql`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => 'Hello, world'
}

app.use('/graphql', graphqlHTTP({ schema, rootValue }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

app.use(router)

const port = process.env.PORT || 3030
app.listen(port)
console.log(`Running a GraphQL API server at localhost:${port}/graphql`)
