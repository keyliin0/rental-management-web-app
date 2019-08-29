import gql from "graphql-tag";

export const ChangeStatusReservation = gql`
  mutation ChangeStatusReservation($reservation_id: ID, $status: String) {
    ChangeStatusReservation(reservation_id: $reservation_id, status: $status) {
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
      }
      user {
        _id
      }
      property {
        _id
      }
    }
  }
`;

export const CreateReservation = gql`
  mutation CreateReservation(
    $checkin: Long
    $checkout: Long
    $guests: Int
    $pets: Boolean
    $property_id: ID
  ) {
    CreateReservation(
      checkin: $checkin
      checkout: $checkout
      guests: $guests
      pets: $pets
      property_id: $property_id
    ) {
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

export const RateReservation = gql`
  mutation RateReservation($reservation_id: ID, $rate: Int) {
    RateReservation(reservation_id: $reservation_id, rate: $rate) {
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
      property {
        _id
        name
        type
        guests
        bathrooms
        bedrooms
        beds
        size
        description
        address
        city
        price
        thumbnail
      }
    }
  }
`;
