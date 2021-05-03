var { buildSchema } = require('graphql');
const { getParkingById, getParkings } = require('./services/parkingManagerService');
var reviews = require('./services/reviewServices');
var parkingManager = require('./services/parkingManagerService');
var recommendationManager = require('./services/recommendationService')
var locations = require('./services/locationService');
var usersAuth = require('./services/authenticationServices');
var users = require('./services/userServices');
var parkinglots = require('./services/plu-parkinglotsService');
var parkinglotsusers = require('./services/plu-parkinglotuserService');

exports.schema = buildSchema(`

  type Location{
    id : Int
    latitude: Float!
    longitude: Float!
  }

  type SimpleLocation{
    latitude: Float!
    longitude: Float!
  }


  type User_auth {
    email: String!
    Password: String!
    token: String!
    user_id: String!
  }
  type signUpOutput {
    InsertedID: String    
  }
  type User_authWA {
    id: String!
    email: String!
    owner: Boolean!
  }

  type Review {
    idreview: Int!
    parking_id: Int!
    user_id: Int!
    review_date: String!
    review_calification: Int!
    review_comment: String    
  }
  input ReviewInput {
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
      image: String
      idLocation: Int
      address: String
  }
  input ParkingInput {
      id: ID
      name: String!
      pricePerMinute: Int!
      totalSpaces: Int!
      usedSpaces: Int!
      openHours: [OpenHoursInput]!
      image: String
      idLocation: Int
      address: String
  }
  type OpenHours {
      opening: String
      closing: String
  }
  input OpenHoursInput {
      opening: String
      closing: String
  }
  type ParkingLoc {
    id: ID!
    name: String!
    pricePerMinute: Int!
    totalSpaces: Int!
    usedSpaces: Int!
    openHours: [OpenHours]!
    image: String
    latitude: Float!
    longitude: Float!
    address: String
  }
  input ParkingInputLoc {
    id: ID
    idplu: Int!
    name: String!
    pricePerMinute: Int!
    totalSpaces: Int!
    usedSpaces: Int!
    openHours: [OpenHoursInput]!
    image: String
    latitude: Float!
    longitude: Float!
    address: String
  }
  type ParkingWLocation {
    id: ID!
    name: String!
    address: String
    location: SimpleLocation
  }
  type ParkingWLocationAll {
    id: ID!
    name: String!
    pricePerMinute: Int!
    totalSpaces: Int!
    usedSpaces: Int!
    openHours: [OpenHours]!
    image: String
    address: String
    location: SimpleLocation
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
  type UserClienAuth {
    
    name: String!
    email: String!
    password: String!
    age: Int!
    phoneNumber: Int!
  }
  input UserClienAuthInput {
    
    name: String!
    email: String!
    password: String!
    age: Int!
    phoneNumber: Int!
  }


  type Parkinglotuser {
    id: Int!
    userId: String
    username: String
    email: String
    name: String
    phone: String
  }
  input ParkinglotuserInput {
    id: Int
    userId: String
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
  type ParkinglotuserAuth {
    id: Int
    userId: String
    username: String
    email: String
    password: String!
    name: String
    phone: String
  }
  input ParkinglotuserAuthInput {
    id: Int
    userId: String
    username: String
    email: String
    password: String!
    name: String
    phone: String
  }



  type Query {
    loc_location(id: Int!): Location

    rev_review(idreview: Int!): Review
    rev_getReviews: [Review]!

    par_getParkings: [Parking]!
    par_getParkingById(id: Int!): Parking
    par_getParkingsLocation: [ParkingWLocation]!
    par_getParkingByIdLoc(id: Int!): ParkingWLocationAll
    par_getParkingByIdPluLoc(id: Int!):[ParkingWLocation]!

    rec_getUser(id:Int!): User_recommendation
    rec_getUsers: [User_recommendation]!
    rec_getParkinglot(id:Int!): Parkinglot_recommendation
    rec_getParkinglots: [Parkinglot_recommendation]!
    rec_getNearParkinglot(id:Int!): NearParkinglot_recommendation
    rec_getNearParkinglots: [NearParkinglot_recommendation]!

    clu_getAllUsers: [User]!
    clu_userById(userId: String!): User!

    plu_getAllParkinglot:[Parkinglots]
    plu_getByIdParkinglot(id:Int!):Parkinglots
    plu_getAllParkinglotuser:[Parkinglotuser]
    plu_getByIdParkinglotuser(id:Int!):Parkinglotuser
  }

  type Mutation {

    loc_createLocation( latitude: Float!,longitude: Float!): Location
    loc_deleteLocation( id: Int!): Int
    loc_updateLocation( id: Int! ,latitude: Float!,longitude: Float!): Location

    ath_signUp(email: String!, password: String!, ): signUpOutput
    ath_login(email: String!, password: String!): User_auth
    ath_loginWA(email: String!, password: String!): User_authWA

    rev_createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):Review
    rev_deleteReview(idreview: Int!): Int
    rev_updateReview(idreview: Int!, parking_id: Int, user_id: Int, review_date: String, review_calification: Int,review_comment: String):String
      
    par_createNewParking(parking:ParkingInput!): Parking
    par_updateParking(id:Int!,parking:ParkingInput!): Parking
    par_deleteParking(id:Int!): Int
    par_createNewParkingLoc(parking:ParkingInputLoc!): Parking

      
    rec_saveUser(id: ID, location: String!, destination: String!, rangeOfSearch: Int!): User_recommendation
    rec_updateUser(oldid: Int!,id: ID, location: String!, destination: String!, rangeOfSearch: Int!): User_recommendation
    rec_deleteUser(id: Int!): Int
    rec_saveParkinglot(id: ID, rating: Int!,location: String!, pricePerMinute: Int!,timeOpen: String!,timeClose: String!): Parkinglot_recommendation
    rec_updateParkinglot(oldid: Int!,id: ID, rating: Int!,location: String!, pricePerMinute: Int!,timeOpen: String!,timeClose: String!): Parkinglot_recommendation
    rec_deleteParkinglot(id: Int!): Int
    rec_saveNearParkinglot(id: ID, recommended: Boolean!,distance_to_destination: Int!,user: Int!,parking_lot: Int!): NearParkinglot_recommendation
    rec_updateNearParkinglot(oldid: Int!,id: ID, recommended: Boolean!,distance_to_destination: Int!,user: Int!,parking_lot: Int!): NearParkinglot_recommendation
    rec_deleteNearParkinglot(id: Int!): Int

    clu_postUser(user: UserClienAuthInput!): User!
    clu_deleteUser(userId: String!): User!
    clu_updateUser(user: UserInput!): User!
    clu_deleteAllUsers: String

    plu_postParkinglot(Parkinglot:ParkinglotsInput!): Parkinglots
    plu_updateParkinglot(id:Int!, Parkinglot:ParkinglotsInput!): Parkinglots
    plu_deleteParkinglot(id:Int!): Int
    plu_postParkinglotuser(parkinglotuser:ParkinglotuserAuthInput!): Parkinglotuser
    plu_updateParkinglotuser(id:Int!, parkinglotuser:ParkinglotuserInput!): Parkinglotuser
    plu_deleteParkinglotuser(id:Int!): Int

  }

  
`);


