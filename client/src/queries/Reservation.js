import gql from "graphql-tag";

export const ReservationsQuery = gql`
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
      rated
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

export const ReservationQuery = gql`
  query Reservation($id: ID) {
    Reservation(id: $id) {
      _id
      address
      date
      status
      checkin
      checkout
      guests
      pets
      total
      rated
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
