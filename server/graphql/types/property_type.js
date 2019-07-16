const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} = graphql;
const UserType = require("./user_type");

const PropertyType = new GraphQLObjectType({
  name: "PropertyType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    guests: { type: GraphQLInt },
    bathrooms: { type: GraphQLInt },
    bedrooms: { type: GraphQLInt },
    beds: { type: GraphQLInt },
    size: { type: GraphQLInt },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    location: {
      type: new GraphQLObjectType({
        name: "LocationType",
        fields: () => ({
          type: { type: GraphQLString },
          coordinates: { type: new GraphQLList(GraphQLFloat) }
        })
      })
    },
    price: { type: GraphQLInt }, // this is the price per night
    availability: {
      type: new GraphQLObjectType({
        name: "availabilityType",
        fields: () => ({
          minimum_stay: { type: GraphQLInt },
          maximum_stay: { type: GraphQLInt }
        })
      })
    },
    images: { type: new GraphQLList(GraphQLString) },
    thumbnail: { type: GraphQLString },
    owner: { type: UserType },
    rating: {
      type: new GraphQLObjectType({
        name: "RatingType",
        fields: () => ({
          sum: { type: GraphQLInt }, // sum of ratings
          count: { type: GraphQLInt } // number of raters
        })
      })
    },
    reserved: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "CordsType",
          fields: () => ({
            start: { type: GraphQLInt }, // timestamp
            end: { type: GraphQLInt } // timestamp
          })
        })
      )
    }
  })
});

module.exports = PropertyType;
