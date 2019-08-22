import gql from "graphql-tag";

export const CreateInvoice = gql`
  mutation CreateInvoice($reservation_id: ID, $token_id: ID) {
    CreateInvoice(reservation_id: $reservation_id, token_id: $token_id) {
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
