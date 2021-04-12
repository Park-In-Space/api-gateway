var { buildSchema } = require('graphql');
const { getParkingById, getParkings } = require('./routers/parkingManagerService');
var reviews = require('./routers/reviewServices');
var parkingManager = require('./routers/parkingManagerService');

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
      opening: String!
      closing: String
  }

  input OpenHoursInput {
      opening: String!
      closing: String
  }

  type Query {
    review(idreview: Int!): Review
    getParkings: [Parking]!
    getParkingById(id: Int!): Parking
  }

  type Mutation {
      createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):Review
      deleteReview(idreview: Int!): Int
      updateReview(idreview: Int!, parking_id: Int, user_id: Int, review_date: String, review_calification: Int,review_comment: String):String
      createNewParking(parking:ParkingInput): Parking
      updateParking(id:Int!,parking:ParkingInput): Int
      deleteParking(id:Int!): Int
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
  getParkingById: parkingManager.getParkingById
};

//createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):ReviewInput
  