import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${import.meta.env.BASE_URL}graphql` }),
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' } },
});

export const GET_TRAVEL_OPTIONS = gql`
  query GetTravelOptions($destinationId: ID!) {
    flights(destinationId: $destinationId) {
      id destinationId airline flightNumber origin destination destinationAirport
      departureDate returnDate departureTime duration stops price seatsAvailable
    }
    hotels(destinationId: $destinationId) {
      id destinationId name location rating stars image pricePerNight
      availableRooms availableFrom availableUntil amenities
    }
  }
`;

export const CREATE_INQUIRY = gql`
  mutation CreateInquiry($input: InquiryInput!) {
    createInquiry(input: $input) { id status message }
  }
`;
