import { Text, View, Image, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  containerItem:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  infoContainer:{
    alignItems: 'center'
  },
  descriptionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:10
  },
  tinyLogo: {
    flexGrow: 0,
    width: 50,
    height: 50,
    borderRadius: 10
  },
  logo: {
    width: 66,
    height: 58
  },
  language:{
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 5,
    color: theme.colors.textPrimary
  },
  boldText:{
    fontWeight: 'bold'
  },
  description:{
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 10,
  }
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return String(count);
};

const RepositoryItem = ({repository}) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Image 
        style={styles.tinyLogo} 
        source={{uri: repository.ownerAvatarUrl}}
        />
        <View style={styles.description}>
          <Text style={[styles.boldText, {marginBottom: 10}]}>{repository.fullName}</Text>
          <Text style={{marginBottom: 10}}>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.containerItem}>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>{formatCount(repository.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>{formatCount(repository.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>{repository.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.boldText}>{repository.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;