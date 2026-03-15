import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import Theme from './theme';
import { Link } from "react-router-native";
import { ScrollView } from 'react-native';

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

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={repositoriesStyle}>
            Repositories
          </Text>
        </Link>
        <Link to="/signin">
          <Text style={signInStyle}>
              Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
    );
};

export default AppBar;