const mongoose = require("mongoose");
const PropertyType = require("./types/property_type");
const ReservationType = require("./types/reservation_type");
const Property = mongoose.model("properties");
const Reservation = mongoose.model("reservations");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = graphql;
const { GraphQLUpload } = require("graphql-upload");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateProperty: {
      type: PropertyType,
      args: {
        images: {
          type: GraphQLList(GraphQLUpload)
        },
        name: {
          type: GraphQLString
        },
        type: {
          type: GraphQLString
        },
        guests: {
          type: GraphQLInt
        },
        bathrooms: {
          type: GraphQLInt
        },
        bedrooms: {
          type: GraphQLInt
        },
        beds: {
          type: GraphQLInt
        },
        size: {
          type: GraphQLInt
        },
        description: {
          type: GraphQLString
        },
        address: {
          type: GraphQLString
        },
        city: {
          type: GraphQLString
        },
        price: {
          type: GraphQLInt
        },
        minimum_stay: {
          type: GraphQLInt
        },
        maximum_stay: {
          type: GraphQLInt
        }
      },
      async resolve(
        parentValue,
        {
          images,
          name,
          type,
          guests,
          bathrooms,
          bedrooms,
          beds,
          size,
          description,
          address,
          city,
          price,
          minimum_stay,
          maximum_stay
        },
        req
      ) {
        images = await Promise.all(images);
        return Property.Create(
          images,
          name,
          type,
          guests,
          bathrooms,
          bedrooms,
          beds,
          size,
          description,
          address,
          city,
          price,
          minimum_stay,
          maximum_stay,
          req.user
        );
      }
    },
    CreateReservation: {
      type: ReservationType,
      args: {
        checkin: { type: GraphQLString },
        checkout: { type: GraphQLString },
        guests: { type: GraphQLInt },
        pets: { type: GraphQLBoolean },
        property_id: { type: GraphQLID }
      },
      resolve(
        parentValue,
        { checkin, checkout, guests, pets, property_id },
        req
      ) {
        return Reservation.Create(
          checkin,
          checkout,
          guests,
          pets,
          property_id,
          req.user
        );
      }
    },
    ChangeStatusReservation: {
      type: ReservationType,
      args: {
        property_id: { type: GraphQLID },
        status: { type: GraphQLString }
      },
      resolve(parentValue, { property_id, status }, req) {
        return Reservation.ChangeStatus(property_id, status, req.user);
      }
    }
  }
});

module.exports = mutation;
