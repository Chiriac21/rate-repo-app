import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Pressable, Text, StyleSheet, Linking, FlatList, View } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import theme from "./theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor: theme.colors.primary,
        padding : 15,
        borderRadius: 5,
        margin: 15,
        
    },
    buttonPressed:{
        backgroundColor: '#014ba0'
    },
    buttonTextStyle: {
        color: theme.colors.textPrimary,
        textAlign: 'center',
        fontWeight: theme.fontWeights.bold,
    },
    separator: {
        height: 10,
        backgroundColor: "#e1e4e8"
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin:10,
    },
    rightFlexItems:{
        flexDirection:'column',
        flexShrink: 1
    },
    ratingCircle: {
        width: 42,
        height: 42,
        borderRadius: 21, // half of width/height
        borderWidth: 2.5,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    ratingText: {
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.body,
    },
})

const RedirectToUrl = (url) => {
    Linking.openURL(url);
}

const RepositoryInfo = ({ repository }) => {
    const hasGitUrl = repository.url ? true: false;

    return (
        <>
            <RepositoryItem repository={repository}/>
            {
            hasGitUrl &&
            <Pressable 
                onPress={() => RedirectToUrl(repository.url)}
                style={({ pressed }) => [
                    styles.buttonStyle,
                    pressed && styles.buttonPressed
                ]}>
                <Text style={styles.buttonTextStyle}>
                    Open in GitHub
                </Text>
            </Pressable>
            }
            <View style={styles.separator} />
        </>
    )
};

export const ReviewItem = ({ review }) => {
  return(
    <>
    <View style={styles.container}>
        <View style={styles.ratingCircle}>
            <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.rightFlexItems}>
            <Text style={{fontWeight:theme.fontWeights.bold}}>{review.user.username}</Text>
            <Text style={{color:theme.colors.textSecondary}}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
            <Text>{review.text}</Text>
        </View>
    </View>
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
    const { id } = useParams();
    const response = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id: id
        }
    }); 

    if(response.loading)
        return <Text>Loading...</Text>
        
    const reviews = response.data.repository.reviews.edges.map((edge) => edge.node);

    return (
        <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={response.data.repository} />}
        />
    );
}

export default Repository;