exports.root = {

  //locations
  loc_location: locations.getById,
  loc_createLocation: locations.postLocation,
  loc_deleteLocation: locations.deleteLocation,
  loc_updateLocation: locations.updateLocation,

  //Authentication Service
  ath_signUp: usersAuth.signUp,
  ath_login: usersAuth.login,
  ath_loginWA: usersAuth.loginWA,

  //reviews
  rev_review: reviews.getById,
  rev_getReviews: reviews.getAll,
  rev_createReview: reviews.postReview,
  rev_deleteReview: reviews.deleteReview,
  rev_updateReview: reviews.updateReview,
  // Parking Manager
  par_getParkings: parkingManager.getParkings,
  par_createNewParking: parkingManager.createNewParking,
  par_updateParking: parkingManager.updateParking,
  par_deleteParking: parkingManager.deleteParking,
  par_getParkingById: parkingManager.getParkingById,
  par_createNewParkingLoc: parkingManager.createNewParkingLoc,
  par_getParkingsLocation: parkingManager.getParkingsLocation,
  par_getParkingByIdLoc: parkingManager.getParkingByIdLoc,
  par_getParkingByIdPluLoc: parkingManager.getParkingByIdPluLoc, 
  //Recommendation Manager:Users
  rec_saveUser: recommendationManager.saveUser,
  rec_getUser: recommendationManager.getUser,
  rec_getUsers: recommendationManager.getUsers,
  rec_updateUser: recommendationManager.updateUser,
  rec_deleteUser: recommendationManager.deleteUser,
  //Recommendation Manager: Parking lots
  rec_saveParkinglot: recommendationManager.saveParkinglot,
  rec_getParkinglot: recommendationManager.getParkinglot,
  rec_getParkinglots: recommendationManager.getParkinglots,
  rec_updateParkinglot: recommendationManager.updateParkinglot,
  rec_deleteParkinglot: recommendationManager.deleteParkinglot,
  //Recommendation Manager: Near Parking lots
  rec_saveNearParkinglot: recommendationManager.saveNearParkinglot,
  rec_getNearParkinglot: recommendationManager.getNearParkinglot,
  rec_getNearParkinglots: recommendationManager.getNearParkinglots,
  rec_updateNearParkinglot: recommendationManager.updateNearParkinglot,
  rec_deleteNearParkinglot: recommendationManager.deleteNearParkinglot,

  //Client user manager
  clu_userById: users.getById,
  clu_postUser: users.postUser,
  clu_deleteUser: users.deleteUser,
  clu_updateUser: users.updateUser,
  clu_getAllUsers: users.getAllUsers,
  clu_deleteAllUsers: users.deleteAllUsers,

  //Parking lot user manager
  plu_getAllParkinglot: parkinglots.getAllParkinglot,
  plu_getByIdParkinglot: parkinglots.getByIdParkinglot,
  plu_postParkinglot: parkinglots.postParkinglot,
  plu_deleteParkinglot: parkinglots.deleteParkinglot,
  plu_updateParkinglot: parkinglots.updateParkinglot,
  plu_getAllParkinglotuser: parkinglotsusers.getAllParkinglotuser,
  plu_getByIdParkinglotuser: parkinglotsusers.getByIdParkinglotuser,
  plu_postParkinglotuser: parkinglotsusers.postParkinglotuser,
  plu_deleteParkinglotuser: parkinglotsusers.deleteParkinglotuser,
  plu_updateParkinglotuser: parkinglotsusers.updateParkinglotuser,

};

