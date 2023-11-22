import { ApolloClient, InMemoryCache } from '@apollo/client';

const useApolloClient = () => {
    return new ApolloClient({
        uri: `${process.env.API_FAKE_GRAPHQL}`,
        cache: new InMemoryCache(),
    });
};

export default useApolloClient;
