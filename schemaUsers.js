var { buildSchema } = require('graphql');
var users = require('./routers/userServices');

exports.schema = buildSchema(`

  type User {
      userId: String!
      name: String!
      email: String!
      age: Int!
      phoneNumber: Int!
  }

  input UserInput {
    userId: String!
    name: String!
    email: String!
    age: Int!
    phoneNumber: Int!
  }

  type Query {
    getAllUsers: [User]!
    userById(userId: String!): User!
  }

  type Mutation {
      postUser(user: UserInput!): User!
      deleteUser(userId: String!): User!
      updateUser(user: UserInput!): User!
      deleteAllUsers: String
  }

  
`);
 

exports.root = {
  userById: users.getById,
  postUser: users.postUser,
  deleteUser: users.deleteUser,
  updateUser: users.updateUser,
  getAllUsers: users.getAllUsers,
  deleteAllUsers: users.deleteAllUsers
};
