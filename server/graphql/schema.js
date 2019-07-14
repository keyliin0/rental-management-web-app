const graphql = require("graphql");
const { GraphQLSchema } = graphql;

require("../models/Users");
require("../models/Properties");
require("../models/Reservations");
require("../models/Invoices");

const RootQueryType = require("./root_query_type");
//const mutations = require("./mutations");

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: null
});
