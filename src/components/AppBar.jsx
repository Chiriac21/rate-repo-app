import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import Theme from './theme';
import { Link } from "react-router-native";
import { ScrollView, Pressable } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: Theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  text: {
    color: Theme.colors.textPrimary,
    fontWeight: 'bold',
    padding: 10,
  },
  repositoriesText: {
    flexGrow: 0
  },
  signInText:{
    flexGrow: 0
  }

});

const repositoriesStyle = [
  styles.text,
  styles.repositoriesText
]

const signInStyle = [
  styles.text,
  styles.signInText
]

const AppBarTab = ({ children, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <Text style={signInStyle}>{children}</Text>
      </Pressable>
    );
  }

  return (
    <Link to={to}>
      <Text style={signInStyle}>{children}</Text>
    </Link>
  );
};


const AppBar = () => {
  const { data } = useQuery(GET_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const signedInUser = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>

        {signedInUser ? (
          <AppBarTab onPress={signOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
    );
};

export default AppBar;