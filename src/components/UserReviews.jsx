import { FlatList, View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_USER } from '../graphql/queries';
import { ReviewItem } from './Repository';
import theme from './theme';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8"
  },
  container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
    repositoryButtonStyle: {
        padding : 10,
        borderRadius: 5,
        width: '40%',
        marginBottom: 10,
        backgroundColor: theme.colors.primary,
    },
    deleteButtonStyle:{
        padding : 10,
        borderRadius: 5,
        width: '40%',
        marginBottom: 10,
        backgroundColor: '#e20404',
    },
    repositoryButtonPressed:{
        backgroundColor: '#014ba0'
    },
    deleteButtonPressed:{
        backgroundColor: '#b90303'
    },
    buttonTextStyle: {
        color: theme.colors.textPrimary,
        textAlign: 'center',
        fontWeight: theme.fontWeights.bold,
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
    const { data, loading, fetchMore, error } = useQuery(GET_USER, {
        variables: { 
          includeReviews: true, 
          first: 2
        },
    });
    const navigate = useNavigate();
    const [deleteReview] = useMutation(DELETE_REVIEW)

    if (loading) return null;
    if (error) return <Text>Error</Text>;

    const verifyDeletion = (id) =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'DELETE', onPress: async () => {
          try {
            console.log(id);

            await deleteReview({
              variables: {
                deleteReviewId: id,
              },
              refetchQueries: [  
                {
                  query: GET_USER,
                  variables: { includeReviews: true, first: 2 },
                },
              ]
            });
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);

    const signedInUser = data?.me;
    const reviews = signedInUser?.reviews?.edges.map((edge) => edge.node);

    const handleFetchMore = () => {
    const canFetchMore = !loading && signedInUser?.reviews?.pageInfo.hasNextPage;
    console.log(signedInUser?.reviews.totalCount)  
    if (!canFetchMore) {
      return;
    }

    fetchMore({
        variables: {
          after: signedInUser.reviews.pageInfo.endCursor,
          first:2,
          includeReviews: true
        },
      });
    };

    const onEndReach = () => {
    handleFetchMore();
    };

    return (
        <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => 
        <>
            <ReviewItem review={item} />
            <View style={styles.container}>
                <Pressable onPress={()=>{navigate(`/${item.repository.id}`)}}
                  style={({ pressed }) => [
                    styles.repositoryButtonStyle,
                    pressed && styles.repositoryButtonPressed
                ]}>
                    <Text style={styles.buttonTextStyle}>View repository</Text>
                </Pressable>
                <Pressable onPress={() => verifyDeletion(item.id)}
                  style={({ pressed }) => [
                    styles.deleteButtonStyle,
                    pressed && styles.deleteButtonPressed
                ]}>
                    <Text style={styles.buttonTextStyle}>Delete review</Text>
                </Pressable>
            </View>
        </>
        }
        keyExtractor={({ id }) => id}
        />
    );
}

export default UserReviews;

