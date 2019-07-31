import gql from "graphql-tag";

export const ReservationQuery = gql`
  query {
    Reservations {
      _id
      address
      date
      status
      checkin
      checkout
      guests
      pets
      total
      owner {
        _id
        googleId
        firstname
        lastname
        imgURL
      }
      user {
        _id
        googleId
        firstname
        lastname
        imgURL
      }
    }
  }
`;
