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
const ReservationType = require("./reservation_type");
const GraphQLLong = require("graphql-type-long");

const InvoiceType = new GraphQLObjectType({
  name: "InvoiceType",
  fields: () => ({
    _id: { type: GraphQLID },
    date: { type: GraphQLLong },
    total: { type: GraphQLInt },
    tenant: { type: UserType },
    owner: { type: UserType },
    reservation: { type: ReservationType }
  })
});

module.exports = InvoiceType;
