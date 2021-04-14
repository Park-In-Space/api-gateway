var { buildSchema } = require('graphql');
const { getParkingById, getParkings } = require('./routers/parkingManagerService');
var reviews = require('./routers/reviewServices');
var parkingManager = require('./routers/parkingManagerService');
var recommendationManager = require('./routers/recommendationService')

exports.schema = buildSchema(`

  type Review {
    idreview: Int!
    parking_id: Int!
    user_id: Int!
    review_date: String!
    review_calification: Int!
    review_comment: String    
  }
 
  input ReviewInput {
    idreview: Int
    parking_id: Int
    user_id: Int
    review_date: String
    review_calification: Int
    review_comment: String    
  }

  type Parking {
      id: ID!
      name: String!
      pricePerMinute: Int!
      totalSpaces: Int!
      usedSpaces: Int!
      openHours: [OpenHours]!
  }

  input ParkingInput {
      id: ID
      name: String!
      pricePerMinute: Int!
      totalSpaces: Int!
      usedSpaces: Int!
      openHours: [OpenHoursInput]!
  }

  type OpenHours {
      opening: String
      closing: String
  }

  input OpenHoursInput {
      opening: String
      closing: String
  }

  type User_recommendation {
      id: ID
      location: String!
      destination: String!
      rangeOfSearch: Int
  }

  input User_recommendationInput {
      id: ID
      location: String!
      destination: String!
      rangeOfSearch: Int!
  }

  type Parkinglot_recommendation {
      id: ID
      rating: Int!
      location: String!
      pricePerMinute: Int!
      timeOpen: String!
      timeClose: String!
  }
  type NearParkinglot_recommendation {
      id: ID
      recommended: Boolean!
      distance_to_destination: Int!
      user: Int!
      parking_lot: Int!
  }

  type Query {
    review(idreview: Int!): Review
    getParkings: [Parking]!
    getParkingById(id: Int!): Parking
    getUser(id:Int!): User_recommendation
    getUsers: [User_recommendation]!
    getParkinglot(id:Int!): Parkinglot_recommendation
    getParkinglots: [Parkinglot_recommendation]!
    getNearParkinglot(id:Int!): NearParkinglot_recommendation
    getNearParkinglots: [NearParkinglot_recommendation]!
  }

  type Mutation {
      createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):Review
      deleteReview(idreview: Int!): Int
      updateReview(idreview: Int!, parking_id: Int, user_id: Int, review_date: String, review_calification: Int,review_comment: String):String
      createNewParking(parking:ParkingInput!): Parking
      updateParking(id:Int!,parking:ParkingInput!): Int
      deleteParking(id:Int!): Int
      saveUser(id: ID, location: String!, destination: String!, rangeOfSearch: Int!): User_recommendation
      updateUser(oldid: Int!,id: ID, location: String!, destination: String!, rangeOfSearch: Int!): User_recommendation
      deleteUser(id: Int!): Int
      saveParkinglot(id: ID, rating: Int!,location: String!, pricePerMinute: Int!,timeOpen: String!,timeClose: String!): Parkinglot_recommendation
      updateParkinglot(oldid: Int!,id: ID, rating: Int!,location: String!, pricePerMinute: Int!,timeOpen: String!,timeClose: String!): Parkinglot_recommendation
      deleteParkinglot(id: Int!): Int
      saveNearParkinglot(id: ID, recommended: Boolean!,distance_to_destination: Int!,user: Int!,parking_lot: Int!): NearParkinglot_recommendation
      updateNearParkinglot(oldid: Int!,id: ID, recommended: Boolean!,distance_to_destination: Int!,user: Int!,parking_lot: Int!): NearParkinglot_recommendation
      deleteNearParkinglot(id: Int!): Int
  }

  
`);
 

exports.root = {
  review: reviews.getById,
  createReview: reviews.postReview,
  deleteReview: reviews.deleteReview,
  updateReview: reviews.updateReview,
  // Parking Manager
  getParkings: parkingManager.getParkings,
  createNewParking: parkingManager.createNewParking,
  updateParking: parkingManager.updateParking,
  deleteParking: parkingManager.deleteParking,
  getParkingById: parkingManager.getParkingById,
  //Recommendation Manager:Users
  saveUser: recommendationManager.saveUser,
  getUser: recommendationManager.getUser,
  getUsers: recommendationManager.getUsers,
  updateUser: recommendationManager.updateUser,
  deleteUser: recommendationManager.deleteUser,
  //Recommendation Manager: Parking lots
  saveParkinglot: recommendationManager.saveParkinglot,
  getParkinglot: recommendationManager.getParkinglot,
  getParkinglots: recommendationManager.getParkinglots,
  updateParkinglot: recommendationManager.updateParkinglot,
  deleteParkinglot: recommendationManager.deleteParkinglot,
  //Recommendation Manager: Near Parking lots
  saveNearParkinglot: recommendationManager.saveNearParkinglot,
  getNearParkinglot: recommendationManager.getNearParkinglot,
  getNearParkinglots: recommendationManager.getNearParkinglots,
  updateNearParkinglot: recommendationManager.updateNearParkinglot,
  deleteNearParkinglot: recommendationManager.deleteNearParkinglot,
  
};

//createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):ReviewInput
  