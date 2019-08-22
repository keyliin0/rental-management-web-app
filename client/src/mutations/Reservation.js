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
