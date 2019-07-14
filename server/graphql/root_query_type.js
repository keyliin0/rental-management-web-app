const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt
} = graphql;
const PropertyType = require("./property_type");
const Property = mongoose.model("properties");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    MyProperties: {
      type: new GraphQLList(PropertyType),
      args: {
        page: { type: GraphQLInt }
      },
      resolve(parentValue, { page }, req) {
        return Property.GetMy(req.user, page);
      }
    }
  })
});

module.exports = RootQuery;
