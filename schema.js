var { buildSchema } = require('graphql');
var { buildSchema } = require('graphql');
var parkinglots = require('./routers/plu-parkinglotsService');
var parkinglotsusers = require('./routers/plu-parkinglotuserService');
var locations = require('./routers/locationService');

exports.schema = buildSchema(`
  type Location{
    id : Int
    latitude: Float!
    longitude: Float!
  }

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
    location(id: Int!): Location
    getAllParkinglot:[Parkinglots]
    getByIdParkinglot(id:Int!):Parkinglots
    getAllParkinglotuser:[Parkinglotuser]
    getByIdParkinglotuser(id:Int!):Parkinglotuser
  }
  type Mutation {
      createLocation( latitude: Float!,longitude: Float!): Location
      deleteLocation( id: Int!): Int
      updateLocation( id: Int! ,latitude: Float!,longitude: Float!): Location
      postParkinglot(Parkinglot:ParkinglotsInput!): Parkinglots
      updateParkinglot(id:Int!, Parkinglot:ParkinglotsInput!): Parkinglots
      deleteParkinglot(id:Int!): Int
      postParkinglotuser(parkinglotuser:ParkinglotuserInput!): Parkinglotuser
      updateParkinglotuser(id:Int!, parkinglotuser:ParkinglotuserInput!): Parkinglotuser
      deleteParkinglotuser(id:Int!): Int
  }
  
`);
 

exports.root = {

  location: locations.getById,
  createLocation: locations.postLocation,
  deleteLocation: locations.deleteLocation,
  updateLocation: locations.updateLocation,

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

//createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):ReviewInput
  