import gql from "graphql-tag";

export const CreateProperty = gql`
  mutation CreateProperty(
    $images: [Upload!]
    $name: String
    $type: String
    $guests: Int
    $bathrooms: Int
    $bedrooms: Int
    $beds: Int
    $size: Int
    $description: String
    $address: String
    $city: String
    $price: Int
    $minimum_stay: Int
    $maximum_stay: Int
  ) {
    CreateProperty(
      images: $images
      name: $name
      type: $type
      guests: $guests
      bathrooms: $bathrooms
      bedrooms: $bedrooms
      beds: $beds
      size: $size
      description: $description
      address: $address
      city: $city
      price: $price
      minimum_stay: $minimum_stay
      maximum_stay: $maximum_stay
    ) {
      _id
      name
      images
    }
  }
`;
