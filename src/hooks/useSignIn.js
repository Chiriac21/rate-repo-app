import { useMutation } from '@apollo/client/react';
import useAuthStorage from '../hooks/useAuthStorage';

import { SIGNIN } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client/react';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGNIN);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;