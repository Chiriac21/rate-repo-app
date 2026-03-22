import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client/react';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  // eslint-disable-next-line no-undef
  console.log(Constants.expoConfig);

  return (
  <>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
    <StatusBar style="auto"/>
  </>
);
};

export default App;