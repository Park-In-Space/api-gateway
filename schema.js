var { buildSchema } = require('graphql');
var reviews = require('./routers/reviewServices');

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

  type Query {
    review(idreview: Int!): Review
  }

  type Mutation {
      createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):Review
      deleteReview(idreview: Int!): Int
      updateReview(idreview: Int!, parking_id: Int, user_id: Int, review_date: String, review_calification: Int,review_comment: String):String
  }

  
`);
 

exports.root = {
  review: reviews.getById,
  createReview: reviews.postReview,
  deleteReview: reviews.deleteReview,
  updateReview: reviews.updateReview
};

//createReview(idreview: Int!, parking_id: Int!, user_id: Int!, review_date: String!, review_calification: Int!,review_comment: String):ReviewInput
  