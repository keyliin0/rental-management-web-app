import gql from "graphql-tag";

export const InvoicesQuery = gql`
  query {
    Invoices {
      _id
      date
      total
      reservation {
        _id
        address
        date
        checkin
        checkout
        total
      }
      tenant {
        _id
        googleId
        firstname
        lastname
        imgURL
      }
      owner {
        _id
        googleId
        firstname
        lastname
        imgURL
      }
    }
  }
`;
