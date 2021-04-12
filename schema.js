var { buildSchema } = require('graphql');
var users = require('./routers/authenticationServices');

exports.schema = buildSchema(`

  type User {
    email: String!
    Password: String!
    token: String!
    user_id: String!
      
  }
 
  type signUpOutput {
    InsertedID: String    
  }

  type Query {
    hello: String
  }

  type Mutation {
      signUp(email: String!, password: String!): signUpOutput
      login(email: String!, password: String!): User
  }

  
`);
 

exports.root = {

  signUp: users.signUp,
  login: users.login,

};

