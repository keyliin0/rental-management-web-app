const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} = graphql;
const PropertyType = require("./types/property_type");
const ReservationType = require("./types/reservation_type");
const Property = mongoose.model("properties");
const Reservation = mongoose.model("reservations");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    Property: {
      type: PropertyType,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(parentValue, { id }) {
        const property = await Property.findById(id).populate(
          "owner",
          "firstname lastname imgURL"
        );
        return property;
      }
    },
    Properties: {
      type: new GraphQLList(PropertyType),
      args: {
        page: { type: GraphQLInt },
        city: { type: GraphQLString },
        lng: { type: GraphQLFloat },
        lat: { type: GraphQLFloat }
      },
      resolve(parentValue, { page, city, lng, lat }) {
        if (lng && lat) return Property.GetNearby(lng, lat);
        else if (city) return Property.GetByCity(page, city);
        else return Property.Get(page);
      }
    },
    MyProperties: {
      type: new GraphQLList(PropertyType),
      args: {
        page: { type: GraphQLInt }
      },
      resolve(parentValue, { page }, req) {
        return Property.GetMy(req.user, page);
      }
    },
    Reservations: {
      type: new GraphQLList(ReservationType),

      resolve(parentValue, args, req) {
        return Reservation.Get(req.user);
      }
    }
  })
});

module.exports = RootQuery;
