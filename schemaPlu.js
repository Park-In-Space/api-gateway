var { buildSchema } = require('graphql');
var parkinglots = require('./routers/plu-parkinglotsService');
var parkinglotsusers = require('./routers/plu-parkinglotuserService');

exports.schema = buildSchema(`

  type Parkinglotuser {
    id: Int!
    username: String
    email: String
    name: String
    phone: String
  }
 
  input ParkinglotuserInput {
    username: String
    email: String
    name: String
    phone: String 
  }

  type Parkinglots {
    id: Int!
    parkinglotuser: Parkinglotuser
    parkingid: Int!
  }
 
  input ParkinglotsInput {
    parkinglotuser: ParkinglotuserInput 
    parkingid: Int!
  }

  type Query {
    
    getAllParkinglot:[Parkinglots]
    getByIdParkinglot(id:Int!):Parkinglots
    getAllParkinglotuser:[Parkinglotuser]
    getByIdParkinglotuser(id:Int!):Parkinglotuser

  }

  type Mutation {
      postParkinglot(Parkinglot:ParkinglotsInput!): Parkinglots
      updateParkinglot(id:Int!, Parkinglot:ParkinglotsInput!): Parkinglots
      deleteParkinglot(id:Int!): Int
      postParkinglotuser(parkinglotuser:ParkinglotuserInput!): Parkinglotuser
      updateParkinglotuser(id:Int!, parkinglotuser:ParkinglotuserInput!): Parkinglotuser
      deleteParkinglotuser(id:Int!): Int
  }

  
`);
 

exports.root = {
  getAllParkinglot: parkinglots.getAllParkinglot,
  getByIdParkinglot: parkinglots.getByIdParkinglot,
  postParkinglot: parkinglots.postParkinglot,
  deleteParkinglot: parkinglots.deleteParkinglot,
  updateParkinglot: parkinglots.updateParkinglot,
  
  getAllParkinglotuser: parkinglotsusers.getAllParkinglotuser,
  getByIdParkinglotuser: parkinglotsusers.getByIdParkinglotuser,
  postParkinglotuser: parkinglotsusers.postParkinglotuser,
  deleteParkinglotuser: parkinglotsusers.deleteParkinglotuser,
  updateParkinglotuser: parkinglotsusers.updateParkinglotuser,

};
