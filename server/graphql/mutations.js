const mongoose = require("mongoose");
const PropertyType = require("./types/property_type");
const ReservationType = require("./types/reservation_type");
const InvoiceType = require("./types/invoice_type");
const Property = mongoose.model("properties");
const Reservation = mongoose.model("reservations");
const Invoice = mongoose.model("invoices");
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
const GraphQLLong = require("graphql-type-long");

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
        console.log(images);
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
    DeleteProperty: {
      type: PropertyType,
      args: {
        property_id: { type: GraphQLID }
      },
      resolve(parentValue, { property_id }, req) {
        return Property.DeleteProperty(property_id, req.user);
      }
    },
    CreateReservation: {
      type: ReservationType,
      args: {
        checkin: { type: GraphQLLong },
        checkout: { type: GraphQLLong },
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
        reservation_id: { type: GraphQLID },
        status: { type: GraphQLString }
      },
      resolve(parentValue, { reservation_id, status }, req) {
        return Reservation.ChangeStatus(reservation_id, status, req.user);
      }
    },
    CreateInvoice: {
      type: ReservationType,
      args: {
        reservation_id: { type: GraphQLID },
        token_id: { type: GraphQLID }
      },
      resolve(parentValue, { reservation_id, token_id }, req) {
        return Invoice.Create(reservation_id, token_id, req.user);
      }
    }
  }
});

module.exports = mutation;
