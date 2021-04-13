var { buildSchema } = require('graphql');
var locations = require('./routers/locationService');

exports.schema = buildSchema(`


  type Location{
    id : Int
    latitude: Float!
    longitude: Float!
  }

  type Query {
    location(id: Int!): Location
  }

  type Mutation {
      createLocation( latitude: Float!,longitude: Float!): Location
      deleteLocation( id: Int!): Int
      updateLocation( id: Int! ,latitude: Float!,longitude: Float!): Location
  }

  
`);
 

exports.root = {
  location: locations.getById,
  createLocation: locations.postLocation,
  deleteLocation: locations.deleteLocation,
  updateLocation: locations.updateLocation
};

//createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):ReviewInput
  