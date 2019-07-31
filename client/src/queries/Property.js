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
  query PropertiesQuery($page: Int, $city: String, $lng: Float, $lat: Float) {
    Properties(page: $page, city: $city, lng: $lng, lat: $lat) {
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
