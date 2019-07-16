const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLD
} = graphql;
const UserType = require("./user_type");
const PropertyType = require("./property_type");
const GraphQLLong = require("graphql-type-long");

const ReservationType = new GraphQLObjectType({
  name: "ReservationType",
  fields: () => ({
    _id: { type: GraphQLID },
    address: { type: GraphQLString }, // keep the address in case the user delete the property
    date: { type: GraphQLLong },
    status: { type: GraphQLString },
    checkin: { type: GraphQLLong }, // timestamp
    checkout: { type: GraphQLLong },
    guests: { type: GraphQLInt },
    pets: { type: GraphQLBoolean },
    total: { type: GraphQLInt },
    owner: { type: UserType }, // owner of the property
    user: { type: UserType }, // the user who wants to make a reservation
    property: { type: PropertyType }
  })
});

module.exports = ReservationType;
