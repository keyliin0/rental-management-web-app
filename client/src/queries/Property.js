import gql from "graphql-tag";

export const PropertyQuery = gql`
  query PropertyQuery($id: ID) {
    Property(id: $id) {
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
      location {
        type
      }
      price
      availability {
        minimum_stay
        maximum_stay
      }
      images
      thumbnail
      owner {
        _id
        googleId
        firstname
        lastname
        imgURL
      }
      rating {
        sum
        count
      }
      reserved {
        start
        end
      }
    }
  }
`;

export const PropertiesQuery = gql`
  query PropertiesQuery(
    $page: Int
    $city: String
    $address: String
    $lng: Float
    $lat: Float
    $start_date: Long
    $end_date: Long
  ) {
    Properties(
      page: $page
      city: $city
      address: $address
      lng: $lng
      lat: $lat
      start_date: $start_date
      end_date: $end_date
    ) {
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
      location {
        type
        coordinates
      }
      price
      availability {
        minimum_stay
        maximum_stay
      }
      images
      thumbnail
      owner {
        _id
        googleId
        firstname
        lastname
        imgURL
      }
      rating {
        sum
        count
      }
      reserved {
        start
        end
      }
    }
  }
`;

export const MyPropertiesQuery = gql`
  query MyPropertiesQuery($page: Int) {
    MyProperties(page: $page) {
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
      location {
        type
      }
      price
      availability {
        minimum_stay
        maximum_stay
      }
      images
      thumbnail
      owner {
        _id
        googleId
        firstname
        lastname
        imgURL
      }
      rating {
        sum
        count
      }
      reserved {
        start
        end
      }
    }
  }
`;
